"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const fieldsValidation_1 = require("../middlewares/fieldsValidation");
const cardController_1 = require("../controllers/cardController");
const validateJWT_1 = require("../middlewares/validateJWT");
exports.router = (0, express_1.Router)();
exports.router.post('/', [
    (0, express_validator_1.check)('url', 'URL is required').notEmpty().isURL(),
    fieldsValidation_1.fieldsValidation,
    validateJWT_1.validateJWT
], cardController_1.createCard);
exports.router.delete('/', [
    (0, express_validator_1.check)('url', 'URL is required').notEmpty().isURL(),
    fieldsValidation_1.fieldsValidation,
    validateJWT_1.validateJWT
], cardController_1.deleteCard);
//# sourceMappingURL=card.router.js.map