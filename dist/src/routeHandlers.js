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
exports.updateGoal = exports.checkProgress = exports.addWater = exports.mainRouter = void 0;
const database_1 = require("./database");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const types_1 = require("./types");
const myPrompt = (0, prompt_sync_1.default)();
function mainRouter() {
    let valid = false;
    const validInputs = [types_1.ROUTES.route1, types_1.ROUTES.route2, types_1.ROUTES.route3];
    while (!valid) {
        console.log('What would you like to do today?\n1. Add an entry for today\n2. Check todays progess\n3. Update my daily goal');
        const input = myPrompt('your input: ');
        if (validInputs.includes(input)) {
            valid = true;
            return input;
        }
        console.log('invalid input please try again');
    }
    return null;
}
exports.mainRouter = mainRouter;
function addWater(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('how much water would you like to add (ml)?');
        const prev_water = myPrompt('your input: ');
        const water = Number(prev_water);
        //check to see if entry exists for today
        const currentEntry = yield (0, database_1.fetchEntry)(user.id);
        //// if there's an entry, then update it, if not create a new entry for today
        if (!currentEntry) {
            yield (0, database_1.createEntry)(water, user.id);
        }
        else {
            const new_entry = water + (currentEntry === null || currentEntry === void 0 ? void 0 : currentEntry.amount);
            yield (0, database_1.updateEntry)(currentEntry.id, new_entry);
        }
    });
}
exports.addWater = addWater;
function checkProgress(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let progress;
        let msg;
        const currentEntry = yield (0, database_1.fetchEntry)(user.id);
        if (!currentEntry) {
            progress = 0;
            msg = 'You must be thirsty! Grab some water';
        }
        else {
            progress = currentEntry.amount;
            if (currentEntry.amount < user.daily_goal) {
                const perc = Math.floor((currentEntry.amount / user.daily_goal) * 100);
                msg = `You are ${perc}% of the way there!`;
            }
            else {
                msg = 'You have hit your target for today, nice work!';
            }
        }
        console.log(`your progess today is: ${progress}ml\n\nyour daily goal is ${user.daily_goal}ml\n\n${msg}`);
    });
}
exports.checkProgress = checkProgress;
function updateGoal(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('what would you like your daily goal to be?');
        const goal = myPrompt('your input: ');
        const new_goal = Number(goal);
        yield (0, database_1.updateDailyGoal)(new_goal, user);
    });
}
exports.updateGoal = updateGoal;
