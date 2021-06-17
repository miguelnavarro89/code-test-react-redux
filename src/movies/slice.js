import { compose, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ascend, descend, filter, path, pipe, prop, sort, sortBy, sortWith } from "ramda";
import { makeSlug } from "../utils";

const initialState = {
    status: 'idle',
    entities: [],
}

export const fetchAll = createAsyncThunk(
    'movies/fetchAll',
    async () => {
        const { data } = await axios.get('http://www.mocky.io/v2/5dc3c053300000540034757b')
        return data.movies.map(movie => ({
            ...movie,
            slug: makeSlug(movie.title),
        }))
    },
)

export const selectStatus = path(['movies', 'status'])
export const selectMovies = pipe(
    path(['movies', 'entities']),
    sortWith([
        descend(
            compose(
                dateString => new Date(dateString).getTime(),
                prop('release'),
            )
        ),
    ])
)
export const selectMovie = compose(
    // filter(),
    selectMovies,
)

const { reducer, actions } = createSlice({
    name: 'movies',
    initialState,
    reducers: (builder) => {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAll.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchAll.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(fetchAll.fulfilled, (state, { payload }) => {
                state.entities = payload
                state.status = 'idle'
            })
    },
})

export { reducer, actions }
