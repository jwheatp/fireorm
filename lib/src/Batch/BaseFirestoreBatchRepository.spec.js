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
var BaseFirestoreBatchRepository_1 = require("./BaseFirestoreBatchRepository");
var fixture_1 = require("../../test/fixture");
var MetadataStorage_1 = require("../MetadataStorage");
var BandCollection_1 = require("../../test/BandCollection");
var FirestoreBatchUnit_1 = require("./FirestoreBatchUnit");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var MockFirebase = require('mock-cloud-firestore');
describe('BaseFirestoreBatchRepository', function () {
    var bandRepository = null;
    var firestore;
    var batch;
    var batchStub;
    beforeEach(function () {
        var fixture = Object.assign({}, fixture_1.getFixture());
        var firebase = new MockFirebase(fixture, {
            isNaiveSnapshotListenerEnabled: false,
        });
        batchStub = {
            create: jest.fn(),
            update: jest.fn(),
            set: jest.fn(),
            delete: jest.fn(),
            commit: jest.fn(),
        };
        firestore = Object.assign(firebase.firestore(), { batch: function () { return batchStub; } });
        MetadataStorage_1.initialize(firestore);
        batch = new FirestoreBatchUnit_1.FirestoreBatchUnit(firestore);
        bandRepository = new BaseFirestoreBatchRepository_1.BaseFirestoreBatchRepository(batch, BandCollection_1.Band);
    });
    describe('create', function () {
        it('must create items when id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.id = 'perfect-circle';
                        entity.name = 'A Perfect Circle';
                        entity.formationYear = 1999;
                        entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
                        bandRepository.create(entity);
                        return [4 /*yield*/, batch.commit()];
                    case 1:
                        _a.sent();
                        expect(batchStub.set.mock.calls[0][1]).toEqual({
                            id: 'perfect-circle',
                            name: 'A Perfect Circle',
                            formationYear: 1999,
                            genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('must create items and assign a custom id if no id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.name = 'The Pinapple Thief';
                        entity.formationYear = 1999;
                        entity.genres = ['progressive-rock'];
                        bandRepository.create(entity);
                        return [4 /*yield*/, batch.commit()];
                    case 1:
                        _a.sent();
                        data = batchStub.set.mock.calls[0][1];
                        expect(typeof data.id).toEqual('string');
                        expect(data.name).toEqual('The Pinapple Thief');
                        expect(data.formationYear).toEqual(1999);
                        expect(data.genres).toEqual(['progressive-rock']);
                        return [2 /*return*/];
                }
            });
        }); });
        it.todo('must be able to create document from anonymous object without id');
    });
    describe('update', function () {
        it('must call batch.update', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.id = 'perfect-circle';
                        entity.name = 'A Perfect Circle';
                        entity.formationYear = 1999;
                        entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
                        bandRepository.create(entity);
                        return [4 /*yield*/, batch.commit()];
                    case 1:
                        _a.sent();
                        entity.name = 'Un Círculo Perfecto';
                        bandRepository.update(entity);
                        return [4 /*yield*/, batch.commit()];
                    case 2:
                        _a.sent();
                        expect(batchStub.update.mock.calls[0][1]).toEqual({
                            id: 'perfect-circle',
                            name: 'Un Círculo Perfecto',
                            formationYear: 1999,
                            genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('delete', function () {
        it('must call batch.delete', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.id = 'perfect-circle';
                        entity.name = 'A Perfect Circle';
                        entity.formationYear = 1999;
                        entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
                        bandRepository.delete(entity);
                        return [4 /*yield*/, batch.commit()];
                    case 1:
                        _a.sent();
                        expect(batchStub.delete.mock.calls[0][1]).toEqual({
                            id: 'perfect-circle',
                            name: 'A Perfect Circle',
                            formationYear: 1999,
                            genres: ['alternative-rock', 'alternative-metal', 'hard-rock'],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('should run validations', function () {
        it('should run validations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validationBatch, validationBandRepository, entity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        validationBatch = new FirestoreBatchUnit_1.FirestoreBatchUnit(firestore);
                        validationBandRepository = new BaseFirestoreBatchRepository_1.BaseFirestoreBatchRepository(validationBatch, BandCollection_1.Band);
                        entity = new BandCollection_1.Band();
                        entity.id = 'perfect-circle';
                        entity.name = 'A Perfect Circle';
                        entity.formationYear = 1999;
                        entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
                        entity.contactEmail = 'Not an email';
                        validationBandRepository.create(entity);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validationBatch.commit()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        expect(error_1[0].constraints.isEmail).toEqual('Invalid email!');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('should not run validations on delete', function () { return __awaiter(void 0, void 0, void 0, function () {
            var validationBatch, validationBandRepository, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        validationBatch = new FirestoreBatchUnit_1.FirestoreBatchUnit(firestore);
                        validationBandRepository = new BaseFirestoreBatchRepository_1.BaseFirestoreBatchRepository(validationBatch, BandCollection_1.Band);
                        entity = new BandCollection_1.Band();
                        entity.id = 'perfect-circle';
                        entity.name = 'A Perfect Circle';
                        entity.formationYear = 1999;
                        entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
                        entity.contactEmail = 'email@apc.com';
                        validationBandRepository.create(entity);
                        return [4 /*yield*/, validationBatch.commit()];
                    case 1:
                        _a.sent();
                        entity.contactEmail = 'email';
                        validationBandRepository.delete(entity);
                        expect(validationBatch.commit).not.toThrow();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    //TODO: for this to work I'll probably need to do the collectionPath refactor
    // Copy from BaseFirestoreTransactionRepository.spec
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    describe('must handle subcollections', function () { });
});
//# sourceMappingURL=BaseFirestoreBatchRepository.spec.js.map