import { DeckForm } from "@/components/decks";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { selectDeckById } from "helpers/client/decks/decksSlice";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "redux/hooks";

export default function EditDeckPage() {

    const router = useRouter();
    const { query: { deckId }} = router;
    const deck = useAppSelector<any>(state => selectDeckById(state, Number(deckId)));
    
    return (
        <div className = "container">
            <BreadCrumb deck = {deck}/>
            <DeckForm   option = "edit-deck" editedDeck = {deck} />
        </div>
    )
}