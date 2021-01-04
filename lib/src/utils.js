"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEntity = exports.extractAllGetter = void 0;
/**
 * Extract getters and object in form of data properties
 * @param {T} Entity object
 * @returns {Object} with only data properties
 */
function extractAllGetter(obj) {
    var prototype = Object.getPrototypeOf(obj);
    var fromInstanceObj = Object.keys(obj);
    var fromInstance = Object.getOwnPropertyNames(obj);
    var fromPrototype = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
    var keys = __spreadArrays(fromInstanceObj, fromInstance, fromPrototype);
    var getters = keys
        .map(function (key) { return Object.getOwnPropertyDescriptor(prototype, key); })
        .map(function (descriptor, index) {
        if (descriptor && typeof descriptor.get === 'function') {
            return keys[index];
        }
        else {
            return undefined;
        }
    })
        .filter(function (d) { return d !== undefined; });
    return getters.reduce(function (accumulator, currentValue) {
        if (obj[currentValue]) {
            accumulator[currentValue] = obj[currentValue];
        }
        return accumulator;
    }, {});
}
exports.extractAllGetter = extractAllGetter;
/**
 * Returns a serializable object from entity<T>
 *
 * @template T
 * @param {T} Entity object
 * @param {CollectionMetadata[]} subColMetadata Subcollection
 * metadata to remove runtime-created fields
 * @returns {Object} Serialiable object
 */
function serializeEntity(obj, subColMetadata) {
    var objectGetters = extractAllGetter(obj);
    var serializableObj = __assign(__assign({}, obj), objectGetters);
    subColMetadata.forEach(function (scm) {
        delete serializableObj[scm.propertyKey];
    });
    return serializableObj;
}
exports.serializeEntity = serializeEntity;
//# sourceMappingURL=utils.js.map