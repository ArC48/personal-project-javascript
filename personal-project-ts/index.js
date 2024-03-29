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
exports.__esModule = true;
var validations_1 = require("./shared/validations/validations");
var messages_enum_1 = require("./shared/enums/messages.enum");
var Transaction = /** @class */ (function () {
    function Transaction(store, logs, rollbackBool) {
        if (store === void 0) { store = {}; }
        if (logs === void 0) { logs = []; }
        if (rollbackBool === void 0) { rollbackBool = null; }
        this.store = store;
        this.logs = logs;
        this.rollbackBool = rollbackBool;
    }
    Transaction.prototype.dispatch = function (scenario) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, scenario_1, step, callingCall, myObject, err_1, errorObj, rollback, logRollbacked, mes, error_1, logRollbacked, lastObj, i, step, rollback, logObj, error_2, rollbackLog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scenario.forEach(function (step) {
                            (0, validations_1.validate)(step);
                        });
                        scenario.sort(function (a, b) { return a.index - b.index; }); //sorting indexes of scenario objects
                        this.store = {};
                        this.logs = [];
                        _i = 0, scenario_1 = scenario;
                        _a.label = 1;
                    case 1:
                        if (!(_i < scenario_1.length)) return [3 /*break*/, 11];
                        step = scenario_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 10]);
                        return [4 /*yield*/, step.call()];
                    case 3:
                        callingCall = _a.sent();
                        myObject = {
                            index: step.index,
                            meta: step.meta,
                            storeBefore: step,
                            storeAfter: callingCall,
                            error: null
                        };
                        this.logs.push(myObject);
                        this.store = {};
                        return [3 /*break*/, 10];
                    case 4:
                        err_1 = _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        errorObj = {
                            index: step.index,
                            meta: step.meta,
                            error: {
                                name: err_1.name,
                                message: err_1.message,
                                stack: err_1.stack
                            }
                        };
                        //in catch (not scope), available everywhere:
                        this.store = {};
                        this.logs.push(errorObj);
                        if (!step.restore) return [3 /*break*/, 7];
                        return [4 /*yield*/, step.restore()];
                    case 6:
                        rollback = _a.sent();
                        logRollbacked = {
                            index: step.index,
                            meta: step.meta,
                            storeBefore: step,
                            storeAfter: rollback,
                            error: null
                        };
                        this.store = null;
                        this.logs.push(logRollbacked);
                        mes = messages_enum_1.messages.restoreComplete;
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        logRollbacked = {
                            index: step.index,
                            meta: step.meta,
                            error: {
                                name: error_1.name,
                                message: error_1.message,
                                stack: error_1.stack
                            }
                        };
                        this.store = {};
                        this.logs.push(logRollbacked);
                        this.rollbackBool = true;
                        return [3 /*break*/, 11];
                    case 9: return [3 /*break*/, 10];
                    case 10:
                        _i++;
                        return [3 /*break*/, 1];
                    case 11:
                        if (!this.rollbackBool) return [3 /*break*/, 17];
                        lastObj = this.logs[this.logs.length - 1].index;
                        i = lastObj - 2;
                        _a.label = 12;
                    case 12:
                        if (!(i >= 0)) return [3 /*break*/, 17];
                        step = scenario[i];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        if (!step.restore) {
                            throw new Error("step has no restore function!"); // throwing error in obj has no restore function
                        }
                        return [4 /*yield*/, step.restore()];
                    case 14:
                        rollback = _a.sent();
                        logObj = {
                            index: step.index,
                            meta: step.meta,
                            storeBefore: step,
                            storeAfter: rollback,
                            error: null
                        };
                        this.store = {}; ////
                        this.logs.push(logObj);
                        return [3 /*break*/, 16];
                    case 15:
                        error_2 = _a.sent();
                        rollbackLog = {
                            index: step.index,
                            meta: step.meta,
                            error: {
                                name: error_2.name,
                                message: error_2.message,
                                stack: error_2.stack
                            }
                        };
                        this.store = {};
                        this.logs.push(rollbackLog);
                        return [3 /*break*/, 16];
                    case 16:
                        i--;
                        return [3 /*break*/, 12];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    return Transaction;
}());
var scenario = [
    {
        index: 2,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        call: function (store) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            throw new Error('call not working :()');
        }); }); },
        // callback for rollback
        restore: function (store) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, 'This Step Restored Successfully!'];
        }); }); }
    },
    {
        index: 3,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        // callback for main execution
        call: function (store) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            throw new Error('errr');
        }); }); },
        // callback for rollback
        restore: function (store) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            throw new Error('errr');
        }); }); }
    },
    {
        index: 1,
        meta: {
            title: 'Delete customer',
            description: 'This action is responsible for deleting customer'
        },
        // callback for main execution
        call: function (store) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); },
        // callback for rollback
        restore: function (store) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, 'Task Restored Successfully!'];
        }); }); }
    }
];
var transaction = new Transaction();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var store, logs, err_2, e;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, transaction.dispatch(scenario)];
            case 1:
                _a.sent();
                store = transaction.store;
                logs = transaction.logs;
                console.log(logs); // []
                console.log(store); // {} | null
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                e = {
                    name: err_2.name,
                    message: err_2.message,
                    stack: err_2.stack
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
