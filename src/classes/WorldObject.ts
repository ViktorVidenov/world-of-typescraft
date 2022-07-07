import { Point, Team, WorldObjectModel } from "src/models/models";

export abstract class WorldObject implements WorldObjectModel {
    // [x: string]: any;
    private _isDestroyed: boolean;
    private _healthPoints: number;
    private _position: Point;
    private _canMove: boolean;
    private _team: Team;
    [name: string]: any;

    public get isDestroyed(): boolean {
        return this._isDestroyed;
    }

    public set isDestroyed(value: boolean) {
        this._isDestroyed = value;
    }

    public get healthPoints(): number {
        return this._healthPoints;
    }

    public set healthPoints(value: number) {
        if (value <= 0) {
            this._healthPoints = 0;
            this._isDestroyed = true;
        } else {
            this._healthPoints = value;
        }
    }

    public get position(): Point {
        return this._position;
    }

    public get canMove(): boolean {
        return this._canMove;
    }

    public set canMove(value: boolean) {
        this._canMove = value;
    }

    public get team(): Team {
        return this._team;
    }

    constructor(
        position: Point,
        canMoove: boolean = true,
        team: Team = Team.NEUTRAL
    ) {
        this._isDestroyed = false;
        this._position = position;
        this._canMove = canMoove;
        this._team = team;
    }

    public modifyPosition(newCordinates: Point): void {
        if (this._canMove) {
            this._position = { ...newCordinates }
        }
    }

    //if someone attack u we will using modifyHealtPoints
    public modifyHealthPoints(value: number): void {
        this._healthPoints -= value;
        if (this._healthPoints <= 0) {
            this._healthPoints = 0;
            this._isDestroyed = true;
        }
    }

}