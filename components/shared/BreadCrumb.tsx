
import { saveDeckSelected } from "helpers/client/decks/decksSlice";
import { Card, Deck } from "lib/global/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import { useAppDispatch } from "redux/hooks";
interface BreadCrumbProps {
    deck?: Deck;
    cards?: Card[]
}

export default function BreadCrumb({deck, cards}: BreadCrumbProps) {

    const dispatch = useAppDispatch();

    const router = useRouter();
    const {query: { deckId, cardId }} = router;
    const url = router.asPath;

    const [cardIdx, setCardIdx] = useState<any>(null);

    useEffect(() => {
        dispatch(saveDeckSelected(deck));
        if (cards) {
            cards.forEach((card: Card,index: number) => (Number(card.id) === Number(cardId)) ? setCardIdx(index+1) :null)
        }
    },[deckId, cardId]);
    
    const subUrl = url.split('/');
    const breadcrumb = "breadcrumb h-44px d-flex align-items-center bg-gray-300 ps-3 my-3 w-100";

    const list = subUrl.map((aSubUrl,index) =>  {
        const breadcrumbItem = "breadcrumb-item oi oi-home";
        const activeBreadcrumbItem = "breadcrumb-item ";
        if (aSubUrl === "" && index === 0) {
            return <li className= {breadcrumbItem} key = {index}> 
            <Link href="/" > 
                <a className="color-blue"> Home </a> 
            </Link>
            </li>
        }; //with the last splash
        if (aSubUrl === "new" && deck === undefined) return <li className={activeBreadcrumbItem} key = {index}> Create Deck</li>; //w/o the last splash
        if (index === subUrl.length-1 && aSubUrl === deckId) return deck && <li className={activeBreadcrumbItem} key = {index}>{deck.name}</li>
        if (deck !== undefined){
            if (index === subUrl.length-2) 
            if (aSubUrl !== "decks") return <li className={activeBreadcrumbItem} key = {index}>
                <Link href={`/decks/${deck.id}`}>
                    <a className={activeBreadcrumbItem + " color-blue"}>
                        {deck.name}
                    </a>
                </Link>
            </li>;
            if (index >= subUrl.length-1){  
                let value = "" 
                switch(aSubUrl) {
                    case "study":
                        value = "Study";
                        break; 
                    case "edit" : 
                        (cards)
                        ? value = `Edit Card ${cardIdx}`
                        : value = `Edit Deck`;
                        break;
                    case "new"  : 
                        value = "Add Card";
                        break; 
                    default:
                };
                return <li className={activeBreadcrumbItem} key = {index}>{value}</li> // does not show the last splash
            }
        return null;
        }
        return null
    });
    
    return  <nav>
                <ol className={breadcrumb}>{list}</ol>
            </nav>
}