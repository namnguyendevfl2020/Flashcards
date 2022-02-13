import { cardAPICalls } from "helpers/client/cards";
import { deleteCard } from "helpers/client/cards/cardsSlice";
import { deckAPICalls } from "helpers/client/decks";
import { deleteDeck } from "helpers/client/decks/decksSlice";
import { useRouter } from "next/router";
import React from "react"
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Icon } from "./Icons"

interface DltBtnProps {
    deckId?: string;
    cardId?: string;
    option: String;
};
//implement this Dlt component to dlt a card or deck
export default function Dlt (props: DltBtnProps) {
    const { 
        cardId, 
        deckId, 
        option, 
    } = props;

    const { recentLoggedInId } = useAppSelector(state => state.loggedIns);
    const dispatch = useAppDispatch();

    const router = useRouter();
    const { asPath } = router;

    const handleDelete = () => {
        const abortController = new AbortController();

        const cardDelete = () => {
            if (deckId && cardId) {
                cardAPICalls._delete(recentLoggedInId, cardId, abortController.signal)
                .then(() => {
                    dispatch(deleteCard(cardId));
                })
                .catch();
            };
        };

        const deckDelete = () => {
            if (deckId) {
                deckAPICalls._delete(recentLoggedInId, deckId, abortController.signal)
                .then(() => {
                    dispatch(deleteDeck(deckId));
                })
                .catch();
            };
        };

        const cardMessage = `
            Delete this card?
                        
            You will not be able to recover it.`;

        const deckMessage = `
            Delete this deck?
                    
            You will not be able to recover it.`;

        //set up the appropriate message and delete method according to the "option" passed in
        const message = option === "deck" ? deckMessage : cardMessage;
        const destroy = option === "deck" ? deckDelete : cardDelete;
        const confirm = window.confirm(message);
        
        if (confirm === false) router.push(`${asPath}`);
        else destroy();
        return () => abortController.abort();
    };    
    return (
        <div  className="btn btn-danger m-0 px-1" onClick = {handleDelete} >
            <Icon type = "trash" />
            <span className = "oi oi-trash" />
        </div>
    )
}