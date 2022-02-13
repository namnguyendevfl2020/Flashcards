import { createSlice } from "@reduxjs/toolkit";

interface PopupState {
    selected: string | null;
}

const initialState: PopupState = ({
    selected: null,
});

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        savePopup(state,action) {
            state.selected = action.payload;
        },
        remove(state, action) {
            state.selected = null;
        }
    },
})

export default popupSlice.reducer;

export const { 
    savePopup,
    remove
} = popupSlice.actions;



