import { DeckForm } from "@/components/decks";
import BreadCrumb from "@/components/shared/BreadCrumb";
import React from "react";

export default function NewDeck() {
    return (
        <div className = "container">
            <div>
                <BreadCrumb />
            </div>
            <div>
                <DeckForm option = "create-deck"  />
            </div>
        </div>
    )
}