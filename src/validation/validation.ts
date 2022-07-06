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

export function moveUnit(position: Point, team: Team, name: string, type: UnitType, worldObjects: WorldObject[]): string {
  const newUnit = new Unit(position, team, name, type)
  let output = ''
  worldObjects.forEach((player) => {
    Object.values(player).forEach(playerName => {
      if (playerName === newUnit.name) {
        player.modifyPosition(position);

        output = `Unit ${newUnit.name} moved to ${position.x}, ${position.y}`
        return
      }
      return output
    })
  })
  return output
}

// export function attackValidation(type: UnitType) {
//   let currentType = type.toUpperCase()
//   if (currentType === UnitType.PEASANT) { 

//   }
// }

// export function attackUnit() {

// }