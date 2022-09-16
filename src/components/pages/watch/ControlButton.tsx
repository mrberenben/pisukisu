import React from "react";
import styles from "static/styles/components/pages/watch/ControlButton.module.css";

type ControlButtonProps = {
  onClick?: () => void;
  title?: string;
  children: React.ReactNode;
};

const ControlButton = ({ onClick, title, children }: ControlButtonProps) => {
  return (
    <button
      type="button"
      className={styles.control_button}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
};

export default ControlButton;
