import { ReactNode } from "react";
import styles from "static/styles/components/layout/AppLayout.module.css";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
