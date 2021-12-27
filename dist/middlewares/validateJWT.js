"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    try {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
                message: 'There is no token in the request'
            });
        }
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Token no valid'
        });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map