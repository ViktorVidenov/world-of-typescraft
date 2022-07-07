import { Point, ResourcesModule, ResourcesType } from "src/models/models";
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

    public set quantity(value: number) {
        this._quantity = value;
        if(this._quantity === 0) {
            this.isDestroyed = true;
        }
    }

    constructor(
        resourceType: ResourcesType,
        position: Point,
        quantity: number,
    ) {
        super(position, false)
        this._resourceType = resourceType;
        this._quantity = quantity;
        this.healthPoints = quantity;
    }
}