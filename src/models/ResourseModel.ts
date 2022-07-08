export interface ResourcesModule {
  quantity: number;
  resourceType: ResourcesType;
}

export enum ResourcesType {
  FOOD = 'FOOD',
  LUMBER = 'LUMBER',
  IRON = 'IRON',
}
