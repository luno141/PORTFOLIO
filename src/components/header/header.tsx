"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { opacity, background } from "./anim";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import OnlineUsers from "../realtime/online-users";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";
import { config } from "@/data/config";
interface HeaderProps {
  loader?: boolean;
}
const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <motion.header
      className={cn(
        styles.header,
        "z-[1000] transition-colors delay-100 duration-500 ease-in",
      )}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0,
        duration: 0.8,
      }}
    >
      <div
        className={cn(
          styles.bar,
          "ml-auto flex w-fit items-center gap-2 rounded-2xl border border-border/60 bg-background/45 px-3 py-2 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.5)] backdrop-blur-xl md:gap-3",
        )}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <FunnyThemeToggle className="hidden h-6 w-6 md:flex" />
          <OnlineUsers />
          {config.githubUsername && config.githubRepo && (
            <GitHubStarsButton
              username={config.githubUsername}
              repo={config.githubRepo}
            />
          )}
          <Button
            variant={"ghost"}
            onClick={() => setIsActive(!isActive)}
            className={cn(
              styles.el,
              "m-0 flex h-9 items-center justify-center bg-transparent px-2",
            )}
          >
            <div className="relative hidden md:flex items-center">
              <motion.p
                variants={opacity}
                animate={!isActive ? "open" : "closed"}
              >
                Menu
              </motion.p>
              <motion.p
                variants={opacity}
                animate={isActive ? "open" : "closed"}
              >
                Close
              </motion.p>
            </div>
            <div
              className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}
            ></div>
          </Button>
        </div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};
export default Header;
