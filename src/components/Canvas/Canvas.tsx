import { useEffect, useRef } from "react";
import { ICoordinates } from "../../interfaces/ICoordinates";
import { ILine } from "../../interfaces/ILine";
import { calculateIntersection } from "../../utils/calculateIntersection";
import { drawLine, drawPoint } from "../../utils/drawing";
import { getClientOffset } from "../../utils/getClientOffset";
import styles from "./Canvas.module.scss";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let startPosition: ICoordinates = { x: 0, y: 0 };
  let endPosition: ICoordinates = { x: 0, y: 0 };
  let isDrawStart: boolean = false;
  let isFirstClick: boolean = false;
  let isSecondClick: boolean = false;
  const lines: ILine[] = [];

  const mouseClickListener = (event: MouseEvent) => {
    if ((!isFirstClick && !isSecondClick) || (!isFirstClick && isSecondClick)) {
      isFirstClick = true;
      isSecondClick = false;
      const currentStartPosition = getClientOffset(canvasRef, event);
      if (currentStartPosition) {
        startPosition = currentStartPosition;
      }

      isDrawStart = true;
      return;
    }
    if (isFirstClick && !isSecondClick) {
      isSecondClick = true;
      isFirstClick = false;

      lines.push({
        startPoint: { x: startPosition.x, y: startPosition.y },
        endPoint: { x: endPosition.x, y: endPosition.y },
      });

      isDrawStart = false;
    }
  };

  const mouseMoveListener = (event: MouseEvent) => {
    if (!isDrawStart) return;

    const currentEndPosition = getClientOffset(canvasRef, event);

    if (currentEndPosition) {
      endPosition = currentEndPosition;
    }

    clearCanvas();

    lines.forEach((l1: ILine) => {
      lines.forEach((l2: ILine) => {
        const interSectionPoint = calculateIntersection(l1, l2);
        if (interSectionPoint) {
          if (typeof interSectionPoint !== "boolean") {
            drawPoint(
              canvasRef,
              interSectionPoint.x,
              interSectionPoint.y,
              "red",
              5
            );
          }
        }
      });
    });

    lines.forEach((line) => {
      const interSectionPoint = calculateIntersection(
        {
          startPoint: { x: startPosition.x, y: startPosition.y },
          endPoint: { x: endPosition.x, y: endPosition.y },
        },
        { startPoint: line.startPoint, endPoint: line.endPoint }
      );
      if (interSectionPoint) {
        if (typeof interSectionPoint !== "boolean") {
          drawPoint(
            canvasRef,
            interSectionPoint.x,
            interSectionPoint.y,
            "red",
            5
          );
        }
      }
    });

    drawLine(canvasRef, lines, startPosition, endPosition);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const resetCanvas = () => {
    clearCanvas();
    startPosition = { x: 0, y: 0 };
    endPosition = { x: 0, y: 0 };
    isDrawStart = false;
    isFirstClick = false;
    isSecondClick = false;
    lines.length = 0;
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;

    canvas.addEventListener("click", mouseClickListener);
    canvas.addEventListener("mousemove", mouseMoveListener);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        className={styles["canvas"]}
      ></canvas>
      <div className={styles["btn-wrapper"]}>
        <button className={styles["btn"]} onClick={resetCanvas}>
          Clear canvas
        </button>
      </div>
    </>
  );
}
