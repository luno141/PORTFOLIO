import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { differenceInMinutes, format } from "date-fns";
import { ArrowDown, BookText, PenSquare } from "lucide-react";
import { ScrollArea } from "../../ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Message, User } from "@/contexts/socketio";
import { THEME } from "../constants";
import { getAvatarUrl } from "@/lib/avatar";

interface ChatMessageListProps {
  msgs: Message[];
  users: User[];
  currentUser: User | undefined;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  showScrollButton: boolean;
  unreads: number;
  scrollToBottom: (smooth?: boolean) => void;
  isSingleUser: boolean;
  typingUsers: Map<
    string,
    {
      username: string;
    }
  >;
  getTypingText: () => string | null;
}
export const ChatMessageList = ({
  msgs,
  users,
  currentUser,
  chatContainerRef,
  showScrollButton,
  unreads,
  scrollToBottom,
  isSingleUser,
  typingUsers,
  getTypingText,
}: ChatMessageListProps) => {
  return (
    <div className="flex-1 relative overflow-hidden flex flex-col">
      <ScrollArea
        className="h-[400px]"
        data-lenis-prevent
        ref={chatContainerRef}
        type="always"
      >
        <div className="p-4 space-y-0">
          <div
            className={cn(
              "mb-4 rounded-2xl border p-3",
              THEME.bg.secondary,
              THEME.border.primary,
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  THEME.bg.welcome,
                )}
              >
                <BookText className={cn("h-5 w-5", THEME.text.header)} />
              </div>
              <div className="space-y-1">
                <p className={cn("text-sm font-semibold", THEME.text.header)}>
                  Public notes from visitors
                </p>
                <p className={cn("text-xs leading-5", THEME.text.secondary)}>
                  Sign with your name or alias and leave a short note, thought,
                  or project reaction.
                </p>
              </div>
            </div>
          </div>

          {msgs.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-70 mt-10">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-2",
                  THEME.bg.welcome,
                )}
              >
                <PenSquare className={cn("w-10 h-10", THEME.text.header)} />
              </div>
              <h3 className={cn("text-xl font-bold", THEME.text.header)}>
                Sign the guestbook
              </h3>
              <p className={cn("text-sm max-w-[200px]", THEME.text.secondary)}>
                Leave the first public note for Vikrant. It can be a quick
                hello, feedback, or a reaction to a project.
                {isSingleUser && (
                  <span className="block mt-2 text-yellow-600 dark:text-yellow-400/80 text-xs">
                    No one else is here yet, so your note will start the page.
                  </span>
                )}
              </p>
            </div>
          )}

          {msgs.map((msg, i) => {
            const user = users.find((u) => u.id === msg.sessionId);
            const isMe = msg.sessionId === currentUser?.id;
            const showHeader =
              i === 0 ||
              msgs[i - 1].sessionId !== msg.sessionId ||
              differenceInMinutes(msgs[i].createdAt, msgs[i - 1].createdAt) > 3;
            return (
              <div
                key={i}
                className={cn(
                  "group flex gap-3 pr-2",
                  showHeader && i != 0 && "!mt-4",
                )}
              >
                {showHeader ? (
                  <div className="relative w-10 h-10 flex-shrink-0 mt-0.5">
                    <img
                      src={getAvatarUrl(user?.avatar || msg.avatar)}
                      alt={user?.name || msg.username}
                      className="w-10 h-10 rounded-full"
                      style={{
                        backgroundColor: user?.color || msg.color || "#60a5fa",
                      }}
                    />
                    {user?.isOnline && (
                      <div
                        className={cn(
                          "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2",
                          THEME.border.status,
                        )}
                      />
                    )}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "w-10 flex-shrink-0 text-[10px] opacity-0 group-hover:opacity-100 text-right pr-1 select-none pt-1",
                      THEME.text.secondary,
                    )}
                  ></div>
                )}

                <div className="flex-1 min-w-0">
                  {showHeader && (
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-medium hover:underline cursor-pointer",
                          THEME.text.header,
                        )}
                        style={{ color: user?.color || msg.color }}
                      >
                        {user?.name || msg.username}
                      </span>
                      <span>{msg.flag}</span>
                      {isMe && (
                        <span className="bg-[#5865f2] text-white text-[10px] px-1 rounded font-bold">
                          YOU
                        </span>
                      )}
                      <span className={cn("text-xs", THEME.text.secondary)}>
                        {format(new Date(msg.createdAt), "MM/dd hh:mm a")}
                      </span>
                    </div>
                  )}
                  <p
                    className={cn(
                      "whitespace-pre-wrap break-words leading-[1.375rem] text-sm font-light",
                      THEME.text.primary,
                      !showHeader && "pl-0",
                    )}
                  >
                    {msg.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {typingUsers.size > 0 && (
        <div className={cn("h-6 px-4 flex items-center", THEME.bg.primary)}>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-0.5 mt-1">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
            <span className={cn("text-xs font-bold", THEME.text.secondary)}>
              {getTypingText()}
            </span>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => scrollToBottom(true)}
            className={cn(
              "absolute bottom-20 left-1/2 -translate-x-1/2 z-10",
              "flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg",
              "bg-[#5865f2] hover:bg-[#4752c4] text-white transition-colors",
              "text-xs font-bold cursor-pointer",
            )}
          >
            {unreads > 0 ? (
              <>
                <span>{unreads} new notes</span>
                <ArrowDown className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>Jump to latest note</span>
                <ArrowDown className="w-3 h-3" />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
