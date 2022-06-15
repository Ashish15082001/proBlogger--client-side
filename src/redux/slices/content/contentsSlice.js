import { fetchBlogsContent, fetchTrendingContent } from "./contentsThunk";

const { createSlice } = require("@reduxjs/toolkit");

export const contentsStatus = {
  fetching: "fetching",
  idle: "idle",
  initiated: "initiated",
  notFound: "notFound",
};

const initialState = {
  contentLenght: 10,
  trendingContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    // pages: {1: {status, entities}}
    pages: {},
  },
  blogsContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    // pages: {1: {status, entities}}
    pages: {},
  },
};

const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    initiateFetching(state, action) {
      const { contentType, pageNumber } = action.payload;

      state[contentType].fetchingPageNumber = pageNumber;
      state[contentType].pages[pageNumber] = {
        status: contentsStatus.initiated,
        entities: {},
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTrendingContent.pending, (state) => {
        const fetchingPageNumber = state.trendingContent.fetchingPageNumber;
        state.trendingContent.pages[fetchingPageNumber].status =
          contentsStatus.fetching;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        if (action.payload.isError) {
          state.trendingContent.status = contentsStatus.idle;
          return;
        }
        const { entities, totalDocuments } = action.payload;
        const fetchingPageNumber = state.trendingContent.fetchingPageNumber;

        state.trendingContent.totalDocuments = totalDocuments;
        state.trendingContent.pages[fetchingPageNumber].entities = entities;
        if (Object.keys(entities).length === 0)
          state.trendingContent.pages[fetchingPageNumber].status =
            contentsStatus.notFound;
        else
          state.trendingContent.pages[fetchingPageNumber].status =
            contentsStatus.idle;
      })
      .addCase(fetchBlogsContent.pending, (state) => {
        const fetchingPageNumber = state.blogsContent.fetchingPageNumber;
        state.blogsContent.pages[fetchingPageNumber].status =
          contentsStatus.fetching;
      })
      .addCase(fetchBlogsContent.fulfilled, (state, action) => {
        if (action.payload.isError) {
          state.blogsContent.status = contentsStatus.idle;
          return;
        }
        const { entities, totalDocuments } = action.payload;
        const fetchingPageNumber = state.blogsContent.fetchingPageNumber;

        state.blogsContent.totalDocuments = totalDocuments;
        state.blogsContent.pages[fetchingPageNumber].entities = entities;
        if (Object.keys(entities).length === 0)
          state.blogsContent.pages[fetchingPageNumber].status =
            contentsStatus.notFound;
        else
          state.blogsContent.pages[fetchingPageNumber].status =
            contentsStatus.idle;
      }),
});

export const { initiateFetching } = contentSlice.actions;
export const contentSliceReducer = contentSlice.reducer;
