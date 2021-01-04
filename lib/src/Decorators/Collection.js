"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var MetadataStorage_1 = require("../MetadataStorage");
var pluralize_1 = require("pluralize");
function Collection(entityName) {
    return function (entity) {
        MetadataStorage_1.getMetadataStorage().setCollection({
            name: entityName || pluralize_1.plural(entity.name),
            entity: entity,
        });
    };
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map