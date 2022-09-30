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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDailyGoal = exports.checkDailyGoal = exports.createEntry = exports.updateEntry = exports.fetchEntry = exports.loadUser = void 0;
const aa_sqlite_1 = __importDefault(require("aa-sqlite"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield aa_sqlite_1.default.open('./water.db');
        }
        catch (err) {
            console.log(err);
        }
    });
}
function loadUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let error;
        yield connectDB();
        try {
            const usr = yield aa_sqlite_1.default.all('SELECT * FROM user');
            if (usr.length !== 1) {
                throw new Error();
            }
            return usr[0];
        }
        catch (err) {
            console.log(err);
            error = null;
        }
        finally {
            yield aa_sqlite_1.default.close();
        }
        return error;
    });
}
exports.loadUser = loadUser;
function fetchEntry(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let error;
        const today = new Date().toISOString().slice(0, 10);
        yield connectDB();
        try {
            const entry = yield aa_sqlite_1.default.all(`SELECT * FROM water WHERE userId=? AND date=?`, [userId, today]);
            return entry[0];
        }
        catch (err) {
            console.log(err);
            error = null;
        }
        finally {
            yield aa_sqlite_1.default.close();
        }
        return error;
    });
}
exports.fetchEntry = fetchEntry;
function updateEntry(entry_id, new_entry) {
    return __awaiter(this, void 0, void 0, function* () {
        let error;
        const qry = `UPDATE water SET amount = "${new_entry}" WHERE id = "${entry_id}"`;
        yield connectDB();
        try {
            yield aa_sqlite_1.default.run(qry, [], function (err) {
                if (err)
                    console.log(err.message);
            });
            return console.log('Updated log successfully');
        }
        catch (err) {
            console.log(err);
            error = null;
        }
        finally {
            yield aa_sqlite_1.default.close();
        }
        return error;
    });
}
exports.updateEntry = updateEntry;
function createEntry(new_entry, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let error;
        const today = new Date().toISOString().slice(0, 10);
        const qry = `INSERT INTO water (id, userId, amount, date) VALUES(${null}, "${user_id}", "${new_entry}", "${today}")`;
        yield connectDB();
        try {
            yield aa_sqlite_1.default.run(qry, [], function (err) {
                if (err)
                    console.log(err.message);
            });
            return console.log('Your log was updated successfully');
        }
        catch (err) {
            console.log(err);
            error = null;
        }
        finally {
            yield aa_sqlite_1.default.close();
        }
        return error;
    });
}
exports.createEntry = createEntry;
function checkDailyGoal() {
    return __awaiter(this, void 0, void 0, function* () {
        const USER = yield loadUser();
        if (USER) {
            console.log(USER.daily_goal);
        }
    });
}
exports.checkDailyGoal = checkDailyGoal;
function updateDailyGoal(new_entry, user) {
    return __awaiter(this, void 0, void 0, function* () {
        let error;
        const qry = `UPDATE user SET daily_goal = "${new_entry}" WHERE id = "${user.id}"`;
        yield connectDB();
        try {
            yield aa_sqlite_1.default.run(qry, [], function (err) {
                if (err)
                    console.log(err.message);
            });
            return console.log('Daily goal updated successfully!');
        }
        catch (err) {
            console.log(err);
            error = null;
        }
        finally {
            yield aa_sqlite_1.default.close();
        }
        return error;
    });
}
exports.updateDailyGoal = updateDailyGoal;
