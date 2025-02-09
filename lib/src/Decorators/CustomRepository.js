"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRepository = void 0;
var MetadataStorage_1 = require("../MetadataStorage");
/*
  Cannot enforce the type in target presumably becasuse Typescript
  cannot verify than the T from the entity param is the same T from
  the repository. Might be interesting to revisit later
*/
function CustomRepository(entity) {
    return function (target) {
        MetadataStorage_1.getMetadataStorage().setRepository({
            entity: entity,
            target: target,
        });
    };
}
exports.CustomRepository = CustomRepository;
//# sourceMappingURL=CustomRepository.js.map