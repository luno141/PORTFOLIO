"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bot, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatInput } from "./components/chat-input";
import { THEME } from "./constants";
import {
  getPortfolioBotReply,
  getPortfolioBotWelcome,
  type PortfolioBotAction,
} from "@/lib/portfolio-bot";
import { useSounds } from "./hooks/use-sounds";

type LocalAssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  actions?: PortfolioBotAction[];
  suggestions?: string[];
};

const STORAGE_KEY = "portfolio-local-assistant-messages-v3";

const createMessage = (
  role: LocalAssistantMessage["role"],
  content: string,
  actions?: PortfolioBotAction[],
  suggestions?: string[],
): LocalAssistantMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  actions,
  suggestions,
});

const createWelcomeMessage = () => {
  const welcome = getPortfolioBotWelcome();
  return createMessage(
    "assistant",
    welcome.content,
    welcome.actions,
    welcome.suggestions,
  );
};

const LocalAssistant = () => {
  const [messages, setMessages] = useState<LocalAssistantMessage[]>([
    createWelcomeMessage(),
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playSendSound, playReceiveSound } = useSounds();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as LocalAssistantMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to restore local assistant history", error);
    } finally {
      setHasHydrated(true);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to persist local assistant history", error);
    }
  }, [hasHydrated, messages]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isThinking]);

  const sendMessage = (input: string) => {
    const trimmed = input.trim();

    if (!trimmed || isThinking) return;

    playSendSound();
    setMessages((prev) => [...prev, createMessage("user", trimmed)]);
    setIsThinking(true);

    const reply = getPortfolioBotReply(trimmed);
    const delay = Math.min(
      1200,
      Math.max(420, 300 + Math.floor(reply.content.length * 4)),
    );

    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        createMessage(
          "assistant",
          reply.content,
          reply.actions,
          reply.suggestions,
        ),
      ]);
      setIsThinking(false);
      playReceiveSound();
    }, delay);
  };

  const resetConversation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setMessages([createWelcomeMessage()]);
    setIsThinking(false);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const lastAssistantMessage = useMemo(
    () =>
      [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  return (
    <div className="flex flex-1 flex-col">
      <div
        className={cn(
          "border-b px-4 py-3",
          THEME.bg.secondary,
          THEME.border.primary,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                THEME.bg.tertiary,
              )}
            >
              <Bot className={cn("h-5 w-5", THEME.text.secondary)} />
            </div>
            <div className="space-y-1">
              <p className={cn("text-sm font-semibold", THEME.text.header)}>
                BT-ASSISTANT
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={resetConversation}
            title="Reset conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[360px] flex-1" data-lenis-prevent>
        <div className="space-y-4 p-4">
          {messages.map((message) => {
            const isAssistant = message.role === "assistant";
            const isLastAssistant =
              isAssistant &&
              lastAssistantMessage &&
              lastAssistantMessage.id === message.id &&
              !isThinking;

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  isAssistant ? "justify-start" : "justify-end",
                )}
              >
                {isAssistant ? (
                  <div
                    className={cn(
                      "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      THEME.bg.tertiary,
                    )}
                  >
                    <Bot className={cn("h-4 w-4", THEME.text.secondary)} />
                  </div>
                ) : null}

                <div
                  className={cn(
                    "max-w-[85%] space-y-3 rounded-2xl border px-4 py-3",
                    isAssistant
                      ? cn(THEME.bg.secondary, THEME.border.primary)
                      : "border-[#5865f2]/20 bg-[#5865f2] text-white",
                  )}
                >
                  <p
                    className={cn(
                      "whitespace-pre-wrap text-sm leading-6",
                      isAssistant ? THEME.text.primary : "text-white",
                    )}
                  >
                    {message.content}
                  </p>

                  {isAssistant && message.actions?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {message.actions.map((action) => (
                        <ActionButton
                          key={`${message.id}-${action.href}`}
                          action={action}
                        />
                      ))}
                    </div>
                  ) : null}

                  {isLastAssistant && message.suggestions?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion) => (
                        <button
                          key={`${message.id}-${suggestion}`}
                          type="button"
                          onClick={() => sendMessage(suggestion)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs transition-colors opacity-80",
                            THEME.border.primary,
                            THEME.text.secondary,
                            "bg-transparent hover:opacity-100 hover:bg-background/60",
                          )}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

          {isThinking ? (
            <div className="flex gap-3">
              <div
                className={cn(
                  "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  THEME.bg.tertiary,
                )}
              >
                <Sparkles className={cn("h-4 w-4", THEME.text.secondary)} />
              </div>
              <div
                className={cn(
                  "rounded-2xl border px-4 py-3",
                  THEME.bg.secondary,
                  THEME.border.primary,
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("text-sm", THEME.text.secondary)}>
                    BT-ASSISTANT is thinking
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div ref={scrollAnchorRef} />
        </div>
      </ScrollArea>

      <div
        className={cn(
          "border-t px-4 py-3 text-xs",
          THEME.bg.secondary,
          THEME.border.primary,
          THEME.text.secondary,
        )}
      >
        &nbsp;
      </div>

      <ChatInput
        onSendMessage={sendMessage}
        onTyping={() => {}}
        placeholder="What does Vikrant build?"
      />
    </div>
  );
};

const ActionButton = ({ action }: { action: PortfolioBotAction }) => {
  const className =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background/75 px-3 py-2 text-xs font-medium transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:bg-background";

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
};

export default LocalAssistant;
