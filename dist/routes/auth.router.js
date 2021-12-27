"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fieldsValidation_1 = require("../middlewares/fieldsValidation");
const controllers_1 = require("../controllers");
const validateJWT_1 = require("../middlewares/validateJWT");
exports.router = (0, express_1.Router)();
exports.router.post('/login', [
    (0, express_validator_1.check)('username', 'Username is required').notEmpty(),
    (0, express_validator_1.check)('password', 'Password is required').notEmpty(),
    fieldsValidation_1.fieldsValidation
], controllers_1.login);
exports.router.post('/signup', [
    (0, express_validator_1.check)('username', 'Username is required').notEmpty(),
    (0, express_validator_1.check)('password', 'Password is required').notEmpty(),
    (0, express_validator_1.check)('email', 'Email no is valid').notEmpty().isEmail(),
    fieldsValidation_1.fieldsValidation
], controllers_1.signUp);
exports.router.get('/renew', [
    validateJWT_1.validateJWT
], controllers_1.renewToken);
//# sourceMappingURL=auth.router.js.map