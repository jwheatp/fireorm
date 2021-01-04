"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
describe('Utils', function () {
    describe('extractAllGetter', function () {
        describe('Class', function () {
            it('should return only getters not data property', function () {
                var ClassTest = /** @class */ (function () {
                    function ClassTest() {
                        this.a = 'a';
                    }
                    Object.defineProperty(ClassTest.prototype, "b", {
                        get: function () {
                            return 'b';
                        },
                        enumerable: false,
                        configurable: true
                    });
                    return ClassTest;
                }());
                var b = new ClassTest();
                var extracted = utils_1.extractAllGetter(b);
                expect(extracted).toEqual({ b: 'b' });
            });
            it('should return only getters not method', function () {
                var ClassTest = /** @class */ (function () {
                    function ClassTest() {
                    }
                    Object.defineProperty(ClassTest.prototype, "b", {
                        get: function () {
                            return 'b';
                        },
                        enumerable: false,
                        configurable: true
                    });
                    ClassTest.prototype.a = function () {
                        return 'a method';
                    };
                    return ClassTest;
                }());
                var b = new ClassTest();
                var extracted = utils_1.extractAllGetter(b);
                expect(extracted).toEqual({ b: 'b' });
            });
        });
        it('should return only getters which return undefined', function () {
            var ClassTest = /** @class */ (function () {
                function ClassTest() {
                    this.a = 'a';
                }
                Object.defineProperty(ClassTest.prototype, "b", {
                    get: function () {
                        return 'b';
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(ClassTest.prototype, "c", {
                    get: function () {
                        return undefined;
                    },
                    enumerable: false,
                    configurable: true
                });
                return ClassTest;
            }());
            var b = new ClassTest();
            var extracted = utils_1.extractAllGetter(b);
            expect(extracted).toEqual({ b: 'b' });
        });
    });
});
//# sourceMappingURL=utils.spec.js.map