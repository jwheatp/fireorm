"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTransaction = void 0;
var BaseFirestoreTransactionRepository_1 = require("./BaseFirestoreTransactionRepository");
var MetadataStorage_1 = require("../MetadataStorage");
var metadataStorage = MetadataStorage_1.getMetadataStorage();
var FirestoreTransaction = /** @class */ (function () {
    function FirestoreTransaction(transaction) {
        this.transaction = transaction;
    }
    FirestoreTransaction.prototype.getRepository = function (entity) {
        if (!metadataStorage.firestoreRef) {
            throw new Error('Firestore must be initialized first');
        }
        return new BaseFirestoreTransactionRepository_1.TransactionRepository(this.transaction, entity);
    };
    return FirestoreTransaction;
}());
exports.FirestoreTransaction = FirestoreTransaction;
//# sourceMappingURL=FirestoreTransaction.js.map