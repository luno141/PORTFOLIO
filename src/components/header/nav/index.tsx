import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { height } from "../anim";
import Body from "./body/body";
import { links } from "@/components/header/config";
interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}
const Index: React.FC<IndexProps> = ({ setIsActive }) => {
  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} setIsActive={setIsActive} />
        </div>
      </div>
    </motion.div>
  );
};
export default Index;
