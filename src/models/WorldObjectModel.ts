export interface WorldObjectModel {
  isDestroyed: boolean;
  healthPoints: number;
  position: Point;
  canMove: boolean;
  team: Team;
  modifyPosition(newCordinates: Point): void;
  modifyHealthPoints(value: number): void;
}

export interface Point {
  x: number;
  y: number;
}

export enum Team {
  NEUTRAL = 'NEUTRAL',
  BLUE = 'BLUE',
  RED = 'RED',
}