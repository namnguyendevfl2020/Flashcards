import React, { useEffect, useState } from "react";
import { Card, Signal } from "lib/global/types";
import { useRouter } from "next/router";
import { cardAPICalls } from "helpers/client/cards";
import { addCard, updateCard } from "helpers/client/cards/cardsSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

interface CardFormProps {
    editedCard?: Card;
    option: string;
};

export default function CardForm({editedCard, option}: CardFormProps) {

    const router = useRouter();
    const { query: { deckId }} = router;

    const dispatch = useAppDispatch();
    const { recentLoggedInId } = useAppSelector(state => state.loggedIns);

    const initialCard = {
        userId: "",
        front: "",
        back: "",
        deckId: "",
    };

    const [ card, setCard ] = useState(initialCard);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (editedCard) setCard(() => editedCard);
        else setCard(() => initialCard);
    },[editedCard]);

    //Update any changes made in the textarea fields
    const handleChange = ({target: { name, value }}: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (deckId) {
            setCard({...card,
                    [name] : value,
                    userId: recentLoggedInId,
                    deckId: `${deckId}`,
                })
            }
    };

    //Create this helper function to add a new card and call it when needed
    const create = (abortController: Signal) => {
        cardAPICalls.create(card, abortController.signal)
        .then(res => {
            dispatch(addCard(res))
            router.push(`/decks/${deckId}`)
        })
        .catch(setError);
    };

    //Create this helper function to edit a card and call it when needed
    const update = (abortController: Signal) => {
        cardAPICalls.update(card, abortController.signal)
        .then(res => {
            dispatch(updateCard(res))
            router.push(`/decks/${deckId}`)
        })
        .catch(setError);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const abortController = new AbortController();
        if (option === "edit-card") update(abortController);
        else create(abortController);
        return () => abortController.abort();
    };

    const { front, back } = card;

    return <form onSubmit={handleSubmit}>
        <div className = "w-100">
            <div className = "pb-0">
                <label htmlFor="front" className ="w-100" >
                <div className="pb-2">Front </div>
                <textarea 
                    id = "front"
                    name = "front"
                    className ="w-100 form-control" 
                    style = {{height:"40px"}}
                    placeholder ="Front side of card"
                    value = {front}
                    onChange = {handleChange}
                    />
                </label>
            </div>
            <div className = "py-0">
                <label htmlFor="back" className ="w-100">
                <div className="pb-2 pt-3">Back</div>
                <textarea
                    id = "back"
                    name = "back"
                    className ="w-100 form-control" 
                    style = {{height:"100px"}}
                    placeholder ="Back side of card"
                    value = {back}
                    onChange = {handleChange}
                    />
                </label>
            </div>
        </div>
        <div className= "py-2">
            <button type = "submit"
                    className ="btn btn-primary">
                    Save
            </button>
        </div>
    </form>
}
