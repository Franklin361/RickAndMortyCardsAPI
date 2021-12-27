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
Object.defineProperty(exports, "__esModule", { value: true });
exports.configConnectionDatabase = void 0;
const mongoose_1 = require("mongoose");
const configConnectionDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = process.env.MONGO_CONECCTION || 'mongodb://localhost:27017/links';
    try {
        yield (0, mongoose_1.connect)(uri);
        console.log('Database Online:)');
    }
    catch (error) {
        console.log(error);
        throw new Error('There was an error in the database connection :c');
    }
});
exports.configConnectionDatabase = configConnectionDatabase;
//# sourceMappingURL=config.js.map