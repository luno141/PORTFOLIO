"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronsDown,
  Gamepad2,
  Pause,
  Play,
  RotateCw,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const SCORE_TABLE = [0, 100, 300, 500, 800];
const HIGH_SCORE_KEY = "portfolio-tetris-high-score";
const DEFAULT_TRIGGER_BOTTOM_OFFSET = 20;

type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
type CellValue = PieceType | null;
type Board = CellValue[][];
type Shape = number[][];

type Piece = {
  type: PieceType;
  shape: Shape;
  x: number;
  y: number;
};

const TETROMINOES: Record<PieceType, { color: string; shape: Shape }> = {
  I: {
    color: "#4dc6ff",
    shape: [[1, 1, 1, 1]],
  },
  O: {
    color: "#ffd36a",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    color: "#c38bff",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  S: {
    color: "#55d38d",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    color: "#ff7272",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  J: {
    color: "#5d8fff",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  L: {
    color: "#ffb05e",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
};

const PIECE_TYPES = Object.keys(TETROMINOES) as PieceType[];

const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );

const getRandomPieceType = (): PieceType =>
  PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];

const getPreviewOffset = (shape: Shape) => ({
  x: Math.floor((4 - shape[0].length) / 2),
  y: Math.floor((4 - shape.length) / 2),
});

const rotateShape = (shape: Shape): Shape =>
  shape[0].map((_, columnIndex) =>
    shape.map((row) => row[columnIndex]).reverse(),
  );

const createPiece = (type: PieceType): Piece => {
  const shape = TETROMINOES[type].shape;
  return {
    type,
    shape,
    x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
    y: -1,
  };
};

const isValidPosition = (board: Board, piece: Piece) => {
  return piece.shape.every((row, rowIndex) =>
    row.every((cell, columnIndex) => {
      if (!cell) return true;
      const nextX = piece.x + columnIndex;
      const nextY = piece.y + rowIndex;

      if (nextX < 0 || nextX >= BOARD_WIDTH || nextY >= BOARD_HEIGHT) {
        return false;
      }

      if (nextY < 0) return true;
      return board[nextY][nextX] === null;
    }),
  );
};

const mergePieceIntoBoard = (board: Board, piece: Piece): Board => {
  const nextBoard = board.map((row) => [...row]);

  piece.shape.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const nextY = piece.y + rowIndex;
      const nextX = piece.x + columnIndex;

      if (
        cell &&
        nextY >= 0 &&
        nextY < BOARD_HEIGHT &&
        nextX >= 0 &&
        nextX < BOARD_WIDTH
      ) {
        nextBoard[nextY][nextX] = piece.type;
      }
    });
  });

  return nextBoard;
};

const getStoredHighScore = () => {
  try {
    const storedScore = window.localStorage.getItem(HIGH_SCORE_KEY);
    const parsedScore = Number(storedScore);

    return Number.isFinite(parsedScore) && parsedScore > 0 ? parsedScore : 0;
  } catch {
    return 0;
  }
};

const setStoredHighScore = (score: number) => {
  try {
    window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    return;
  }
};

const clearCompletedLines = (board: Board) => {
  const remainingRows = board.filter((row) => row.some((cell) => cell === null));
  const clearedLines = BOARD_HEIGHT - remainingRows.length;

  if (clearedLines === 0) {
    return { board, clearedLines };
  }

  const emptyRows = Array.from({ length: clearedLines }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );

  return {
    board: [...emptyRows, ...remainingRows],
    clearedLines,
  };
};

const TetrisLauncher = () => {
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState<Board>(() => createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPieceType, setNextPieceType] = useState<PieceType>("T");
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [triggerBottomOffset, setTriggerBottomOffset] = useState(20);

  const boardRef = useRef(board);
  const currentPieceRef = useRef(currentPiece);
  const nextPieceTypeRef = useRef(nextPieceType);
  const scoreRef = useRef(score);
  const linesRef = useRef(lines);
  const highScoreRef = useRef(highScore);
  const isRunningRef = useRef(isRunning);
  const isGameOverRef = useRef(isGameOver);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    currentPieceRef.current = currentPiece;
  }, [currentPiece]);

  useEffect(() => {
    nextPieceTypeRef.current = nextPieceType;
  }, [nextPieceType]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  useEffect(() => {
    setHighScore(getStoredHighScore());
  }, []);

  useEffect(() => {
    const updateTriggerOffset = () => {
      const footer = document.querySelector("footer");
      if (!footer) {
        setTriggerBottomOffset(DEFAULT_TRIGGER_BOTTOM_OFFSET);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const overlap = window.innerHeight - footerRect.top;
      const maxVisibleOffset = Math.max(
        DEFAULT_TRIGGER_BOTTOM_OFFSET,
        window.innerHeight - 72,
      );
      const unclampedOffset =
        overlap > 0
          ? overlap + DEFAULT_TRIGGER_BOTTOM_OFFSET
          : DEFAULT_TRIGGER_BOTTOM_OFFSET;
      const nextOffset = Math.min(unclampedOffset, maxVisibleOffset);

      setTriggerBottomOffset((previous) =>
        previous === nextOffset ? previous : nextOffset,
      );
    };

    updateTriggerOffset();
    window.addEventListener("scroll", updateTriggerOffset, { passive: true });
    window.addEventListener("resize", updateTriggerOffset);

    return () => {
      window.removeEventListener("scroll", updateTriggerOffset);
      window.removeEventListener("resize", updateTriggerOffset);
    };
  }, []);

  const syncHighScore = useCallback((nextHighScore: number) => {
    highScoreRef.current = nextHighScore;
    setHighScore(nextHighScore);
    setStoredHighScore(nextHighScore);
  }, []);

  const handleGameOver = useCallback(() => {
    isRunningRef.current = false;
    isGameOverRef.current = true;
    setIsRunning(false);
    setIsGameOver(true);

    if (scoreRef.current > highScoreRef.current) {
      syncHighScore(scoreRef.current);
    }
  }, [syncHighScore]);

  const spawnPiece = useCallback(
    (type: PieceType, upcomingType: PieceType) => {
      const piece = createPiece(type);
      currentPieceRef.current = piece;
      setCurrentPiece(piece);
      nextPieceTypeRef.current = upcomingType;
      setNextPieceType(upcomingType);

      if (!isValidPosition(boardRef.current, piece)) {
        handleGameOver();
      }
    },
    [handleGameOver],
  );

  const startGame = useCallback(() => {
    const emptyBoard = createEmptyBoard();
    const firstPieceType = getRandomPieceType();
    const secondPieceType = getRandomPieceType();

    boardRef.current = emptyBoard;
    setBoard(emptyBoard);
    setScore(0);
    setLines(0);
    setLevel(1);
    isGameOverRef.current = false;
    isRunningRef.current = true;
    setIsGameOver(false);
    setIsRunning(true);
    scoreRef.current = 0;
    linesRef.current = 0;

    spawnPiece(firstPieceType, secondPieceType);
  }, [spawnPiece]);

  const lockCurrentPiece = useCallback(() => {
    const piece = currentPieceRef.current;
    if (!piece) return;

    const mergedBoard = mergePieceIntoBoard(boardRef.current, piece);
    const { board: clearedBoard, clearedLines } = clearCompletedLines(mergedBoard);

    boardRef.current = clearedBoard;
    setBoard(clearedBoard);
    currentPieceRef.current = null;
    setCurrentPiece(null);

    if (clearedLines > 0) {
      const nextLines = linesRef.current + clearedLines;
      const nextLevel = Math.floor(nextLines / 10) + 1;
      const nextScore =
        scoreRef.current +
        SCORE_TABLE[clearedLines] * Math.max(nextLevel, 1);

      linesRef.current = nextLines;
      scoreRef.current = nextScore;
      setLines(nextLines);
      setLevel(nextLevel);
      setScore(nextScore);
    }

    spawnPiece(nextPieceTypeRef.current, getRandomPieceType());
  }, [spawnPiece]);

  const movePiece = useCallback((deltaX: number, deltaY: number) => {
    const piece = currentPieceRef.current;
    if (!piece || isGameOverRef.current) return false;

    const nextPiece = {
      ...piece,
      x: piece.x + deltaX,
      y: piece.y + deltaY,
    };

    if (!isValidPosition(boardRef.current, nextPiece)) {
      return false;
    }

    currentPieceRef.current = nextPiece;
    setCurrentPiece(nextPiece);
    return true;
  }, []);

  const stepDown = useCallback(() => {
    if (
      !currentPieceRef.current ||
      !isRunningRef.current ||
      isGameOverRef.current
    ) {
      return;
    }

    const moved = movePiece(0, 1);
    if (!moved) {
      lockCurrentPiece();
    }
  }, [lockCurrentPiece, movePiece]);

  const rotateCurrentPiece = useCallback(() => {
    const piece = currentPieceRef.current;
    if (!piece || isGameOverRef.current) return;

    const rotatedShape = rotateShape(piece.shape);
    const kickOffsets = [0, -1, 1, -2, 2];

    for (const offset of kickOffsets) {
      const nextPiece = {
        ...piece,
        x: piece.x + offset,
        shape: rotatedShape,
      };

      if (isValidPosition(boardRef.current, nextPiece)) {
        currentPieceRef.current = nextPiece;
        setCurrentPiece(nextPiece);
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    if (!currentPieceRef.current || isGameOverRef.current) return;

    let nextPiece = currentPieceRef.current;
    while (
      isValidPosition(boardRef.current, {
        ...nextPiece,
        y: nextPiece.y + 1,
      })
    ) {
      nextPiece = {
        ...nextPiece,
        y: nextPiece.y + 1,
      };
    }

    currentPieceRef.current = nextPiece;
    setCurrentPiece(nextPiece);
    lockCurrentPiece();
  }, [lockCurrentPiece]);

  const handleTouchControl = useCallback(
    (action: "left" | "right" | "down" | "rotate" | "drop") => {
      if (
        !currentPieceRef.current ||
        !isRunningRef.current ||
        isGameOverRef.current
      ) {
        return;
      }

      if (action === "left") {
        movePiece(-1, 0);
      } else if (action === "right") {
        movePiece(1, 0);
      } else if (action === "down") {
        stepDown();
      } else if (action === "rotate") {
        rotateCurrentPiece();
      } else {
        hardDrop();
      }
    },
    [hardDrop, movePiece, rotateCurrentPiece, stepDown],
  );

  const togglePause = useCallback(() => {
    if (isGameOverRef.current || !currentPieceRef.current) return;

    setIsRunning((previous) => {
      const nextRunning = !previous;
      isRunningRef.current = nextRunning;
      return nextRunning;
    });
  }, []);

  useEffect(() => {
    if (!open || !isRunning || isGameOver) return;

    const tickSpeed = Math.max(140, 700 - (level - 1) * 55);
    const interval = window.setInterval(() => {
      stepDown();
    }, tickSpeed);

    return () => {
      window.clearInterval(interval);
    };
  }, [isGameOver, isRunning, level, open, stepDown]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentPieceRef.current && event.key !== "Enter") return;

      if (
        ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "p", "P"].includes(
          event.key,
        )
      ) {
        event.preventDefault();
      }

      if (
        event.key === "Enter" &&
        (!isRunningRef.current || isGameOverRef.current)
      ) {
        startGame();
        return;
      }

      if (!isRunningRef.current || isGameOverRef.current) return;

      if (event.key === "ArrowLeft") {
        movePiece(-1, 0);
      } else if (event.key === "ArrowRight") {
        movePiece(1, 0);
      } else if (event.key === "ArrowDown") {
        stepDown();
      } else if (event.key === "ArrowUp") {
        rotateCurrentPiece();
      } else if (event.key === " ") {
        hardDrop();
      } else if (event.key === "p" || event.key === "P") {
        togglePause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    hardDrop,
    movePiece,
    open,
    rotateCurrentPiece,
    startGame,
    stepDown,
    togglePause,
  ]);

  const displayBoard = useMemo(() => {
    const boardSnapshot = board.map((row) => [...row]);

    if (!currentPiece) {
      return boardSnapshot;
    }

    currentPiece.shape.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (!cell) return;

        const nextY = currentPiece.y + rowIndex;
        const nextX = currentPiece.x + columnIndex;

        if (
          nextY >= 0 &&
          nextY < BOARD_HEIGHT &&
          nextX >= 0 &&
          nextX < BOARD_WIDTH
        ) {
          boardSnapshot[nextY][nextX] = currentPiece.type;
        }
      });
    });

    return boardSnapshot;
  }, [board, currentPiece]);

  const nextPieceShape = TETROMINOES[nextPieceType].shape;
  const nextPiecePreviewOffset = getPreviewOffset(nextPieceShape);
  const canResume = Boolean(currentPiece) && !isGameOver;
  const displayHighScore = Math.max(highScore, score);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button
          variant="outline"
          className={cn(
            "surface-pill fixed right-4 z-[980] h-11 rounded-full border-border/80 bg-background/88 px-3.5 shadow-[0_18px_36px_-22px_rgba(34,25,16,0.45)] backdrop-blur-xl sm:right-5",
            "text-stone-900 hover:-translate-y-0.5 hover:bg-white hover:text-stone-950 dark:border-white/12 dark:bg-slate-950/82 dark:text-zinc-50 dark:hover:bg-white dark:hover:text-slate-950",
          )}
          style={{ bottom: `${triggerBottomOffset}px` }}
        >
          <Gamepad2 className="mr-2 h-4 w-4" />
          Play
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[1200] bg-slate-950/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[1201] flex flex-col",
            "-translate-x-1/2 -translate-y-1/2",
            "w-[calc(100vw-16px)] max-w-[940px]",
            "max-h-[calc(100dvh-16px)] sm:max-h-[calc(100dvh-24px)] md:max-h-[calc(100dvh-32px)]",
            "overflow-hidden rounded-[16px] border border-border/70 bg-background/92",
            "shadow-[0_40px_120px_-48px_rgba(0,0,0,0.7)] backdrop-blur-2xl outline-none",
            "sm:w-[calc(100vw-24px)] sm:rounded-[24px]",
            "md:w-[calc(100vw-32px)] md:rounded-[30px]",
            "dark:border-white/10 dark:bg-slate-950/92",
          )}
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
            <section className="relative flex shrink-0 flex-col border-b border-border/60 p-3.5 pb-5 sm:p-4 sm:pb-5 md:w-[300px] md:shrink-0 md:overflow-y-auto md:border-b-0 md:border-r dark:border-white/10 md:p-5 md:pb-5 lg:w-[330px]">
              <div className="relative mb-3 flex min-h-10 flex-none items-center justify-center px-12 sm:mb-4">
                <DialogPrimitive.Title className="text-center text-xl font-semibold uppercase text-foreground sm:text-[1.7rem]">
                  TETRIS
                </DialogPrimitive.Title>
                <DialogPrimitive.Close asChild>
                  <button
                    className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors hover:bg-white hover:text-stone-950 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white dark:hover:text-slate-950"
                    aria-label="Close game"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </DialogPrimitive.Close>
              </div>

              <div className="flex-none px-8 text-center lg:px-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Live Board
                </p>
              </div>

              <div className="mx-auto mt-3 w-full max-w-[280px] flex-none px-4 sm:max-w-[300px] sm:px-0">
                <div className="rounded-[20px] border border-border/70 bg-stone-100/70 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-none sm:rounded-[24px] sm:p-2.5">
                  <div
                    className="grid aspect-[10/20] rounded-[16px] border border-stone-300/75 bg-stone-950/95 p-1.5 dark:border-white/10 sm:rounded-[18px]"
                    style={{
                      gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
                    }}
                  >
                    {displayBoard.flatMap((row, rowIndex) =>
                      row.map((cell, columnIndex) => (
                        <div
                          key={`${rowIndex}-${columnIndex}`}
                          className="rounded-[3px] border border-black/10 bg-white/[0.025]"
                          style={{
                            backgroundColor: cell
                              ? TETROMINOES[cell].color
                              : "rgba(255,255,255,0.035)",
                            boxShadow: cell
                              ? `inset 0 1px 0 rgba(255,255,255,0.38), 0 0 16px ${TETROMINOES[cell].color}26`
                              : "none",
                          }}
                        />
                      )),
                    )}
                  </div>
                </div>
              </div>
            </section>

            <aside className="min-h-0 flex-1 space-y-3.5 overflow-y-auto p-3.5 sm:space-y-4 sm:p-4 md:p-5">
              <div className="grid gap-2.5 sm:grid-cols-3">
                <StatCard label="Score" value={score.toLocaleString()} />
                <StatCard label="Level" value={String(level)} />
                <StatCard
                  label="High Score"
                  value={displayHighScore.toLocaleString()}
                />
              </div>

              <div className="grid gap-3.5 xl:grid-cols-[180px_minmax(0,1fr)]">
                <div className="surface-panel rounded-2xl border border-border/70 bg-background/70 p-3.5 dark:border-white/10 dark:bg-white/[0.03] sm:rounded-3xl sm:p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Next Piece
                  </p>
                  <div className="mt-3 grid w-fit grid-cols-4 gap-1 rounded-2xl border border-border/60 bg-stone-950 p-2.5 dark:border-white/10">
                    {Array.from({ length: 4 }).flatMap((_, rowIndex) =>
                      Array.from({ length: 4 }).map((_, columnIndex) => {
                        const previewRow = rowIndex - nextPiecePreviewOffset.y;
                        const previewColumn = columnIndex - nextPiecePreviewOffset.x;
                        const isFilled = Boolean(
                          nextPieceShape[previewRow]?.[previewColumn],
                        );
                        return (
                          <div
                            key={`preview-${rowIndex}-${columnIndex}`}
                            className="h-5 w-5 rounded-[10px] border border-black/10"
                            style={{
                              backgroundColor: isFilled
                                ? TETROMINOES[nextPieceType].color
                                : "rgba(255,255,255,0.04)",
                              boxShadow: isFilled
                                ? `inset 0 1px 0 rgba(255,255,255,0.35), 0 0 14px ${TETROMINOES[nextPieceType].color}24`
                                : "none",
                            }}
                          />
                        );
                      }),
                    )}
                  </div>
                </div>

                <div className="surface-panel hidden rounded-3xl border border-border/70 bg-background/70 p-4 dark:border-white/10 dark:bg-white/[0.03] sm:block">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    How To Play
                  </p>
                  <div className="mt-3 grid gap-2.5 text-sm text-muted-foreground">
                    <RuleStep
                      step="1"
                      title="Clear rows"
                      description="Fill a full horizontal line to clear it and score."
                    />
                    <RuleStep
                      step="2"
                      title="Stay ahead"
                      description="Use the preview to plan your next placement."
                    />
                    <RuleStep
                      step="3"
                      title="Keep space open"
                      description="Avoid stacking too high or you will lock out."
                    />
                  </div>
                </div>
              </div>

              <div className="surface-panel rounded-2xl border border-border/70 bg-background/70 p-3.5 dark:border-white/10 dark:bg-white/[0.03] sm:hidden">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Touch Controls
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <TouchControlButton
                    ariaLabel="Move left"
                    disabled={!currentPiece || !isRunning || isGameOver}
                    onClick={() => handleTouchControl("left")}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </TouchControlButton>
                  <TouchControlButton
                    ariaLabel="Rotate"
                    disabled={!currentPiece || !isRunning || isGameOver}
                    onClick={() => handleTouchControl("rotate")}
                  >
                    <RotateCw className="h-5 w-5" />
                  </TouchControlButton>
                  <TouchControlButton
                    ariaLabel="Move right"
                    disabled={!currentPiece || !isRunning || isGameOver}
                    onClick={() => handleTouchControl("right")}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </TouchControlButton>
                  <TouchControlButton
                    ariaLabel="Soft drop"
                    disabled={!currentPiece || !isRunning || isGameOver}
                    onClick={() => handleTouchControl("down")}
                  >
                    <ArrowDown className="h-5 w-5" />
                  </TouchControlButton>
                  <TouchControlButton
                    ariaLabel="Hard drop"
                    className="col-span-2"
                    disabled={!currentPiece || !isRunning || isGameOver}
                    onClick={() => handleTouchControl("drop")}
                  >
                    <ChevronsDown className="h-5 w-5" />
                  </TouchControlButton>
                </div>
              </div>

              <div className="surface-panel hidden rounded-3xl border border-border/70 bg-background/70 p-4 dark:border-white/10 dark:bg-white/[0.03] sm:block">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Controls
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <ControlHint keys="← / →" label="Move left or right" />
                  <ControlHint keys="↑" label="Rotate piece" />
                  <ControlHint keys="↓" label="Soft drop" />
                  <ControlHint keys="Space" label="Hard drop instantly" />
                  <ControlHint keys="P" label="Pause or resume" />
                  <ControlHint keys="Enter" label="Start a new run" />
                </div>
              </div>

              <div className="surface-panel rounded-2xl border border-border/70 bg-background/70 p-3.5 dark:border-white/10 dark:bg-white/[0.03] sm:rounded-3xl sm:p-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Status
                </p>
                <div className="mt-2.5 text-sm text-muted-foreground">
                  {isGameOver ? (
                    <p className="text-red-500 dark:text-red-300">
                      Game over. Start again when you&apos;re ready.
                    </p>
                  ) : isRunning ? (
                    <p className="text-emerald-600 dark:text-emerald-300">
                      Live. Keep the board clean.
                    </p>
                  ) : canResume ? (
                    <p>Paused. Pick up where you left off.</p>
                  ) : (
                    <p>Ready when you are.</p>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={startGame}
                    className="min-w-24 rounded-full px-4 hover:bg-white hover:text-stone-950 dark:hover:bg-white dark:hover:text-slate-950"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    {isGameOver || currentPiece ? "Restart" : "Start"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="min-w-24 rounded-full px-4 hover:bg-white hover:text-stone-950 dark:hover:bg-white dark:hover:text-slate-950"
                    onClick={() => {
                      if (!currentPiece) {
                        startGame();
                        return;
                      }
                      togglePause();
                    }}
                  >
                    {isRunning ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isRunning ? "Pause" : canResume ? "Resume" : "Start"}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="surface-panel rounded-2xl border border-border/70 bg-background/70 p-3 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-center gap-2 text-[10px] font-medium uppercase text-muted-foreground sm:text-[11px] sm:tracking-[0.18em]">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-2 min-w-0 truncate text-lg font-semibold text-foreground sm:text-xl">
        {value}
      </p>
    </div>
  );
};

const RuleStep = ({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/55 px-3 py-3 dark:border-white/10 dark:bg-white/[0.02]">
      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background dark:bg-white dark:text-slate-950">
        {step}
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

const ControlHint = ({
  keys,
  label,
}: {
  keys: string;
  label: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/55 px-3 py-2 dark:border-white/10 dark:bg-white/[0.02]">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground dark:border-white/10 dark:bg-white/[0.04]">
        {keys}
      </span>
    </div>
  );
};

const TouchControlButton = ({
  ariaLabel,
  children,
  className,
  disabled,
  onClick,
}: {
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-12 min-w-0 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-foreground transition-colors [touch-action:manipulation] active:bg-foreground active:text-background disabled:opacity-40 dark:border-white/10 dark:bg-white/[0.04]",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default TetrisLauncher;
