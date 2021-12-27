"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoriteCardsOfUser = exports.getRankingCards = exports.deleteCard = exports.createCard = exports.renewToken = exports.signUp = exports.login = void 0;
const authController_1 = require("./authController");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return authController_1.login; } });
Object.defineProperty(exports, "signUp", { enumerable: true, get: function () { return authController_1.signUp; } });
Object.defineProperty(exports, "renewToken", { enumerable: true, get: function () { return authController_1.renewToken; } });
const cardController_1 = require("./cardController");
Object.defineProperty(exports, "createCard", { enumerable: true, get: function () { return cardController_1.createCard; } });
Object.defineProperty(exports, "getRankingCards", { enumerable: true, get: function () { return cardController_1.getRankingCards; } });
Object.defineProperty(exports, "getFavoriteCardsOfUser", { enumerable: true, get: function () { return cardController_1.getFavoriteCardsOfUser; } });
Object.defineProperty(exports, "deleteCard", { enumerable: true, get: function () { return cardController_1.deleteCard; } });
//# sourceMappingURL=index.js.map