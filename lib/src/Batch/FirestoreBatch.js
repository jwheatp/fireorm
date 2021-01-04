"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreBatch = void 0;
var BaseFirestoreBatchRepository_1 = require("./BaseFirestoreBatchRepository");
var FirestoreBatchSingleRepository_1 = require("./FirestoreBatchSingleRepository");
var FirestoreBatchUnit_1 = require("./FirestoreBatchUnit");
// TODO: handle status where batch was already committed.
var FirestoreBatch = /** @class */ (function () {
    function FirestoreBatch(firestoreRef) {
        var _this = this;
        this.firestoreRef = firestoreRef;
        /**
         *
         * Commits current batch.
         *
         * @template T
         * @param {Constructor<T>} entity
         * @returns
         * @memberof FirestoreBatch
         */
        this.commit = function () {
            return _this.batch.commit();
        };
        this.batch = new FirestoreBatchUnit_1.FirestoreBatchUnit(firestoreRef);
    }
    /**
     *
     * Returns a batch repository of T.
     *
     * @template T
     * @param {Constructor<T>} entity
     * @param {String} [collectionPath]
     * @returns
     * @memberof FirestoreBatch
     */
    FirestoreBatch.prototype.getRepository = function (entity, collectionPath) {
        return new BaseFirestoreBatchRepository_1.BaseFirestoreBatchRepository(this.batch, entity, collectionPath);
    };
    /**
     *
     * Returns a batch repository of a single entity. Required to maintain
     * current features and will be deleted in the next major version.
     *
     * @template T
     * @param {Constructor<T>} entity
     * @param {String} [collectionPath]
     * @returns
     * @memberof FirestoreBatch
     */
    FirestoreBatch.prototype.getSingleRepository = function (entity, collectionPath) {
        return new FirestoreBatchSingleRepository_1.FirestoreBatchSingleRepository(this.batch, entity, collectionPath);
    };
    return FirestoreBatch;
}());
exports.FirestoreBatch = FirestoreBatch;
//# sourceMappingURL=FirestoreBatch.js.map