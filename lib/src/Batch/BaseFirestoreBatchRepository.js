"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFirestoreBatchRepository = void 0;
var MetadataStorage_1 = require("../MetadataStorage");
var BaseFirestoreBatchRepository = /** @class */ (function () {
    function BaseFirestoreBatchRepository(batch, entity, collectionPath) {
        var _this = this;
        this.batch = batch;
        this.entity = entity;
        this.create = function (item) {
            var doc = item.id ? _this.colRef.doc(item.id) : _this.colRef.doc();
            if (!item.id) {
                item.id = doc.id;
            }
            _this.batch.add('create', item, doc, _this.colMetadata.entity, _this.subColMetadata, _this.config.validateModels);
        };
        this.update = function (item) {
            _this.batch.add('update', item, _this.colRef.doc(item.id), _this.colMetadata.entity, _this.subColMetadata, _this.config.validateModels);
        };
        this.delete = function (item) {
            _this.batch.add('delete', item, _this.colRef.doc(item.id), _this.colMetadata.entity, _this.subColMetadata, _this.config.validateModels);
        };
        var _a = MetadataStorage_1.getMetadataStorage(), getCollection = _a.getCollection, getSubCollection = _a.getSubCollection, getSubCollectionsFromParent = _a.getSubCollectionsFromParent, firestoreRef = _a.firestoreRef, config = _a.config;
        this.colMetadata = getSubCollection(entity) || getCollection(entity);
        this.subColMetadata = getSubCollectionsFromParent(this.colMetadata.entity);
        this.collectionPath = collectionPath || this.colMetadata.name;
        this.colRef = firestoreRef.collection(this.collectionPath);
        this.config = config;
    }
    return BaseFirestoreBatchRepository;
}());
exports.BaseFirestoreBatchRepository = BaseFirestoreBatchRepository;
//# sourceMappingURL=BaseFirestoreBatchRepository.js.map