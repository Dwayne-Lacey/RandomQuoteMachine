import { configureStore } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    quote: [],
    error: ''
};

// Generates pending fulfilled and rejected action types
export const fetchQuote = createAsyncThunk('quote/fetchQuote' , () => {
    return axios
        .get('https://api.kanye.rest/')
        .then((response) => response.data);
})

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchQuote.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchQuote.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        })
        builder.addCase(fetchQuote.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
})

const store = configureStore({
    reducer: {
        quote: quoteSlice.reducer
    }
})

export default store;