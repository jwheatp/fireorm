"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreBatchSingleRepository = void 0;
var BaseFirestoreBatchRepository_1 = require("./BaseFirestoreBatchRepository");
/**
 *
 * This class is only needed to maintain current batch functionality
 * inside repositories and will be deleted in the next major version
 *
 * @export
 * @class FirestoreBatchRepository
 * @extends {FirestoreBatchSingleRepository<T>}
 * @template T
 */
var FirestoreBatchSingleRepository = /** @class */ (function (_super) {
    __extends(FirestoreBatchSingleRepository, _super);
    function FirestoreBatchSingleRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirestoreBatchSingleRepository.prototype.commit = function () {
        return this.batch.commit();
    };
    return FirestoreBatchSingleRepository;
}(BaseFirestoreBatchRepository_1.BaseFirestoreBatchRepository));
exports.FirestoreBatchSingleRepository = FirestoreBatchSingleRepository;
//# sourceMappingURL=FirestoreBatchSingleRepository.js.map