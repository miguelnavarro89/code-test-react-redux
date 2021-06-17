import { configureStore } from '@reduxjs/toolkit'
import { reducer as movies } from '../movies';

export const store = configureStore({
    reducer: {
        movies
    },
})