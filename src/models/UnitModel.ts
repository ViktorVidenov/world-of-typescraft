import { WorldObjectModel } from "./WorldObjectModel";

export interface UnitModel extends WorldObjectModel {
  name: string;
  attack: number;
  defense: number;
  canGather: boolean;
  type: UnitType;
}

export enum UnitType {
  PEASANT = 'PEASANT',
  GUARD = 'GUARD',
  NINJA = 'NINJA',
  GIANT = 'GIANT',
}