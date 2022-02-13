import { Request, Response } from 'express';
import { service } from "./decks.service";
import { asyncErrorBoundary } from '../errors';
import { dbToFrontConverter, front2DbConverter } from '../utils';
import { Card } from 'lib/global/types';

interface DeckDb {
    deck_id: string;
    name: string;
    description: string;
    user_id: string;
    cards: Card[];
}

const listDecks = async (req: Request, res: Response) => {
    const { userId } = req.query;
    const decksDb = await service.list(Number(userId))
    let returnedDecks: DeckDb[] = [];
    decksDb.forEach((deck: DeckDb) => {
        const deck2Client = dbToFrontConverter(deck)
        returnedDecks.push(deck2Client);
    })
    return res.json({ data: returnedDecks});
};

const create = async (req: Request, res: Response) => {
    const deck2Db = front2DbConverter(req.body.data)
    const response = await service.create(deck2Db);
    const deck2Client = {...response[0], id: response[0].deck_id};
	return res.status(200).json({ data: deck2Client});
};

const update = async (req: Request, res: Response) => {
    const deck2Db = front2DbConverter(req.body.data)
	const response = await service.update(deck2Db.deck_id, deck2Db);
    const deck2Client = {...response[0], id: response[0].deck_id}
	return res.status(200).json({ data: deck2Client});
};

const _delete = async (req: Request, res: Response) => {
    const { deckId } = req.query;
    await service._delete(Number(deckId));
    res.status(200).json({ data: { status: "deleted" } });
};

export const decksController = {
    create: [asyncErrorBoundary(create)],
    list: [asyncErrorBoundary(listDecks)],
    update: [asyncErrorBoundary(update)],
    _delete: [asyncErrorBoundary(_delete)]
};



