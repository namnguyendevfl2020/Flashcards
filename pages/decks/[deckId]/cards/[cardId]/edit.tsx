import React, { useEffect } from "react";
import { CardForm } from "@/components/cards";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectCardById, selectFilteredCards } from "helpers/client/cards/cardsSlice";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { saveDeckSelected, selectDeckById } from "helpers/client/decks/decksSlice";

export default function EditCard() {
    
    const router = useRouter();
    const { query: { cardId, deckId }} = router;

    const dispatch = useAppDispatch()
    const deck = useAppSelector<any>(state => selectDeckById(state, Number(deckId)));
    const cards = useAppSelector<any>(state => selectFilteredCards(state));
    const card = useAppSelector<any>(state => selectCardById(state, Number(cardId)));

    useEffect(() => {
        dispatch(saveDeckSelected(deck));
      },[deckId]);

    return  (card
        ?   <div className ="container">
                <div>
                    <BreadCrumb deck = {deck} cards = {cards}/>
                </div>
                <div>
                    < CardForm option = "edit-card" editedCard={card}/>
                </div> 
            </div>
        : <> </>)
    
}
