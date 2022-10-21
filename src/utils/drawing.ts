import { ICoordinates } from "../interfaces/ICoordinates";
import { ILine } from "../interfaces/ILine";

export function drawPoint(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  x: number,
  y: number,
  color: string,
  size: number
) {
  if (!canvasRef.current) {
    return;
  }

  const canvas = canvasRef.current;

  const context = canvas.getContext("2d");

  const pointX = Math.round(x);
  const pointY = Math.round(y);

  if (context) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
    context.fill();
  }
}

export function drawLine(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  lines: ILine[],
  startPosition: ICoordinates,
  endPosition: ICoordinates
) {
  if (!canvasRef.current) {
    return;
  }

  const canvas = canvasRef.current;

  const context = canvas.getContext("2d");

  if (context) {
    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineWidth = 3;

    context.beginPath();

    lines.forEach((line) => {
      context.moveTo(line.startPoint.x, line.startPoint.y);
      context.lineTo(line.endPoint.x, line.endPoint.y);
    });

    context.moveTo(startPosition.x, startPosition.y);
    context.lineTo(endPosition.x, endPosition.y);

    context.stroke();
  }
}
