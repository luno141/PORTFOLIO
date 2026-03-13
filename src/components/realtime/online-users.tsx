"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { SocketContext } from "@/contexts/socketio";
import { BookText, Bot, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatScroll } from "./hooks/use-chat-scroll";
import { useTyping } from "./hooks/use-typing";
import { useSounds } from "./hooks/use-sounds";
import { ChatMessageList } from "./components/chat-message-list";
import { ChatInput } from "./components/chat-input";
import { UserList } from "./components/user-list";
import { EditProfileModal } from "./components/edit-profile-modal";
import { THEME } from "./constants";
import { getAvatarUrl } from "@/lib/avatar";
import LocalAssistant from "./local-assistant";

const OnlineUsers = () => {
  const { socket, users: _users, msgs } = useContext(SocketContext);
  const users = _users;
  const [showVisitorList, setShowVisitorList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const currentUser = users.find((u) => u.socketId === socket?.id);
  const isRealtimeEnabled = Boolean(process.env.NEXT_PUBLIC_WS_URL);
  const { playSendSound, playReceiveSound } = useSounds();
  const prevMsgsLength = useRef(msgs.length);

  useEffect(() => {
    if (msgs.length > prevMsgsLength.current) {
      const isSmallBatch = msgs.length - prevMsgsLength.current <= 2;
      const lastMsg = msgs[msgs.length - 1];
      let isRecent = true;
      if (lastMsg?.createdAt) {
        const msgTime = new Date(lastMsg.createdAt).getTime();
        const now = Date.now();
        if (now - msgTime > 10000) isRecent = false;
      }
      if (isSmallBatch && isRecent && lastMsg) {
        if (lastMsg.username === currentUser?.name) {
          playSendSound();
        } else {
          playReceiveSound();
        }
      }
    }
    prevMsgsLength.current = msgs.length;
  }, [msgs, playSendSound, playReceiveSound, currentUser]);
  const {
    chatContainer,
    showScrollButton,
    unreads,
    scrollToBottom,
    isAtBottomRef,
  } = useChatScroll(
    isOpen,
    msgs.length,
    currentUser?.id,
    msgs[msgs.length - 1]?.sessionId,
  );
  const { typingUsers, handleTyping, getTypingText } = useTyping(
    socket,
    currentUser,
    scrollToBottom,
    isAtBottomRef.current,
  );
  const sendMessage = (msg: string) => {
    socket?.emit("msg-send", {
      content: msg,
    });
  };
  const updateProfile = ({
    name,
    avatar,
    color,
  }: {
    name: string;
    avatar: string;
    color?: string;
  }) => {
    socket?.emit("update-user", {
      username: name,
      avatar,
      color,
    });
    localStorage.setItem("username", name);
    localStorage.setItem("avatar", avatar);
    if (color) localStorage.setItem("color", color);
  };
  const isSingleUser = users.length <= 1;
  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={(newOpen) => {
          if (!newOpen && isEditingProfile) return;
          setIsOpen(newOpen);
          if (!newOpen) setShowVisitorList(false);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "z-50 h-11 w-12 p-0 shadow-lg transition-all duration-300",
              "bg-background/20 hover:bg-background/80 backdrop-blur-sm border-2 border-white/30 rounded-lg",
              isRealtimeEnabled &&
                !isOpen &&
                unreads > 0 &&
                "animate-pulse border-green-500/50",
            )}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: [0.1, 2], opacity: [1, 0] }}
                  transition={{
                    duration: 0.4,
                    delay: 0,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className={cn(
                    "absolute -inset-1 rounded-full",
                    isRealtimeEnabled && unreads > 0
                      ? "bg-green-500/40"
                      : "bg-transparent",
                  )}
                />
                {isRealtimeEnabled ? (
                  <BookText className="w-6 h-6" />
                ) : (
                  <Bot className="w-6 h-6" />
                )}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "mr-4 mb-4 flex h-[520px] min-h-0 max-h-[70vh] w-80 flex-col overflow-hidden rounded-xl border-none p-0 shadow-2xl sm:w-96",
            THEME.bg.primary,
            THEME.text.primary,
          )}
          side="top"
        >
          {isRealtimeEnabled ? (
            <div
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-3 shadow-sm border-b shrink-0",
                THEME.bg.secondary,
                THEME.border.primary,
              )}
            >
              <div
                className={cn(
                  "flex min-w-0 items-center gap-3",
                  THEME.text.header,
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    THEME.bg.tertiary,
                  )}
                >
                  <BookText className={cn("h-5 w-5", THEME.text.secondary)} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Guestbook</p>
                  <p className={cn("truncate text-xs", THEME.text.secondary)}>
                    Leave a short public note for Vikrant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {currentUser && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-9 w-9 p-0 gap-2 transition-colors rounded-full",
                      THEME.bg.hover,
                      THEME.text.secondary,
                      "hover:text-[#060607] dark:hover:text-white",
                    )}
                    onClick={() => setIsEditingProfile(true)}
                    title="Edit signature"
                  >
                    <div className="relative w-8 h-8">
                      <img
                        src={getAvatarUrl(currentUser.avatar)}
                        className="w-full h-full rounded-full ring-1 ring-black/10 dark:ring-white/10"
                        style={{
                          backgroundColor: currentUser.color || "#60a5fa",
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-[#5865f2] rounded-full border-2 border-[var(--bg-primary)]">
                        <Settings className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </Button>
                )}

                <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10 mx-0.5" />

                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "transition-colors gap-2",
                    THEME.bg.hover,
                    `hover:${THEME.text.header.replace("text-", "text-")} `,
                    "hover:text-[#060607] dark:hover:text-white",
                    showVisitorList && cn(THEME.text.header, THEME.bg.active),
                  )}
                  onClick={() => setShowVisitorList(!showVisitorList)}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{users.length}</span>
                  </div>
                  <Users className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : null}

          <div
            className={cn(
              "relative flex min-h-0 flex-1 flex-col",
              THEME.bg.primary,
            )}
          >
            {isRealtimeEnabled ? (
              <>
                <ChatMessageList
                  msgs={msgs}
                  users={users}
                  currentUser={currentUser}
                  chatContainerRef={chatContainer}
                  showScrollButton={showScrollButton}
                  unreads={unreads}
                  scrollToBottom={scrollToBottom}
                  isSingleUser={isSingleUser}
                  typingUsers={typingUsers}
                  getTypingText={getTypingText}
                />

                <ChatInput
                  onSendMessage={sendMessage}
                  onTyping={handleTyping}
                  placeholder="Leave a note for the guestbook"
                />

                <UserList
                  users={users}
                  socket={socket}
                  showVisitorList={showVisitorList}
                  onClose={() => setShowVisitorList(false)}
                  onEditProfile={() => setIsEditingProfile(true)}
                />
              </>
            ) : (
              <LocalAssistant />
            )}
          </div>
        </PopoverContent>
      </Popover>

      {currentUser && (
        <EditProfileModal
          user={currentUser}
          isOpen={isEditingProfile}
          onClose={() => setIsEditingProfile(false)}
          updateProfile={updateProfile}
        />
      )}
    </>
  );
};
export default OnlineUsers;
