import { WorldObject } from 'src/classes/WorldObject';
import { ResourcesType } from 'src/models/ResourseModel';
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

export function validateResource (
  resourceType: ResourcesType,
  healthPoints: number,
  resourceCordinates: Point,
  cordinates: Point[],
): string {

  if (isNaN(healthPoints) || healthPoints < 1) {
   return `Please provide valid quantity!`;
  }

  if (
    resourceType !== ResourcesType.FOOD &&
    resourceType !== ResourcesType.IRON &&
    resourceType !== ResourcesType.LUMBER
  ) {
     return `Resource type ${resourceType} does not exist!`
  }

  if (isItOnTheSamePosition(cordinates, resourceCordinates)) {
   return `There is already a resource at this position, please try a different position.`;
  }

  if (validatePosition(resourceCordinates)) {
   return 'Invalid Cordinates!'
    
  }

  return ''
}

export function isItOnTheSamePosition(cordinates: Point[], currentCordinate: Point): boolean {
  let isFoundEqual = false

  cordinates.forEach((row) => {
    if (row.x === currentCordinate.x && row.y === currentCordinate.y) {
      isFoundEqual = true;
    }
  });
  return isFoundEqual;
}
