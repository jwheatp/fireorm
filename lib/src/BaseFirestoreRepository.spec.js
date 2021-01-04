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
var MetadataStorage_1 = require("./MetadataStorage");
var fixture_1 = require("../test/fixture");
var BaseFirestoreRepository_1 = require("./BaseFirestoreRepository");
var BandCollection_1 = require("../test/BandCollection");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var MockFirebase = require('mock-cloud-firestore');
describe('BaseFirestoreRepository', function () {
    var BandRepository = /** @class */ (function (_super) {
        __extends(BandRepository, _super);
        function BandRepository() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BandRepository;
    }(BaseFirestoreRepository_1.BaseFirestoreRepository));
    var bandRepository = null;
    var firestore = null;
    beforeEach(function () {
        var fixture = Object.assign({}, fixture_1.getFixture());
        var firebase = new MockFirebase(fixture, {
            isNaiveSnapshotListenerEnabled: false,
        });
        firestore = firebase.firestore();
        MetadataStorage_1.initialize(firestore);
        bandRepository = new BandRepository('bands');
    });
    describe('limit', function () {
        it('must limit the documents in a collection', function () { return __awaiter(void 0, void 0, void 0, function () {
            var twoBands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.limit(2).find()];
                    case 1:
                        twoBands = _a.sent();
                        expect(twoBands.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must limit the results of a query', function () { return __awaiter(void 0, void 0, void 0, function () {
            var eightiesBands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository
                            .whereGreaterOrEqualThan('formationYear', 1980)
                            .limit(1)
                            .find()];
                    case 1:
                        eightiesBands = _a.sent();
                        expect(eightiesBands.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must not throw any exceptions if a query with no results is limited', function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldBands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository
                            .whereLessOrEqualThan('formationYear', 1930)
                            .limit(4)
                            .find()];
                    case 1:
                        oldBands = _a.sent();
                        expect(oldBands.length).toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must limit subcollections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt, albumsSubColl, albumsLimited;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        albumsSubColl = pt.albums;
                        return [4 /*yield*/, albumsSubColl.limit(2).find()];
                    case 2:
                        albumsLimited = _a.sent();
                        expect(albumsLimited.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must throw an exception if limit call more than once', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(function () { return bandRepository.limit(2).limit(2).find(); }).toThrow();
                return [2 /*return*/];
            });
        }); });
        it.todo('must return if limit is 0');
        it.todo('must throw if the limit is less than 0');
    });
    describe('Ordering', function () {
        describe('orderByAscending', function () {
            it('must order repository objects', function () { return __awaiter(void 0, void 0, void 0, function () {
                var bands;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.orderByAscending('formationYear').find()];
                        case 1:
                            bands = _a.sent();
                            expect(bands[0].id).toEqual('pink-floyd');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must order the objects in a subcollection', function () { return __awaiter(void 0, void 0, void 0, function () {
                var pt, albumsSubColl, discographyNewestFirst;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                        case 1:
                            pt = _a.sent();
                            albumsSubColl = pt.albums;
                            return [4 /*yield*/, albumsSubColl.orderByAscending('releaseDate').find()];
                        case 2:
                            discographyNewestFirst = _a.sent();
                            expect(discographyNewestFirst[0].id).toEqual('lightbulb-sun');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must be chainable with where* filters', function () { return __awaiter(void 0, void 0, void 0, function () {
                var pt, albumsSubColl, discographyNewestFirst;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                        case 1:
                            pt = _a.sent();
                            albumsSubColl = pt.albums;
                            return [4 /*yield*/, albumsSubColl
                                    .whereGreaterOrEqualThan('releaseDate', new Date('2001-01-01'))
                                    .orderByAscending('releaseDate')
                                    .find()];
                        case 2:
                            discographyNewestFirst = _a.sent();
                            expect(discographyNewestFirst[0].id).toEqual('in-absentia');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must be chainable with limit', function () { return __awaiter(void 0, void 0, void 0, function () {
                var bands, lastBand;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.orderByAscending('formationYear').limit(2).find()];
                        case 1:
                            bands = _a.sent();
                            lastBand = bands[bands.length - 1];
                            expect(lastBand.id).toEqual('red-hot-chili-peppers');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must throw an Error if an orderBy* function is called more than once in the same expression', function () { return __awaiter(void 0, void 0, void 0, function () {
                var pt, albumsSubColl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                        case 1:
                            pt = _a.sent();
                            albumsSubColl = pt.albums;
                            expect(function () {
                                albumsSubColl.orderByAscending('releaseDate').orderByDescending('releaseDate');
                            }).toThrow();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('orderByDescending', function () {
            it('must order repository objects', function () { return __awaiter(void 0, void 0, void 0, function () {
                var bands;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.orderByDescending('formationYear').find()];
                        case 1:
                            bands = _a.sent();
                            expect(bands[0].id).toEqual('porcupine-tree');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must order the objects in a subcollection', function () { return __awaiter(void 0, void 0, void 0, function () {
                var pt, albumsSubColl, discographyNewestFirst;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                        case 1:
                            pt = _a.sent();
                            albumsSubColl = pt.albums;
                            return [4 /*yield*/, albumsSubColl.orderByDescending('releaseDate').find()];
                        case 2:
                            discographyNewestFirst = _a.sent();
                            expect(discographyNewestFirst[0].id).toEqual('fear-blank-planet');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must be chainable with where* filters', function () { return __awaiter(void 0, void 0, void 0, function () {
                var pt, albumsSubColl, discographyNewestFirst;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                        case 1:
                            pt = _a.sent();
                            albumsSubColl = pt.albums;
                            return [4 /*yield*/, albumsSubColl
                                    .whereGreaterOrEqualThan('releaseDate', new Date('2001-01-01'))
                                    .orderByDescending('releaseDate')
                                    .find()];
                        case 2:
                            discographyNewestFirst = _a.sent();
                            expect(discographyNewestFirst[0].id).toEqual('fear-blank-planet');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must be chainable with limit', function () { return __awaiter(void 0, void 0, void 0, function () {
                var bands, lastBand;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.orderByDescending('formationYear').limit(2).find()];
                        case 1:
                            bands = _a.sent();
                            lastBand = bands[bands.length - 1];
                            expect(lastBand.id).toEqual('red-hot-chili-peppers');
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must throw an Error if an orderBy* function is called more than once in the same expression', function () { return __awaiter(void 0, void 0, void 0, function () {
                var pt, albumsSubColl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                        case 1:
                            pt = _a.sent();
                            albumsSubColl = pt.albums;
                            expect(function () {
                                albumsSubColl.orderByAscending('releaseDate').orderByDescending('releaseDate');
                            }).toThrow();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('findById', function () {
        it('must find by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        expect(pt).toBeInstanceOf(BandCollection_1.Band);
                        expect(pt.id).toEqual('porcupine-tree');
                        expect(pt.name).toEqual('Porcupine Tree');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must have proper getters', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        expect(pt.getLastShowYear()).toEqual(2010);
                        return [2 /*return*/];
                }
            });
        }); });
        it('return null if not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('steven-wilson')];
                    case 1:
                        sw = _a.sent();
                        expect(sw).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('create', function () {
        it('should return T when an item is created', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, band;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.id = 'rush';
                        entity.name = 'Rush';
                        entity.formationYear = 1968;
                        entity.genres = ['progressive-rock', 'hard-rock', 'heavy-metal'];
                        return [4 /*yield*/, bandRepository.create(entity)];
                    case 1:
                        band = _a.sent();
                        expect(band).toBeInstanceOf(BandCollection_1.Band);
                        expect(band.getPopularGenre()).toEqual('progressive-rock');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must not validate if the validate config by default', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, band;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore);
                        bandRepository = new BandRepository('bands');
                        entity = new BandCollection_1.Band();
                        entity.contactEmail = 'Not an email';
                        return [4 /*yield*/, bandRepository.create(entity)];
                    case 1:
                        band = _a.sent();
                        expect(band.contactEmail).toEqual('Not an email');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must not validate if the validateModels: false', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, band;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: false });
                        bandRepository = new BandRepository('bands');
                        entity = new BandCollection_1.Band();
                        entity.contactEmail = 'Not an email';
                        return [4 /*yield*/, bandRepository.create(entity)];
                    case 1:
                        band = _a.sent();
                        expect(band.contactEmail).toEqual('Not an email');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail validation if an invalid class is given', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        entity = new BandCollection_1.Band();
                        entity.contactEmail = 'Not an email';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, bandRepository.create(entity)];
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
        it('must fail validation if an invalid object is given', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        entity = {
                            contactEmail: 'Not an email',
                            id: '1234',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, bandRepository.create(entity)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        expect(error_2[0].constraints.isEmail).toEqual('Invalid email!');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it('must create items when id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, band;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.id = 'perfect-circle';
                        entity.name = 'A Perfect Circle';
                        entity.formationYear = 1999;
                        entity.genres = ['alternative-rock', 'alternative-metal', 'hard-rock'];
                        return [4 /*yield*/, bandRepository.create(entity)];
                    case 1:
                        band = _a.sent();
                        expect(band.id).toEqual(entity.id);
                        expect(band.name).toEqual(entity.name);
                        expect(band.formationYear).toEqual(entity.formationYear);
                        expect(band.genres).toEqual(entity.genres);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must create items and assign a custom id if no id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, band;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.name = 'The Pinapple Thief';
                        entity.formationYear = 1999;
                        entity.genres = ['progressive-rock'];
                        return [4 /*yield*/, bandRepository.create(entity)];
                    case 1:
                        band = _a.sent();
                        expect(typeof band.id).toEqual('string');
                        expect(band.id).not.toBeUndefined();
                        expect(band.name).toEqual(entity.name);
                        expect(band.formationYear).toEqual(entity.formationYear);
                        expect(band.genres).toEqual(entity.genres);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must save autogenerated id field in document if no id is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var entity, band, foundBand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity = new BandCollection_1.Band();
                        entity.name = 'Deftones';
                        entity.formationYear = 1988;
                        entity.genres = ['alternative-metal'];
                        return [4 /*yield*/, bandRepository.create(entity)];
                    case 1:
                        band = _a.sent();
                        return [4 /*yield*/, bandRepository.findById(band.id)];
                    case 2:
                        foundBand = _a.sent();
                        expect(band.id).toEqual(foundBand.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('update', function () {
        it('must update and return updated item', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, albums, updatedBand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        band = _a.sent();
                        albums = band.albums;
                        band.name = 'Steven Wilson';
                        return [4 /*yield*/, bandRepository.update(band)];
                    case 2:
                        updatedBand = _a.sent();
                        expect(band.name).toEqual(updatedBand.name);
                        // should not mutate other fields or relations on updated item
                        expect(band.albums).toEqual(albums);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must not validate if the validate config property is false', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, updatedBand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: false });
                        bandRepository = new BandRepository('bands');
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        band = _a.sent();
                        band.contactEmail = 'Not an email';
                        return [4 /*yield*/, bandRepository.update(band)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 3:
                        updatedBand = _a.sent();
                        expect(updatedBand.contactEmail).toEqual('Not an email');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must fail validation if an invalid class is given', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        band = _a.sent();
                        band.contactEmail = 'Not an email';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, bandRepository.update(band)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        expect(error_3[0].constraints.isEmail).toEqual('Invalid email!');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('must fail validation if an invalid object is given', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        band = _a.sent();
                        band.contactEmail = 'Not an Email';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, bandRepository.update(band)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        expect(error_4[0].constraints.isEmail).toEqual('Invalid email!');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it.todo('must only update changed fields');
        it.todo('must throw if item is not found');
    });
    describe('delete', function () {
        it('must delete item', function () { return __awaiter(void 0, void 0, void 0, function () {
            var roy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.delete('porcupine-tree')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 2:
                        roy = _a.sent();
                        expect(roy).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        // mock-cloud-firestore won't throw here
        it.skip('must throw if item is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.delete('lol')];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); }).toThrow();
                return [2 /*return*/];
            });
        }); });
    });
    describe('.where*', function () {
        it('whereEqualTo must accept function as first parameter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereEqualTo(function (b) { return b.name; }, 'Porcupine Tree').find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(1);
                        expect(list[0].name).toEqual('Porcupine Tree');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must return T[]', function () { return __awaiter(void 0, void 0, void 0, function () {
            var progressiveRockBands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository
                            .whereArrayContains('genres', 'progressive-rock')
                            .find()];
                    case 1:
                        progressiveRockBands = _a.sent();
                        progressiveRockBands.forEach(function (b) {
                            expect(b.getPopularGenre()).toEqual(b.genres[0]);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("must return same list if where filter doesn't apply", function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereGreaterOrEqualThan('formationYear', 1983).find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereEqualTo', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereEqualTo('name', 'Porcupine Tree').find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(1);
                        expect(list[0].name).toEqual('Porcupine Tree');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereGreaterThan', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereGreaterThan('formationYear', 1983).find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereGreaterOrEqualThan', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereGreaterOrEqualThan('formationYear', 1983).find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereLessThan', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereLessThan('formationYear', 1983).find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereLessOrEqualThan', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereLessOrEqualThan('formationYear', 1983).find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereArrayContains', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereArrayContains('genres', 'progressive-rock').find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereArrayContainsAny', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository
                            .whereArrayContainsAny('genres', ['psychedelic-rock', 'funk-rock'])
                            .find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('must filter with whereIn', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereIn('formationYear', [1965, 1983, 1987]).find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw with whereArrayContainsAny and more than 10 items in val array', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, bandRepository
                                    .whereArrayContainsAny('genres', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
                                    .find()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }).rejects.toThrow(Error);
                return [2 /*return*/];
            });
        }); });
        it('should throw with whereIn and more than 10 items in val array', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, bandRepository.whereIn('formationYear', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).find()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }).rejects.toThrow(Error);
                return [2 /*return*/];
            });
        }); });
        it('must filter with two or more operators', function () { return __awaiter(void 0, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository
                            .whereLessOrEqualThan('formationYear', 1983)
                            .whereArrayContains('genres', 'funk-rock')
                            .find()];
                    case 1:
                        list = _a.sent();
                        expect(list.length).toEqual(1);
                        expect(list[0].id).toEqual('red-hot-chili-peppers');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must support document references in where methods', function () { return __awaiter(void 0, void 0, void 0, function () {
            var docRef, band, byReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docRef = firestore.collection('bands').doc('steven-wilson');
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        band = _a.sent();
                        band.relatedBand = docRef;
                        return [4 /*yield*/, bandRepository.update(band)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, bandRepository.whereEqualTo(function (b) { return b.relatedBand; }, docRef).find()];
                    case 3:
                        byReference = _a.sent();
                        expect(byReference.length).toEqual(1);
                        expect(byReference[0].name).toEqual('Porcupine Tree');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findOne', function () {
        it('must return T', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository
                            .whereLessOrEqualThan('formationYear', 1983)
                            .whereArrayContains('genres', 'funk-rock')
                            .findOne()];
                    case 1:
                        result = _a.sent();
                        expect(result).toBeInstanceOf(BandCollection_1.Band);
                        expect(result.id).toEqual('red-hot-chili-peppers');
                        return [2 /*return*/];
                }
            });
        }); });
        it('must return null if not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.whereLessThan('formationYear', 0).findOne()];
                    case 1:
                        result = _a.sent();
                        expect(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work within transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.runTransaction(function (tran) { return __awaiter(void 0, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tran.whereLessThan('formationYear', 0).findOne()];
                                    case 1:
                                        result = _a.sent();
                                        expect(result).toBeNull();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('miscellaneous', function () {
        it('should correctly parse dates', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        expect(pt.lastShow).toBeInstanceOf(Date);
                        expect(pt.lastShow.toISOString()).toEqual('2010-10-14T00:00:00.000Z');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should correctly parse geopoints', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        expect(pt.lastShowCoordinates).toBeInstanceOf(fixture_1.Coordinates);
                        expect(pt.lastShowCoordinates.latitude).toEqual(51.5009088);
                        expect(pt.lastShowCoordinates.longitude).toEqual(-0.1795547);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should correctly parse references', function () { return __awaiter(void 0, void 0, void 0, function () {
            var docRef, band, foundBand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        docRef = firestore.collection('bands').doc('opeth');
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        band = _a.sent();
                        band.relatedBand = docRef;
                        return [4 /*yield*/, bandRepository.update(band)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 3:
                        foundBand = _a.sent();
                        expect(foundBand.relatedBand).toBeInstanceOf(fixture_1.FirestoreDocumentReference);
                        expect(foundBand.relatedBand.id).toEqual('opeth');
                        // firestore mock doesn't set this property, it should be bands/opeth
                        expect(foundBand.relatedBand.path).toEqual(undefined);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('transactions', function () {
        it('should be able to open transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.runTransaction(function (tran) { return __awaiter(void 0, void 0, void 0, function () {
                            var band;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tran.findById('porcupine-tree')];
                                    case 1:
                                        band = _a.sent();
                                        band.name = 'Árbol de Puercoespín';
                                        return [4 /*yield*/, tran.update(band)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 2:
                        updated = _a.sent();
                        expect(updated.name).toEqual('Árbol de Puercoespín');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return TransactionRepository', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.runTransaction(function (tran) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                expect(tran.constructor.name).toEqual('TransactionRepository');
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('batch', function () {
        it('should be able to create batches from repository', function () { return __awaiter(void 0, void 0, void 0, function () {
            var batch, entity1, entity2, entity3, batchedBands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = bandRepository.createBatch();
                        entity1 = new BandCollection_1.Band();
                        entity1.id = 'entity1';
                        entity1.name = 'Entity1';
                        entity1.formationYear = 2099;
                        entity2 = new BandCollection_1.Band();
                        entity2.id = 'entity2';
                        entity2.name = 'Entity2';
                        entity2.formationYear = 2099;
                        entity3 = new BandCollection_1.Band();
                        entity3.id = 'entity3';
                        entity3.name = 'Entity3';
                        entity3.formationYear = 2099;
                        batch.create(entity1);
                        batch.create(entity2);
                        batch.create(entity3);
                        return [4 /*yield*/, batch.commit()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, bandRepository.whereEqualTo('formationYear', 2099).find()];
                    case 2:
                        batchedBands = _a.sent();
                        expect(batchedBands.map(function (b) { return b.name; })).toEqual(['Entity1', 'Entity2', 'Entity3']);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('must handle subcollections', function () {
        it('should initialize subcollections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        expect(pt.name).toEqual('Porcupine Tree');
                        expect(pt.albums).toBeInstanceOf(BaseFirestoreRepository_1.BaseFirestoreRepository);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should initialize nested subcollections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt, album;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('red-hot-chili-peppers')];
                    case 1:
                        pt = _a.sent();
                        return [4 /*yield*/, pt.albums.findById('stadium-arcadium')];
                    case 2:
                        album = _a.sent();
                        expect(album.images).toBeInstanceOf(BaseFirestoreRepository_1.BaseFirestoreRepository);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to execute operations in the subcollection', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, bestAlbum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('red-hot-chili-peppers')];
                    case 1:
                        band = _a.sent();
                        return [4 /*yield*/, band.albums.findById('stadium-arcadium')];
                    case 2:
                        bestAlbum = _a.sent();
                        expect(bestAlbum.id).toEqual('stadium-arcadium');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to create subcollections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, firstAlbum, secondAlbum, thirdAlbum, albums;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        band = new BandCollection_1.Band();
                        band.id = '30-seconds-to-mars';
                        band.name = '30 Seconds To Mars';
                        band.formationYear = 1998;
                        band.genres = ['alternative-rock'];
                        return [4 /*yield*/, bandRepository.create(band)];
                    case 1:
                        _a.sent();
                        firstAlbum = new fixture_1.Album();
                        firstAlbum.id = '30-seconds-to-mars';
                        firstAlbum.name = '30 Seconds to Mars';
                        firstAlbum.releaseDate = new Date('2002-07-22');
                        secondAlbum = new fixture_1.Album();
                        secondAlbum.id = 'a-beautiful-lie';
                        secondAlbum.name = 'A Beautiful Lie';
                        secondAlbum.releaseDate = new Date('2005-07-30');
                        thirdAlbum = new fixture_1.Album();
                        thirdAlbum.id = 'this-is-war';
                        thirdAlbum.name = 'This Is War';
                        thirdAlbum.releaseDate = new Date('2009-12-08');
                        return [4 /*yield*/, band.albums.create(firstAlbum)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, band.albums.create(secondAlbum)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, band.albums.create(thirdAlbum)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, band.albums.find()];
                    case 5:
                        albums = _a.sent();
                        expect(albums.length).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should initialize nested subcollections on create', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, firstAlbum, album;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        band = new BandCollection_1.Band();
                        band.id = '30-seconds-to-mars';
                        band.name = '30 Seconds To Mars';
                        band.formationYear = 1998;
                        band.genres = ['alternative-rock'];
                        return [4 /*yield*/, bandRepository.create(band)];
                    case 1:
                        _a.sent();
                        firstAlbum = new fixture_1.Album();
                        firstAlbum.id = '30-seconds-to-mars';
                        firstAlbum.name = '30 Seconds to Mars';
                        firstAlbum.releaseDate = new Date('2002-07-22');
                        return [4 /*yield*/, band.albums.create(firstAlbum)];
                    case 2:
                        album = _a.sent();
                        expect(album.images).toBeInstanceOf(BaseFirestoreRepository_1.BaseFirestoreRepository);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to validate subcollections on create', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band, firstAlbum, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        band = new BandCollection_1.Band();
                        band.id = '30-seconds-to-mars';
                        band.name = '30 Seconds To Mars';
                        band.formationYear = 1998;
                        band.genres = ['alternative-rock'];
                        return [4 /*yield*/, bandRepository.create(band)];
                    case 1:
                        _a.sent();
                        firstAlbum = new fixture_1.Album();
                        firstAlbum.id = 'invalid-album-name';
                        firstAlbum.name = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
                        firstAlbum.releaseDate = new Date('2002-07-22');
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, band.albums.create(firstAlbum)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        expect(error_5[0].constraints.length).toEqual('Name is too long');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('should be able to update subcollections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt, album, updatedAlbum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        return [4 /*yield*/, pt.albums.findById('fear-blank-planet')];
                    case 2:
                        album = _a.sent();
                        album.comment = 'Anesthethize is top 3 IMHO';
                        return [4 /*yield*/, pt.albums.update(album)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, pt.albums.findById('fear-blank-planet')];
                    case 4:
                        updatedAlbum = _a.sent();
                        expect(updatedAlbum.comment).toEqual('Anesthethize is top 3 IMHO');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to validate subcollections on update', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt, album, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MetadataStorage_1.initialize(firestore, { validateModels: true });
                        return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        return [4 /*yield*/, pt.albums.findById('fear-blank-planet')];
                    case 2:
                        album = _a.sent();
                        album.name = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, pt.albums.update(album)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _a.sent();
                        expect(error_6[0].constraints.length).toEqual('Name is too long');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        it('should be able to update collections with subcollections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt, updatedPt, foundUpdatedPt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        pt.name = 'Porcupine Tree IS THE BEST';
                        return [4 /*yield*/, bandRepository.update(pt)];
                    case 2:
                        updatedPt = _a.sent();
                        return [4 /*yield*/, bandRepository.update(pt)];
                    case 3:
                        foundUpdatedPt = _a.sent();
                        expect(updatedPt.name).toEqual(pt.name);
                        expect(foundUpdatedPt.name).toEqual(pt.name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to delete subcollections', function () { return __awaiter(void 0, void 0, void 0, function () {
            var pt, updatedBandAlbums;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                    case 1:
                        pt = _a.sent();
                        return [4 /*yield*/, pt.albums.delete('fear-blank-planet')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, pt.albums.find()];
                    case 3:
                        updatedBandAlbums = _a.sent();
                        expect(updatedBandAlbums.length).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('miscellaneous', function () {
            it('should correctly parse dates', function () { return __awaiter(void 0, void 0, void 0, function () {
                var pt, releaseDate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bandRepository.findById('porcupine-tree')];
                        case 1:
                            pt = _a.sent();
                            return [4 /*yield*/, pt.albums.findById('deadwing')];
                        case 2:
                            releaseDate = (_a.sent()).releaseDate;
                            expect(releaseDate).toBeInstanceOf(Date);
                            expect(releaseDate.toISOString()).toEqual('2005-03-25T00:00:00.000Z');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('fetching documents created w/o id inside object', function () {
        var docId = null;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var bandWithoutId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bandWithoutId = new BandCollection_1.Band();
                        return [4 /*yield*/, firestore.collection('bands').add(bandWithoutId)];
                    case 1:
                        docId = (_a.sent()).id;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get by id - entity should contain id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var band;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.findById(docId)];
                    case 1:
                        band = _a.sent();
                        expect(band).toHaveProperty('id');
                        expect(band.id).toEqual(docId);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Get list - all entities should contain id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var bands, _i, bands_1, b, possibleDocWithoutId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bandRepository.find()];
                    case 1:
                        bands = _a.sent();
                        for (_i = 0, bands_1 = bands; _i < bands_1.length; _i++) {
                            b = bands_1[_i];
                            expect(b.id).not.toBeUndefined();
                        }
                        possibleDocWithoutId = bands.find(function (band) { return band.id === docId; });
                        expect(possibleDocWithoutId).not.toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=BaseFirestoreRepository.spec.js.map