import { UnitType } from 'src/models/UnitModel';
import { Point, Team } from 'src/models/WorldObjectModel';

export function validatePosition(position: Point): boolean {
  return isNaN(position.x) || isNaN(position.y);
}

export function validateUnit(
  name: string,
  names: string[],
  team: Team,
  unitType: UnitType,
  coordinates: Point
): string {
  if (names.includes(name)) {
    return 'Unit with this name already exists!!';
  }

  if (name.length >= 20) {
    return 'Unit name too long!';
  }

  if (!Object.values(Team).includes(team)) {
    return `Team ${team.toLowerCase()} does not exist!`;
  }

  if (!Object.values(UnitType).includes(unitType)) {
    return `Unit type ${unitType.toLowerCase()} does not exist!`;
  }

  if (validatePosition(coordinates)) {
    return 'Invalid coordinates';
  }

  return '';
}

export function isItOnSamePosition(cordinates: Point[], currentCordinate: Point): boolean {
  let isFoundEqual = false

  cordinates.forEach((row) => {
    if (row.x === currentCordinate.x && row.y === currentCordinate.y) {
      isFoundEqual = true;
    }
  });
  return isFoundEqual;
}