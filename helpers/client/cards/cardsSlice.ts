import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { cardAPICalls } from ".";
import { RootState } from "redux/store";
import { Card } from "lib/global/types";

const cardsAdapter = createEntityAdapter({
    //@ts-ignore
    sortComparer: (a: Card, b:Card) => b.id - a.id,
});

interface CardsState {
    id: number[];
    status: string;
    error?: Error | unknown;
    entities: any;
};

const initialState = cardsAdapter.getInitialState<CardsState>({
    id: [],
    status: 'idle',
    entities: [],
    error: {
        message: ""
    },
})

export const fetchCards = createAsyncThunk<
    Card[],
    string    
    >(
        'cards/fetchCards', 
        async (userId) => {
            const abortController = new AbortController();
            const response = await cardAPICalls.listCards(userId, abortController.signal);
            return response as Card[];
        }
    );

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        updateCard(state, action) {
            cardsAdapter.updateOne(state, action.payload);
        },
        addCard(state, action) {
            cardsAdapter.addOne(state, action.payload);
        },
        deleteCard(state,action) {
            cardsAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchCards.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchCards.fulfilled, (state, action) => {
            cardsAdapter.setAll(state, action.payload);
            state.status = 'idle';
        })
        .addCase(fetchCards.rejected,(state, action) => {
            state.status = 'rejected';
            state.error = action.error;
        })
    }
})

export default cardsSlice.reducer;

export const { 
    updateCard,
    addCard,
    deleteCard
} = cardsSlice.actions;

export const {
    selectAll: selectCards,
    selectById: selectCardById,
} = cardsAdapter.getSelectors((state: RootState)  => state.cards);

export const selectCardsIds = createSelector(
    selectCards,
    (cards) => {
        return cards.map((card: any) => card.id)//dnt know what type of it
    }
);

export const selectFilteredCards = createSelector(
    // First input selector: all todos
    selectCards,
    // Second input selector: all filter values
    (state: RootState) => state.decks,
    // Output selector: receives both values
    (cards: Card[], decks) => {
      const { deckSelected } = decks
      if (deckSelected){
          const { id } = deckSelected;
        return cards.filter((card: Card) => card.deckId === id)
      }
      // Return either active or completed todos based on filter
    }
  )
  
  export const selectFilteredCardIds = createSelector(
    // Pass our other memoized selector as an input
    selectFilteredCards,
    // And derive data in the output selector
    filteredCards => filteredCards && filteredCards.map(card => card.id)
  )

