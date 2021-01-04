import { Firestore } from '@google-cloud/firestore';
import { IEntityConstructor, IEntityRepositoryConstructor } from './types';
export interface IMetadataStore {
    metadataStorage: MetadataStorage | null;
}
export declare function getStore(): IMetadataStore;
export interface CollectionMetadata {
    name: string;
    entity: IEntityConstructor;
    parentEntity?: IEntityConstructor;
    propertyKey?: string;
}
export interface RepositoryMetadata {
    target: IEntityRepositoryConstructor;
    entity: IEntityConstructor;
}
export interface MetadataStorageConfig {
    validateModels?: boolean;
}
export declare class MetadataStorage {
    readonly collections: Array<CollectionMetadata>;
    readonly subCollections: Array<CollectionMetadata>;
    readonly repositories: Map<unknown, RepositoryMetadata>;
    config: MetadataStorageConfig;
    getCollection: (param: string | IEntityConstructor) => CollectionMetadata;
    setCollection: (col: CollectionMetadata) => void;
    getSubCollectionsFromParent: (parentEntity: IEntityConstructor) => CollectionMetadata[];
    getSubCollection: (param: string | IEntityConstructor) => CollectionMetadata | undefined;
    setSubCollection: (subCol: CollectionMetadata) => void;
    getRepository: (param: IEntityConstructor) => RepositoryMetadata;
    setRepository: (repo: RepositoryMetadata) => void;
    firestoreRef: Firestore | null;
}
/**
 * Used for testing to reset metadataStore to clean state
 */
export declare function clearMetadataStorage(): void;
/**
 * Return exisiting metadataStorage, otherwise create if not present
 */
export declare const getMetadataStorage: () => MetadataStorage;
export declare const initialize: (firestore: Firestore, config?: MetadataStorageConfig) => void;
/**
 * @deprecated Use initialize. This will be removed in a future version.
 */
export declare const Initialize: (firestore: Firestore, config?: MetadataStorageConfig) => void;
