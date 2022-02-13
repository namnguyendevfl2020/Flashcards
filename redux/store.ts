import { configureStore } from '@reduxjs/toolkit';
import { cardsSlice } from 'helpers/client/cards';
import { decksSlice } from 'helpers/client/decks';
import { loggedInsSlice } from 'helpers/client/logins';
import { popupSlice } from 'helpers/client/popups';

const store = configureStore({
    reducer: {
        loggedIns: loggedInsSlice,
        decks: decksSlice,
        cards: cardsSlice,
        popup: popupSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch