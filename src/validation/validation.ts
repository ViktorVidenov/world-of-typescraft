import { Unit } from "src/classes/Unit";
import { WorldObject } from "src/classes/WorldObject";
import { Point, Team, UnitType, } from "src/models/models"

export function validatePosition(position: Point): boolean {
  let isNotValidPosition = false;
  if (isNaN(position.x) || isNaN(position.y)) {
    return isNotValidPosition = true
  }
  return isNotValidPosition
}
