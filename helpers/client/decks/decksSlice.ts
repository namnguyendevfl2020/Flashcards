import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { deckAPICalls } from ".";
import { RootState } from "redux/store";
import { Deck } from "lib/global/types";

const decksAdapter = createEntityAdapter({
    //@ts-ignore
    sortComparer: (a: Deck, b:Deck) => b.id - a.id,
})

interface DecksState {
    ids: number[];
    status: string;
    error?: Error | unknown;
    entities: any;
    deckSelected: Deck | null;
}

const initialState = decksAdapter.getInitialState<DecksState>({
    ids: [],
    status: 'idle',
    entities: [],
    error: {
        message: ""
    },
    deckSelected: null,
});

export const fetchDecks = createAsyncThunk<
    Deck[],
    string
>('decks/fetchDecks', 
    async (userId) => {
        const abortController = new AbortController()
        const response = deckAPICalls.listDecks(userId, abortController.signal)
        return response
    });

const decksSlice = createSlice({
    name: "decks",
    initialState,
    reducers: {
        updateDeck(state, action) {
            decksAdapter.updateOne(state, action.payload);
        },
        addDeck(state, action) {
            decksAdapter.addOne(state, action.payload);
        },
        deleteDeck(state,action) {
            decksAdapter.removeOne(state, action.payload);
        },
        saveDeckSelected(state, action) {
            state.deckSelected = action.payload;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchDecks.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchDecks.fulfilled, (state, action) => {
            decksAdapter.setAll(state, action.payload);
            state.status = 'idle';
        })
        .addCase(fetchDecks.rejected,(state, action) => {
            state.status = 'rejected';
            state.error = action.error;
        })
    }
})

export default decksSlice.reducer;

export const { 
    updateDeck,
    addDeck,
    deleteDeck,
    saveDeckSelected,
} = decksSlice.actions;

export const {
    selectAll: selectDecks,
    selectById: selectDeckById,
} = decksAdapter.getSelectors((state: RootState)  => state.decks);

export const selectDecksIds = createSelector(
    selectDecks,
    (decks) => {
        return decks.map((deck: any) => deck.id)//dnt know what type of it
    }
);

