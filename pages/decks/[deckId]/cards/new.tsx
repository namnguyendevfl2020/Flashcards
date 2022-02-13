import { CardForm } from "@/components/cards";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { saveDeckSelected, selectDeckById } from "helpers/client/decks/decksSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function CreateCard() {

    const router = useRouter();
    const { query: { deckId }} = router;

    const dispatch = useAppDispatch();
    const deck = useAppSelector<any>(state => selectDeckById(state, Number(deckId)));

    useEffect(() => {
        dispatch(saveDeckSelected(deck));
      },[deckId]);

    return <div className ="container">
            <div>
                <BreadCrumb deck = {deck} />
            </div>
            <div>
                < CardForm option = "add-card" 
                />
            </div> 
        </div>
    }
