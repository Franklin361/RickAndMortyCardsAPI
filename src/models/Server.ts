
import express, { Application } from "express";
import cors from 'cors';
import http from 'http';


export class Server {
      
    private app: Application;
    private port: string;
    private server: http.Server;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.server = http.createServer( this.app );  
    }


    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    configSockets(){
        
    }

    execute(){

        this.middlewares();

        this.configSockets();
        
        this.server.listen(this.port,()=>{
            console.log(`--- Server is work in the port ${this.port} ---`)
        })
    }


}