import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './reducers/NoteSlice';
import userSlice from "./reducers/UserSlice";

const store = configureStore({
    reducer: {
        notes: notesSlice,
        user: userSlice,
    },
});

export default store;
