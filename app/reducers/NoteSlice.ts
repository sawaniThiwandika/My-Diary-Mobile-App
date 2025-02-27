import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [],
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
    },
});

export const { setNotes, addNote } = notesSlice.actions;
export default notesSlice.reducer;
