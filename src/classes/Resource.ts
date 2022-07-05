import { Point, ResourcesModule, ResourcesType, Team } from "src/models/models";
import { WorldObject } from "./WorldObject";

export class Resource extends WorldObject implements ResourcesModule {
    private _quantity: number = this.healthPoints;
    private _resourceType: ResourcesType;

    public get quantity(): number {
        return this._quantity
    }

    public get resourceType(): ResourcesType {
        return this._resourceType;
    }

    constructor(
        resourceType: ResourcesType,
        position: Point,
        quantity: number,
    ) {
        super(position, false)
        this._resourceType = resourceType;
        this._quantity = quantity;
    }
}