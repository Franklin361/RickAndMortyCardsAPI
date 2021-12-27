"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const config_1 = require("../database/config");
const routes_1 = require("../routes");
const Socket_1 = require("./Socket");
class Server {
    constructor() {
        this.apiPath = {
            auth: '/api/auth',
            card: '/api/card'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.configRoutes();
    }
    configRoutes() {
        this.app.use(this.apiPath.auth, routes_1.authRouter);
        this.app.use(this.apiPath.card, routes_1.cardRouter);
    }
    configSockets() {
        new Socket_1.Socket(this.io);
    }
    connectionDatabase() {
        (0, config_1.configConnectionDatabase)();
    }
    execute() {
        this.connectionDatabase();
        this.middlewares();
        this.configSockets();
        this.server.listen(this.port, () => {
            console.log(`--- Server is work in the port ${this.port} ---`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map