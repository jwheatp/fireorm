"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatch = exports.runTransaction = exports.GetBaseRepository = exports.getBaseRepository = exports.GetCustomRepository = exports.getCustomRepository = exports.GetRepository = exports.getRepository = void 0;
var MetadataStorage_1 = require("./MetadataStorage");
var BaseFirestoreRepository_1 = require("./BaseFirestoreRepository");
var FirestoreTransaction_1 = require("./Transaction/FirestoreTransaction");
var FirestoreBatch_1 = require("./Batch/FirestoreBatch");
function _getRepository(entity, repositoryType, documentPath) {
    var metadataStorage = MetadataStorage_1.getMetadataStorage();
    if (!metadataStorage.firestoreRef) {
        throw new Error('Firestore must be initialized first');
    }
    var repository = metadataStorage.getRepository(entity);
    if (repositoryType === 'custom' && !repository) {
        throw new Error("'" + entity.name + "' does not have a custom repository.");
    }
    var collection = documentPath
        ? metadataStorage.getSubCollection(entity)
        : metadataStorage.getCollection(entity);
    if (!collection) {
        throw new Error("'" + entity.name + "' is not a valid collection");
    }
    if (collection.parentEntity) {
        var parentCollection = metadataStorage.getCollection(collection.parentEntity);
        if (!parentCollection) {
            throw new Error("'" + entity.name + "' does not have a valid parent collection.");
        }
    }
    if (repositoryType === 'custom' || (repositoryType === 'default' && repository)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new repository.target(collection.name, documentPath);
    }
    else {
        return new BaseFirestoreRepository_1.BaseFirestoreRepository(collection.name, documentPath);
    }
}
function getRepository(entity, documentPath) {
    return _getRepository(entity, 'default', documentPath);
}
exports.getRepository = getRepository;
/**
 * @deprecated Use getRepository. This will be removed in a future version.
 */
exports.GetRepository = getRepository;
function getCustomRepository(entity, documentPath) {
    return _getRepository(entity, 'custom', documentPath);
}
exports.getCustomRepository = getCustomRepository;
/**
 * @deprecated Use getCustomRepository. This will be removed in a future version.
 */
exports.GetCustomRepository = getCustomRepository;
function getBaseRepository(entity, documentPath) {
    return _getRepository(entity, 'base', documentPath);
}
exports.getBaseRepository = getBaseRepository;
/**
 * @deprecated Use getBaseRepository. This will be removed in a future version.
 */
exports.GetBaseRepository = getBaseRepository;
exports.runTransaction = function (executor) {
    var metadataStorage = MetadataStorage_1.getMetadataStorage();
    if (!metadataStorage.firestoreRef) {
        throw new Error('Firestore must be initialized first');
    }
    return metadataStorage.firestoreRef.runTransaction(function (t) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, executor(new FirestoreTransaction_1.FirestoreTransaction(t))];
        });
    }); });
};
exports.createBatch = function () {
    var metadataStorage = MetadataStorage_1.getMetadataStorage();
    if (!metadataStorage.firestoreRef) {
        throw new Error('Firestore must be initialized first');
    }
    return new FirestoreBatch_1.FirestoreBatch(metadataStorage.firestoreRef);
};
//# sourceMappingURL=helpers.js.map