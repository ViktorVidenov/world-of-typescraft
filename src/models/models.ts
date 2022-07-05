export interface WorldObjectModel {
    isDestroyed: boolean;
    healthPoints: number;
    position: Point;
    canMove: boolean;
    team: Team;
    modifyPosition(newCordinates: Point): void;
    modifyHealthPoints(value: number): void;
}

export interface UnitModel {
    name: string;
    attack: number;
    defense: number;
    canGather: boolean;
    type: UnitType;

}

export interface ResourcesModule {
    quantity: number;
    resourceType: ResourcesType;
}

export enum Team {
    NEUTRAL = 'NEUTRAL',
    BLUE = 'BLUE',
    RED = 'RED',
}

export interface Point {
    x: number;
    y: number;
}

export enum ResourcesType {
    FOOD = 'FOOD',
    LUMBER = 'LUMBER',
    IRON = 'IRON',
}

export enum UnitType {
    PEASANT = 'PEASANT',
    GUARD = 'GUARD',
    NINJA = 'NINJA',
    GIANT = 'GIANT',
}