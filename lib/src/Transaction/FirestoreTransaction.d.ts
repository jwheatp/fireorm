import { Transaction } from '@google-cloud/firestore';
import { TransactionRepository } from './BaseFirestoreTransactionRepository';
import { IEntity, Constructor } from '../types';
export declare class FirestoreTransaction {
    private transaction;
    constructor(transaction: Transaction);
    getRepository<T extends IEntity>(entity: Constructor<T>): TransactionRepository<T>;
}
