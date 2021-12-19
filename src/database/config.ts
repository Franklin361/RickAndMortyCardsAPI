import { connect } from 'mongoose';

export const configConnectionDatabase = async () => {
    
    const uri:string = process.env.MONGO_CONECCTION || 'mongodb://localhost:27017/links'
    
    try {
        await connect( uri );
        console.log('Database Online:)');

    } catch (error) {
        console.log(error);
        throw new Error('There was an error in the database connection :c');
    }
};