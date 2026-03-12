import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
export const useTyping = (
  socket: Socket | null,
  currentUser:
    | {
        name: string;
      }
    | undefined,
  scrollToBottom: (smooth: boolean) => void,
  isAtBottom: boolean,
) => {
  const [typingUsers, setTypingUsers] = useState<
    Map<
      string,
      {
        username: string;
        timeout: NodeJS.Timeout;
      }
    >
  >(new Map());
  const lastTypingSent = useRef<number>(0);
  useEffect(() => {
    if (!socket) return;
    const handleTypingReceive = (data: {
      socketId: string;
      username: string;
    }) => {
      if (data.socketId === socket.id) return;
      setTypingUsers((prev) => {
        const newMap = new Map(prev);
        if (newMap.has(data.socketId)) {
          clearTimeout(newMap.get(data.socketId)!.timeout);
        }
        const timeout = setTimeout(() => {
          setTypingUsers((current) => {
            const updated = new Map(current);
            updated.delete(data.socketId);
            return updated;
          });
        }, 3000);
        newMap.set(data.socketId, { username: data.username, timeout });
        return newMap;
      });
      if (isAtBottom) {
        scrollToBottom(true);
      }
    };
    socket.on("typing-receive", handleTypingReceive);
    return () => {
      socket.off("typing-receive", handleTypingReceive);
    };
  }, [socket, isAtBottom, scrollToBottom]);
  const handleTyping = () => {
    if (!socket || !currentUser) return;
    const now = Date.now();
    if (now - lastTypingSent.current > 2000) {
      socket.emit("typing-send", { username: currentUser.name || "Anonymous" });
      lastTypingSent.current = now;
    }
  };
  const getTypingText = () => {
    if (typingUsers.size === 0) return null;
    const names = Array.from(typingUsers.values()).map((u) => u.username);
    if (names.length === 1) return `${names[0]} is writing a note...`;
    if (names.length === 2)
      return `${names[0]} and ${names[1]} are writing notes...`;
    if (names.length === 3)
      return `${names[0]}, ${names[1]}, and ${names[2]} are writing notes...`;
    return "Several visitors are writing notes...";
  };
  return {
    typingUsers,
    handleTyping,
    getTypingText,
  };
};
