import { selectDeckById } from "helpers/client/decks/decksSlice";
import { Card } from "lib/global/types";
import React from "react";
import { useAppSelector } from "redux/hooks";
import { Btn, DltBtn } from "../shared/btn";

interface DeckListItemsProp {
  id: string;
  cards: Card[];
};

export default function DeckListItems({id, cards}: DeckListItemsProp) {
  
  const deck = useAppSelector<any>(state => selectDeckById(state, id));
  const { name, description } = deck;

  return (
      <div className = "border border-dark p-2 my-2">
        <div className ="row w-100">
          <div className ="col">
            <h2>{name}</h2> 
          </div>
          <div className ="col float-end">
          {cards
          ? <p className ="float-end"> {cards.length} cards</p>
          : <p className ="float-end"> 0 cards</p>}
          </div>
          
        </div>
        <p> {description} </p>
        <div className = "row w-100 ">
          <div className ="col"> 
            <Btn deck = {deck} option = "view" />
            <Btn deck = {deck} option = "study" />                    
          </div> 
          <div className = "col ms-auto">
            <div className="float-end">
              <DltBtn option = "deck" deckId = {id}/>
            </div>
          </div>
        </div>
      </div>
      )
}