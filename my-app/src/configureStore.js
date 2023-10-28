import { configureStore } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const colorGen = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
  }

// Initial API call state
const initialState = {
    loading: false,
    quote: [],
    error: ''
};

// Initial visibility state
const initialVisibilityState = {
    visibility: "visible",
    color: colorGen()
}

// Generates pending fulfilled and rejected action types
export const fetchQuote = createAsyncThunk('quote/fetchQuote' , () => {
    return axios
        .get('https://api.kanye.rest/')
        .then((response) => response.data);
})



// Handles state management for Kanye Rest API calls
const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchQuote.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchQuote.fulfilled, (state, action) => {
            state.loading = false;
            state.quote = action.payload;
            state.error = '';
        })
        builder.addCase(fetchQuote.rejected, (state, action) => {
            state.loading = false;
            state.quote = [];
            state.error = action.error.message;
        })
    }
})

// Handles fade in / fade out class naming for CSS to fade quote in and out
const fadeSlice = createSlice({
    name: 'visibility',
    initialState : initialVisibilityState,
    extraReducers: (builder) => {
        builder.addCase("VISIBLE", (state, action) => {
            state.visibility = "visible";
            state.color = action.color;
            state.author = action.author;
        })
        builder.addCase("HIDDEN", (state) => {
            state.visibility = "hidden";
        })
    }
})

const store = configureStore({
    reducer: {
        quote: quoteSlice.reducer,
        visibility: fadeSlice.reducer
    }
})

export default store;