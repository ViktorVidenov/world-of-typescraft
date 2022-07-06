import {Point} from "src/models/models"

export function validatePosition(
  position: Point,

): string {
  if(isNaN(position.x) || isNaN(position.y)) {
    console.log("Invalid position");
     
  }
  return ""
}