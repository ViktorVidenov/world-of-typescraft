import { Point } from "src/models/models"

export function validatePosition(position: Point, names: string[], unitName: string): boolean {
  let isNotValidPosition = false;

  if(!names.includes(unitName)) {
    return false;
  }
  if (isNaN(position.x) || isNaN(position.y)) {
    return isNotValidPosition = true
  }
  return isNotValidPosition
}
