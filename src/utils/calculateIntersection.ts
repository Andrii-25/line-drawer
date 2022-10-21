import { ICoordinates } from "../interfaces/ICoordinates";
import { ILine } from "../interfaces/ILine";

export function calculateIntersection(
  line1: ILine,
  line2: ILine
): ICoordinates | boolean {
  const x1: number = line1.startPoint.x;
  const y1: number = line1.startPoint.y;
  const x2: number = line1.endPoint.x;
  const y2: number = line1.endPoint.y;
  const x3: number = line2.startPoint.x;
  const y3: number = line2.startPoint.y;
  const x4: number = line2.endPoint.x;
  const y4: number = line2.endPoint.y;

  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  const denominator: number = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if (denominator === 0) {
    return false;
  }

  let ua: number =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub: number =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }
  let x: number = x1 + ua * (x2 - x1);
  let y: number = y1 + ua * (y2 - y1);

  return { x, y };
}
