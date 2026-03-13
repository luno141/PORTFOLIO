import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.scss";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";
interface BodyProps {
  links: LinkType[];
  setIsActive: (isActive: boolean) => void;
}
export default function Body({ links, setIsActive }: BodyProps) {
  const pathname = usePathname();
  return (
    <div className={styles.body}>
      <div className={styles.mobileTheme}>
        <FunnyThemeToggle className="flex h-6 w-6 md:hidden" />
      </div>
      {links.map((link, index) => {
        const { title, href, target } = link;
        const isActive =
          href === "/"
            ? pathname === "/"
            : !href.startsWith("/#") && pathname === href;
        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            className={cn(
              styles.link,
              isActive && styles.active,
              "cursor-can-hover",
            )}
            onClick={() => setIsActive(false)}
          >
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.05 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {title}
            </motion.span>
          </Link>
        );
      })}
    </div>
  );
}
