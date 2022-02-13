import { CardListItem } from "@/components/cards";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { Btn, DltBtn } from "@/components/shared/btn";
import { selectFilteredCardIds } from "helpers/client/cards/cardsSlice";
import { saveDeckSelected, selectDeckById } from "helpers/client/decks/decksSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {  useAppDispatch, useAppSelector } from "redux/hooks";

export default function DeckPage() {  

  const router = useRouter();
  const { query: { deckId }} = router;

  const dispatch = useAppDispatch();
  const cardIds = useAppSelector(selectFilteredCardIds);
  const deck = useAppSelector<any>(state => selectDeckById(state, Number(deckId)));
  
  useEffect(() => {
    dispatch(saveDeckSelected(deck));
  },[deckId]);

  const renderedCardsList = cardIds && cardIds.map(cardId => {
      return ( deck && cardId &&
        <li key = {cardId} className='list-group-item m-0 p-0 border-outline-none'>
          <CardListItem  id = {cardId} deck = {deck}/>
        </li>
      )
    });
  return ( deck  
      ? <div>
      <BreadCrumb deck= {deck}/>
      <h4>{deck.name}</h4>
      <p>{deck.description}</p>
      <div className = "row w-100 ">
          <div className ="col"> 
          {/* Implements btns with different functions */}
              <Btn deck = {deck} option = "edit" />
              <Btn deck = {deck} option = "study" />
              <Btn deck = {deck} option = "add-card"/>            
          </div> 
          <div className = "col-auto me-auto">
            <div className = "float-end">
              <DltBtn option = "deck" deckId = {`${deckId}`}/>
            </div>
          </div>  
      </div>
      <div>
          <h2> Cards </h2>
          {renderedCardsList}
      </div>
  </div>
  : <></>
  )
}