import { IEntityConstructor, IEntity } from '../types';
export declare function SubCollection(entity: IEntityConstructor, entityName?: string): (target: IEntity, propertyKey: string) => void;
