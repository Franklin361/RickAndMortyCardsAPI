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
exports.getRankingCards = exports.getFavoriteCardsOfUser = exports.deleteCard = exports.createCard = void 0;
const Card_1 = __importDefault(require("../models/Card"));
const User_1 = __importDefault(require("../models/User"));
const createCard = ({ url, uid, image, name }) => __awaiter(void 0, void 0, void 0, function* () {
    const existCard = yield Card_1.default.findOne({ url });
    const user = yield User_1.default.findById(uid);
    if (!user)
        return { message: 'User no exist', type: 'error' };
    if (user.favorites.length === 5)
        return { message: 'Version Free solo acepta 5 tarjetas favoritas', type: 'warning' };
    if (!existCard) {
        const newCard = new Card_1.default({ url, image, name });
        yield newCard.save();
    }
    else {
        existCard.likes += 1;
        yield existCard.save();
    }
    const existCardOfUser = user.favorites.filter(fav => fav === url);
    if (existCardOfUser.length === 0) {
        user.favorites = [...user.favorites, url];
        yield user.save();
    }
    return {
        message: 'Tarjeta agregada a Favoritos',
        favorites: user.favorites,
        type: 'success'
    };
});
exports.createCard = createCard;
const deleteCard = ({ url, uid, image, name }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(uid);
    const card = yield Card_1.default.findOne({ url });
    if (user && card) {
        user.favorites = user.favorites.filter(fav => fav !== url);
        card.likes -= 1;
        yield user.save();
        yield card.save();
        return {
            message: 'Tarjeta eliminada de Favoritos',
            type: 'success',
            favorites: user.favorites
        };
    }
});
exports.deleteCard = deleteCard;
const getFavoriteCardsOfUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(uid);
    if (!user) {
        return {
            message: 'User no exist',
            type: 'error'
        };
    }
    return user.favorites;
});
exports.getFavoriteCardsOfUser = getFavoriteCardsOfUser;
const getRankingCards = () => __awaiter(void 0, void 0, void 0, function* () {
    const ranking = yield Card_1.default.find({}).sort('-likes').limit(5);
    return ranking;
});
exports.getRankingCards = getRankingCards;
//# sourceMappingURL=cardController.js.map