import { Request, Response } from 'express';
import { service } from "./cards.service";
import { asyncErrorBoundary } from '../errors';
import { dbToFrontConverter, front2DbConverter } from '../utils';

interface CardDb {
    card_id: string;
    front: string;
    back: string;
    deck_id: string;
    user_id: string;
}

const listCards = async (req: Request, res: Response) => {
    const { userId } = req.query;
    const cardsDb = await service.list(Number(userId));
    const returnedCards: CardDb[] = [];
    cardsDb.forEach((card: CardDb) => {
        returnedCards.push(dbToFrontConverter(card));
    })
    return res.json({ data: returnedCards});
};

const create = async (req: Request, res: Response) => {
    const card2Db = front2DbConverter(req.body.data)
    const response = await service.create(card2Db);
    const card2Client = {...response[0], id : response[0].card_id};
	return res.status(200).json({ data: card2Client});
};

const update = async (req: Request, res: Response) => {
    const card2Db = front2DbConverter(req.body.data)
	const response = await service.update(card2Db.card_id, card2Db);
    const card2Client = {...response[0], id: response[0].card_id};
	return res.status(200).json({ data: card2Client});
};

const _delete = async (req: Request, res: Response) => {
    const { cardId } = req.query;
    await service._delete(Number(cardId));
    res.status(200).json({ data: { status: "card deleted" } });
};

export const cardsController = {
    list: [asyncErrorBoundary(listCards)],
    create: [asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(update)],
    _delete: [asyncErrorBoundary(_delete)]
};


