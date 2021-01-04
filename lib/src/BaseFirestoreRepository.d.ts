import 'reflect-metadata';
import { CollectionReference } from '@google-cloud/firestore';
import { IRepository, IFireOrmQueryLine, IOrderByParams, IEntity } from './types';
import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';
import { TransactionRepository } from './Transaction/BaseFirestoreTransactionRepository';
export declare class BaseFirestoreRepository<T extends IEntity> extends AbstractFirestoreRepository<T> implements IRepository<T> {
    readonly firestoreColRef: CollectionReference;
    constructor(colName: string, collectionPath?: string);
    findById(id: string): Promise<T>;
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: string): Promise<void>;
    runTransaction<R>(executor: (tran: TransactionRepository<T>) => Promise<R>): Promise<R>;
    createBatch(): import("./Batch/FirestoreBatchSingleRepository").FirestoreBatchSingleRepository<T>;
    execute(queries: Array<IFireOrmQueryLine>, limitVal?: number, orderByObj?: IOrderByParams, single?: boolean): Promise<T[]>;
}
