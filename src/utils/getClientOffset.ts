import { ICoordinates } from "../interfaces/ICoordinates";

export function getClientOffset(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  event: MouseEvent
): ICoordinates | undefined {
  if (!canvasRef.current) {
    return;
  }

  const canvas = canvasRef.current;

  const { pageX, pageY } = event;
  const x = pageX - canvas.offsetLeft;
  const y = pageY - canvas.offsetTop;

  return {
    x,
    y,
  };
}
