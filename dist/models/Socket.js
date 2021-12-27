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
exports.Socket = void 0;
const jsonWebToken_1 = require("../helpers/jsonWebToken");
const cardController_1 = require("../controllers/cardController");
class Socket {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        this.io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            const token = socket.handshake.query['x-token'];
            const [valido, uid] = (0, jsonWebToken_1.findOutJWT)(token);
            if (!valido) {
                return socket.disconnect();
            }
            const id_user = uid;
            console.log('socket conection active!:3');
            socket.join(id_user);
            this.io.emit('ranking-cards', yield (0, cardController_1.getRankingCards)());
            this.io.to(id_user).emit('favorites', yield (0, cardController_1.getFavoriteCardsOfUser)(id_user));
            socket.on('action_card', ({ url, image, name, action }, callback) => __awaiter(this, void 0, void 0, function* () {
                if (action === 'like')
                    callback(yield (0, cardController_1.createCard)({ url, uid: id_user, image, name }));
                else
                    callback(yield (0, cardController_1.deleteCard)({ url, uid: id_user, image, name }));
                this.io.emit('ranking-cards', yield (0, cardController_1.getRankingCards)());
            }));
        }));
    }
}
exports.Socket = Socket;
//# sourceMappingURL=Socket.js.map