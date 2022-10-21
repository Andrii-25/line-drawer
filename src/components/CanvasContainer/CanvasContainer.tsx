import React from "react";
import styles from "./CanvasContainer.module.scss";

interface CanvasContainerProps {
  children: React.ReactNode;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ children }) => {
  return <div className={styles["container"]}>{children}</div>;
};

export default CanvasContainer;
