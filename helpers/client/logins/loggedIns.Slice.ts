import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { User } from "lib/global/types";
import { RootState } from "redux/store";

const loggedInsAdapter = createEntityAdapter({
    //@ts-ignore
    sortComparer: (a, b) => b.id - a.id
})

interface loggedInsState {
    ids: number[];
    status: string;
    error?: Error | unknown;
    entities: any;
    recentLoggedInId: string;
}

const initialState = loggedInsAdapter.getInitialState<loggedInsState>({
    ids: [],
    status: 'idle',
    entities: [],
    error: {
        message: ""
    },
    recentLoggedInId: ""
});

const loggedInsSlice = createSlice({
    name: "loggedIns",
    initialState,
    reducers: {
        saveLoggedIn(state, action) {
            loggedInsAdapter.addOne(state, action.payload);
            state.recentLoggedInId = action.payload.id
        },
    },
})

export default loggedInsSlice.reducer;
    
export const { 
    saveLoggedIn
} = loggedInsSlice.actions;

export const {
    selectAll: selectLoggedIns,
    selectById: selectLoggedInById,
} = loggedInsAdapter.getSelectors((state: RootState)  => state.loggedIns);

