import React from 'react';
import styles from '@/pages/index.module.css';
import { DeckListItem } from '@/components/decks';
import { Btn } from '@/components/shared/btn';
import { useAppSelector } from 'redux/hooks';
import { selectDecksIds } from 'helpers/client/decks/decksSlice';
import { selectCards } from 'helpers/client/cards/cardsSlice';
import { Card } from 'lib/global/types';
import { useRouter } from 'next/router';

interface HomeProps {
  setAuthorized: React.Dispatch<React.SetStateAction<any>>;
}

export default function Home({setAuthorized}: HomeProps) {

  const router = useRouter()

  const deckIds = useAppSelector(selectDecksIds);
  const cardsAll = useAppSelector(selectCards);

  const renderedDecksList = deckIds.map(deckId => {
    const cardsByDeckId = cardsAll.filter((card: Card) => card.deckId === deckId);
    return (
      <li key = {deckId} className='list-group-item m-0 p-0 border-outline-none'>
        <DeckListItem  id = {deckId} cards = {cardsByDeckId}/>
      </li>
    )
  });
  
  const handleLogOut = () => {
    localStorage.setItem('loggedIn', JSON.stringify(null))
    setAuthorized(() => false)
    router.push("/accounts/login")
  }
  
  return (
    <div className={styles.container  + ""}>
      <main className='w-100'>
        <div className="w-100"> 
        <div>
          <Btn option = "create-deck" />
          <button className='btn btn-primary' onClick = {handleLogOut}>
            <span>Log out</span>
          </button>
        </div>
          <ul className='list-group m-0 p-0'>
            {renderedDecksList}
          </ul>
        </div>
      </main>
    </div>
  )
}
