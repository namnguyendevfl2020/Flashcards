import { selectCardById } from "helpers/client/cards/cardsSlice";
import { Deck } from "lib/global/types";
import React from "react";
import { useAppSelector } from "redux/hooks";
import { Btn, DltBtn } from "../shared/btn";

interface CardListItemProp {
  deck: Deck;
  id: string;
};

export default function CardListItem({ id, deck }: CardListItemProp) {

  const card = useAppSelector<any>(state => selectCardById(state, id))
  const { front, back, deckId } = card;
  
    return <>
        <div className = "card container">
          <div className ="row w-100">
            <div className ="col">
              <p>{front}</p> 
            </div>
            <div className ="col">
              <p>{back}</p> 
            </div>
          </div>
          <div className = "row w-100 ">
            <div className = "col"></div>
            <div className = "col-auto float-end mb-2">
                <Btn option = "edit-card" card = {card} deck = {deck}/>
                <DltBtn  option = "card" cardId = {card.id} deckId = {deckId}/>
            </div>
          </div>
        </div>
      </>
}