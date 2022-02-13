import { Card, Deck } from "../../../lib/global/types";

export const routeUrls = {
    deckCreate: '/deck/new',
    deckView: '/deck/:deckId',
    deckStudy: '/deck/:deckId/study',
    deckEdit: '/deck/:deckId/edit',
    cardCreate: '/deck/:deckId/cards/new',
    cardEdit: '/deck/:deckId/card/:cardId/edit'
};

interface BtnUrlsOutput {
    deckView?: string;
    deckStudy?: string;
    deckEdit?: string;
    cardCreate?: string;
    cardEdit?: string;
    deckCreate?: string;
};

export const btnUrls = (deck?: Deck, card?: Card): BtnUrlsOutput => {
    if (deck) {
        const urls = {
            deckView: `/decks/${deck.id}`,
            deckStudy: `/decks/${deck.id}/study`,
            deckEdit: `/decks/${deck.id}/edit`,
            cardCreate: `/decks/${deck.id}/cards/new`
        };
        if (card) return {...urls,
            cardEdit: `/decks/${deck.id}/cards/${card.id}/edit` 
        };
        return urls;     
    } 
    return {
        deckCreate: '/decks/new',
    };
}