import { Server as Service } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { findOutJWT } from '../helpers/jsonWebToken';

export class Socket {

    private io: Service<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

    constructor(io: Service<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', async (socket) => {
            
            const token = socket.handshake.query['x-token'] as string;

            const [ valido, uid ] = findOutJWT( token );

            if (!valido) {
                return socket.disconnect();
            }


            // Emitir que se le ha dado like a una tarjeta

            

        });
    }
}

