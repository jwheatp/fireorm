import { IEntity } from '../types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
/**
 *
 * This class is only needed to maintain current batch functionality
 * inside repositories and will be deleted in the next major version
 *
 * @export
 * @class FirestoreBatchRepository
 * @extends {FirestoreBatchSingleRepository<T>}
 * @template T
 */
export declare class FirestoreBatchSingleRepository<T extends IEntity> extends BaseFirestoreBatchRepository<T> {
    commit(): Promise<FirebaseFirestore.WriteResult[]>;
}
