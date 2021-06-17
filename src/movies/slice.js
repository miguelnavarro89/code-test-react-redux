import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: [],
}

const { reducer, actions } = createSlice({
    name: 'movies',
    initialState,
    reducers: {}
})

export { reducer, actions }
