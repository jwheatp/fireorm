import { CollectionReference } from '@google-cloud/firestore';
import { IEntity, WithOptionalId, Constructor } from '../types';
import { CollectionMetadata, MetadataStorageConfig } from '../MetadataStorage';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';
export declare class BaseFirestoreBatchRepository<T extends IEntity> {
    protected batch: FirestoreBatchUnit;
    protected entity: Constructor<T>;
    protected colMetadata: CollectionMetadata;
    protected subColMetadata: CollectionMetadata[];
    protected collectionPath: string;
    protected colRef: CollectionReference;
    protected config: MetadataStorageConfig;
    constructor(batch: FirestoreBatchUnit, entity: Constructor<T>, collectionPath?: string);
    create: (item: WithOptionalId<T>) => void;
    update: (item: T) => void;
    delete: (item: T) => void;
}
