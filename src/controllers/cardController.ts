import { Request, Response } from "express";

import CardModel from "../models/Card";
import UserModel from "../models/User";

export interface IGetUserAuthInfoRequest extends Request {
    uid?: string
}

interface IProps {
    url: string;
    uid: string;
    image: string;
    name: string;
}

export const createCard = async ({ url, uid, image, name }: IProps) => {

    const existCard = await CardModel.findOne({ url });

    const user = await UserModel.findById(uid);

    if (!user) return { message: 'User no exist', type: 'error' }


    if (user.favorites.length === 5) return { message: 'Version Free solo acepta 5 tarjetas favoritas', type: 'warning' }

    const existCardOfUser = user.favorites.filter(fav => fav === url);

    if (!existCard) {

        const newCard = new CardModel({ url, image, name });
        await newCard.save();

        user.favorites = [...user.favorites, url];
        await user.save();

        return {
            message: 'Tarjeta agregada a Favoritos',
            favorites: user.favorites,
            type: 'success'
        }

    } else {

        if (existCardOfUser.length === 0) {
            user.favorites = [...user.favorites, url];
            existCard.likes += 1;
            await user.save();
            await existCard.save();

            return {
                message: 'Tarjeta agregada a Favoritos',
                favorites: user.favorites,
                type: 'success'
            }
        }

        return {
            message: 'Tarjeta ya esta agregada a Favoritos',
            type: 'info'
        }
    }






};


export const deleteCard = async ({ url, uid, image, name }: IProps) => {

    const user = await UserModel.findById(uid);
    const card = await CardModel.findOne({ url });

    if (user && card) {

        user.favorites = user.favorites.filter(fav => fav !== url);
        card.likes -= 1;

        await user.save();
        await card.save();

        return {
            message: 'Tarjeta eliminada de Favoritos',
            type: 'success',
            favorites: user.favorites
        }
    }
};


export const getFavoriteCardsOfUser = async (uid: string) => {
    
    const user = await UserModel.findById(uid);

    if (!user) {
        return {
            message: 'User no exist',
            type: 'error'
        }
    }

    return user.favorites
};


export const getRankingCards = async () => {

    const ranking = await CardModel.find({}).sort('-likes').limit(5);
    return ranking
};