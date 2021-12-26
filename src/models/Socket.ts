import { Server as Service } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { findOutJWT } from '../helpers/jsonWebToken';
import { getRankingCards, getFavoriteCardsOfUser, createCard, deleteCard } from '../controllers/cardController';

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

            const id_user = uid as string;

            console.log('socket conection active!:3')
            //Cuando se conecten...

            /* Emitir el ranking general*/
            this.io.emit('ranking-cards', await getRankingCards());
            
            /* Emitir sus tarjetas fav */
            this.io.emit('favorites', await getFavoriteCardsOfUser(id_user));

            // Escuchar cuando se (elimine o le de like) a una tarjeta
            socket.on('action_card', async({ url, image, name, action }, callback)=>{
                
                if(action === 'like') callback( await createCard({ url, uid: id_user, image, name }) );

                else callback( await deleteCard({ url, uid: id_user,image, name }) );

                this.io.emit('ranking-cards', await getRankingCards());

                
            })

        });
    }
}

