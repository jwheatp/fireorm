"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initialize = exports.initialize = exports.getMetadataStorage = exports.clearMetadataStorage = exports.MetadataStorage = exports.getStore = void 0;
var BaseRepository_1 = require("./BaseRepository");
function getStore() {
    return global;
}
exports.getStore = getStore;
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        var _this = this;
        this.collections = [];
        this.subCollections = [];
        this.repositories = new Map();
        this.config = {
            validateModels: false,
        };
        this.getCollection = function (param) {
            if (typeof param === 'string') {
                return _this.collections.find(function (c) { return c.name === param; });
            }
            return _this.collections.find(function (c) { return c.entity === param; });
        };
        this.setCollection = function (col) {
            var existing = _this.getCollection(col.entity);
            if (!existing) {
                _this.collections.push(col);
            }
        };
        this.getSubCollectionsFromParent = function (parentEntity) {
            return _this.subCollections.filter(function (s) { return s.parentEntity === parentEntity; });
        };
        this.getSubCollection = function (param) {
            if (typeof param === 'string') {
                return _this.subCollections.find(function (c) { return c.name === param; });
            }
            return _this.subCollections.find(function (c) { return c.entity === param; });
        };
        this.setSubCollection = function (subCol) {
            _this.subCollections.push(subCol);
        };
        this.getRepository = function (param) {
            return _this.repositories.get(param);
        };
        this.setRepository = function (repo) {
            var savedRepo = _this.getRepository(repo.entity);
            if (savedRepo && repo.target !== savedRepo.target) {
                throw new Error('Cannot register a custom repository twice with two different targets');
            }
            if (!(repo.target.prototype instanceof BaseRepository_1.BaseRepository)) {
                throw new Error('Cannot register a custom repository on a class that does not inherit from BaseFirestoreRepository');
            }
            _this.repositories.set(repo.entity, repo);
        };
        this.firestoreRef = null;
    }
    return MetadataStorage;
}());
exports.MetadataStorage = MetadataStorage;
function initializeMetadataStorage() {
    var store = getStore();
    if (!store.metadataStorage) {
        store.metadataStorage = new MetadataStorage();
    }
}
/**
 * Used for testing to reset metadataStore to clean state
 */
function clearMetadataStorage() {
    var store = getStore();
    store.metadataStorage = null;
}
exports.clearMetadataStorage = clearMetadataStorage;
/**
 * Return exisiting metadataStorage, otherwise create if not present
 */
exports.getMetadataStorage = function () {
    var store = getStore();
    if (!store.metadataStorage) {
        initializeMetadataStorage();
    }
    return store.metadataStorage;
};
exports.initialize = function (firestore, config) {
    if (config === void 0) { config = { validateModels: false }; }
    var metadataStorage = exports.getMetadataStorage();
    metadataStorage.firestoreRef = firestore;
    metadataStorage.config = config;
};
/**
 * @deprecated Use initialize. This will be removed in a future version.
 */
exports.Initialize = exports.initialize;
//# sourceMappingURL=MetadataStorage.js.map