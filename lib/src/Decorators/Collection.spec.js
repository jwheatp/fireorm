"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataStorage_1 = require("../MetadataStorage");
var Collection_1 = require("./Collection");
describe('CollectionDecorator', function () {
    var store = MetadataStorage_1.getStore();
    beforeEach(function () {
        MetadataStorage_1.clearMetadataStorage();
        MetadataStorage_1.initialize(null);
    });
    it('should register collections', function () {
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            Entity = __decorate([
                Collection_1.Collection('foo')
            ], Entity);
            return Entity;
        }());
        var collection = store.metadataStorage.getCollection('foo');
        expect(store.metadataStorage.collections.length).toEqual(1);
        expect(collection.name).toEqual('foo');
        expect(collection.entity).toEqual(Entity);
    });
    it('should register collections with default name', function () {
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            Entity = __decorate([
                Collection_1.Collection()
            ], Entity);
            return Entity;
        }());
        var collection = store.metadataStorage.getCollection('Entities');
        expect(store.metadataStorage.collections.length).toEqual(1);
        expect(collection.name).toEqual('Entities');
        expect(collection.entity).toEqual(Entity);
    });
    it('should register collections once', function () {
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            Entity = __decorate([
                Collection_1.Collection(),
                Collection_1.Collection()
            ], Entity);
            return Entity;
        }());
        var collection = store.metadataStorage.getCollection('Entities');
        expect(store.metadataStorage.collections.length).toEqual(1);
        expect(collection.name).toEqual('Entities');
        expect(collection.entity).toEqual(Entity);
    });
});
//# sourceMappingURL=Collection.spec.js.map