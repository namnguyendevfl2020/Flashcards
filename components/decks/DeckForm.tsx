import React, { useEffect, useState } from "react";
import { Deck } from "lib/global/types";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addDeck, updateDeck } from "helpers/client/decks/decksSlice";
import { deckAPICalls } from "helpers/client/decks";

interface DeckFormProps {
    editedDeck?: Deck;
    option?: string;
}

export default function DeckForm({ editedDeck, option}: DeckFormProps) {
    const dispatch = useAppDispatch();
    const { recentLoggedInId } = useAppSelector(state => state.loggedIns);

    const initialDeck = {
        userId: "",
        name: "",
        description: "",
    };

    const [ deck, setDeck ] = useState<Deck>(initialDeck);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        if (editedDeck) setDeck(() => editedDeck);
    },[option]);
    const router = useRouter();
   
    const handleChange = ({currentTarget: { name, value }}: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setDeck({...deck,
            [name] : value,
            userId: recentLoggedInId,
        });
    }; 

    //implement create and update helper functions and call them when needed
    const create = (abortController: any) => {
        deckAPICalls.create(deck, abortController.signal)
        .then(res => {
            dispatch(addDeck(res));
            router.push("/");
        })
        .catch(setError);
    };
    const update = (abortController: any) => {
        deckAPICalls.update(deck, abortController.signal)
        .then(res => {
            setDeck(() => res);
            dispatch(updateDeck(res));
            router.push("/");
        })
        .catch(setError);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const abortController = new AbortController();
        if (option === "edit-deck") update(abortController);
        else create(abortController);
        return () => abortController.abort();
      };

    return <form onSubmit={handleSubmit}>
        <div className = "w-100">
            <div className = "pb-0">
                <label htmlFor="name" className ="w-100" >
                <div className="pb-2">Name </div>
                <input 
                    id = "name"
                    type = "text"
                    name = "name"
                    className ="w-100 form-control" 
                    style = {{height:"40px"}}
                    placeholder ="Deck Name"
                    onChange = {handleChange}
                    value = {deck.name}
                    />
                </label>
            </div>
            <div className = "py-0">
                <label htmlFor="Description" className ="w-100">
                <div className="pb-2 pt-3">Description</div>
                <textarea
                    id = "Description"
                    // type = "text"
                    name = "description"
                    className ="w-100 form-control" 
                    style = {{height:"100px"}}
                    placeholder ="Brief description of the deck"
                    onChange = {handleChange}
                    value = {deck.description}
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