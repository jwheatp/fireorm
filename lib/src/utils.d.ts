import { CollectionMetadata } from './MetadataStorage';
import { IEntity } from '.';
/**
 * Extract getters and object in form of data properties
 * @param {T} Entity object
 * @returns {Object} with only data properties
 */
export declare function extractAllGetter<T>(obj: T): Record<string, unknown>;
/**
 * Returns a serializable object from entity<T>
 *
 * @template T
 * @param {T} Entity object
 * @param {CollectionMetadata[]} subColMetadata Subcollection
 * metadata to remove runtime-created fields
 * @returns {Object} Serialiable object
 */
export declare function serializeEntity<T extends IEntity>(obj: T, subColMetadata: CollectionMetadata[]): Record<string, unknown>;
