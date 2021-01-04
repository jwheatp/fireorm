import { IEntity, Constructor } from '../types';
import { Firestore, DocumentReference } from '@google-cloud/firestore';
import { CollectionMetadata } from '../MetadataStorage';
import { ValidationError } from '../Errors/ValidationError';
declare type BatchOperation<T extends IEntity> = {
    type: 'create' | 'update' | 'delete';
    item: IEntity;
    ref: DocumentReference;
    entity: Constructor<T>;
    subCollectionsMetadata: CollectionMetadata[];
    validateModels: boolean;
};
export declare class FirestoreBatchUnit {
    private firestoreRef;
    private status;
    operations: BatchOperation<IEntity>[];
    constructor(firestoreRef: Firestore);
    add<T extends IEntity>(type: BatchOperation<T>['type'], item: T, ref: DocumentReference, entity: Constructor<T>, subCollectionsMetadata: CollectionMetadata[], validateModels: boolean): void;
    commit: () => Promise<FirebaseFirestore.WriteResult[]>;
    validate(item: IEntity, Entity: Constructor<IEntity>): Promise<ValidationError[]>;
}
export {};
