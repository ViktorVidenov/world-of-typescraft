import { Point, Team } from 'src/models/WorldObjectModel';
import { UnitModel, UnitType } from 'src/models/UnitModel';
import { WorldObject } from './WorldObject';

export class Unit extends WorldObject implements UnitModel {
  private _name: string;
  private _attack: number;
  private _defense: number;
  private _canGather: boolean;
  private _type: UnitType;
  private _unitPoints: number;

  public get name(): string {
    return this._name;
  }

  public get attack(): number {
    return this._attack;
  }

  public get defense(): number {
    return this._defense;
  }

  public get canGather(): boolean {
    return this._canGather;
  }

  public get type(): UnitType {
    return this._type;
  }

  public get unitPoints(): number {
    return this._unitPoints;
  }

  constructor(
    name: string,
    position: Point,
    team: Team,
    type: UnitType,
    unitPoints?: number
  ) {
    super(position, true, team);
    this._name = name;
    this._type = type;
    this._unitPoints = this.unitPoints;

    this.setUnitStats(type);
  }

  private setUnitStats(type: UnitType) {
    switch (type) {
      case UnitType.GUARD:
        this._attack = 30;
        this._defense = 20;
        this._canGather = false;
        this.healthPoints = 80;
        this.canMove = true;
        this._unitPoints = 10;
        break;
      case UnitType.GIANT:
        this._attack = 40;
        this._defense = 20;
        this._canGather = true;
        this.healthPoints = 90;
        this.canMove = true;
        this._unitPoints = 15;
        break;
      case UnitType.NINJA:
        this._attack = 50;
        this._defense = 10;
        this._canGather = false;
        this.healthPoints = 80;
        this.canMove = true;
        this._unitPoints = 15;
        break;
      case UnitType.PEASANT:
        this._attack = 25;
        this._defense = 10;
        this._canGather = true;
        this.healthPoints = 50;
        this.canMove = true;
        this._unitPoints = 5;
        break;
      default:
        break;
    }
  }
}
