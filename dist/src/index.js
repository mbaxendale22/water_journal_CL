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
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const database_1 = require("./database");
const routeHandlers_1 = require("./routeHandlers");
const types_1 = require("./types");
const myPrompt = (0, prompt_sync_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, database_1.loadUser)();
        if (!user)
            return;
        let exit = false;
        while (!exit) {
            const route = (0, routeHandlers_1.mainRouter)();
            if (route === types_1.ROUTES.route1) {
                yield (0, routeHandlers_1.addWater)(user);
            }
            else if (route === types_1.ROUTES.route3) {
                yield (0, routeHandlers_1.updateGoal)(user);
            }
            else {
                yield (0, routeHandlers_1.checkProgress)(user);
            }
            console.log('Would you like to do anything else today? (Y/n)');
            const input = myPrompt('your input: ').toLowerCase();
            if (input === 'n') {
                exit = true;
            }
        }
    });
}
main();
