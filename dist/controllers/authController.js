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
exports.renewToken = exports.signUp = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jsonWebToken_1 = require("../helpers/jsonWebToken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User_1.default.findOne({ username });
    if (!user) {
        return res.status(400).json({
            message: 'The user was not found in the database'
        });
    }
    const isCorrectPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!isCorrectPassword) {
        return res.status(400).json({
            message: 'The credentials are wrong'
        });
    }
    const token = yield (0, jsonWebToken_1.generateJWT)(user.id);
    return res.json({
        user,
        token,
        message: 'Authentication successfully verified'
    });
});
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const existEmailUser = yield User_1.default.findOne({ email });
    const existNicknameUser = yield User_1.default.findOne({ username });
    if (existEmailUser) {
        return res.status(400).json({
            message: 'Error  -- e-mail already exists --'
        });
    }
    if (existNicknameUser) {
        return res.status(400).json({
            message: 'Error  -- username already exists --'
        });
    }
    const newUser = new User_1.default({ username, password, email });
    const salt = bcryptjs_1.default.genSaltSync();
    newUser.password = bcryptjs_1.default.hashSync(password, salt);
    const token = yield (0, jsonWebToken_1.generateJWT)(newUser.id);
    yield newUser.save();
    return res.json({
        user: newUser,
        message: 'User created successfully',
        token
    });
});
exports.signUp = signUp;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    const token = yield (0, jsonWebToken_1.generateJWT)(uid);
    const user = yield User_1.default.findById(uid);
    res.json({
        user,
        token
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=authController.js.map