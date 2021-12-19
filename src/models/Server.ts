
import express, { Application } from "express";
import cors from 'cors';
import http from 'http';
import { configConnectionDatabase } from '../database/config';

import { authRouter } from "../routes";


export class Server {
      
    private app: Application;
    private port: string;
    private server: http.Server;
    private apiPath = {
        auth:'/api/auth'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.server = http.createServer( this.app );  
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.configRoutes();
    }

    configRoutes(){
        this.app.use(this.apiPath.auth, authRouter);
    }

    configSockets(){
        
    }

    connectionDatabase(){
        configConnectionDatabase();
    }

    execute(){
        
        this.connectionDatabase();

        this.middlewares();

        this.configSockets();
        
        this.server.listen(this.port,()=>{
            console.log(`--- Server is work in the port ${this.port} ---`)
        })
    }


}