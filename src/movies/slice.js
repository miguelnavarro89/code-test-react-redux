import { compose, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { complement, descend, equals, isEmpty, path, pipe, prop, propSatisfies, sortWith, unless } from "ramda";
import { getFromLocalStorage, makeSlug, saveToLocalStorage } from "../utils";

const initialState = {
    status: 'idle',
    entities: [],
}

const MOVIES_STORAGE_KEY = 'tmdb/movies'
const getLocal = () => getFromLocalStorage(MOVIES_STORAGE_KEY)
const saveLocal = saveToLocalStorage(MOVIES_STORAGE_KEY)

export const fetchAll = createAsyncThunk(
    'movies/fetchAll',
    async () => {
        try {
            const data = getLocal()
            if (data) {
                return data
            } else {
                throw new Error('No data in local storage')
            }
        } catch (e) {
            const { data } = await axios.get('http://www.mocky.io/v2/5dc3c053300000540034757b')
            return data.movies.map(movie => ({
                ...movie,
                slug: makeSlug(movie.title),
            }))
        }
    },
)

export const selectStatus = path(['movies', 'status'])
export const selectMovies = pipe(
    path(['movies', 'entities']),
    unless(
        isEmpty,
        sortWith([
            descend(
                compose(
                    dateString => new Date(dateString).getTime(),
                    prop('release'),
                )
            ),
        ])
    ),
)

const isChangingEntities = (action) => ['movies/add', 'movies/delete'].includes(action.type)

const { reducer, actions } = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        delete: (state, { payload }) => {
            const newEntities = state.entities.filter(
                propSatisfies(
                    complement(equals)(payload),
                    'title'
                )
            )
            state.entities = newEntities
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAll.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchAll.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(fetchAll.fulfilled, (state, { payload }) => {
                if (payload && payload.length) {
                    saveLocal(payload)
                    state.entities = payload
                }
                state.status = 'idle'
            })
            .addMatcher(
                isChangingEntities,
                (state, action) => {
                    saveLocal(state.entities)
                }
            )
    },
})

export { reducer, actions }
