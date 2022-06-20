import {
  // fetchBlogsContent,
  fetchContent,
  // fetchTrendingContent,
} from "./contentsThunk";

const { createSlice } = require("@reduxjs/toolkit");

export const contentsStatus = {
  fetching: "fetching",
  idle: "idle",
  initiated: "initiated",
  notFound: "notFound",
};

const initialState = {
  contentLenght: 10,
  fetchingContentType: "",
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
  favouritesContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    // pages: {1: {status, entities}}
    pages: {},
  },
  myBlogsContent: {
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

      state.fetchingContentType = contentType;
      state[contentType].fetchingPageNumber = pageNumber;
      state[contentType].pages[pageNumber] = {
        status: contentsStatus.initiated,
        entities: {},
      };
    },
    resetFavouritesContent(state, action) {
      state.favouritesContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
      };
    },
    resetMyBlogsContent(state, action) {
      state.myBlogsContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContent.pending, (state, action) => {
        const fetchingContentType = state.fetchingContentType;
        const fetchingPageNumber =
          state[fetchingContentType].fetchingPageNumber;

        state[fetchingContentType].pages[fetchingPageNumber].status =
          contentsStatus.fetching;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const fetchingContentType = state.fetchingContentType;
        const fetchingPageNumber =
          state[fetchingContentType].fetchingPageNumber;

        if (action.payload.isError) {
          state[fetchingContentType].status = contentsStatus.idle;
          return;
        }
        const { entities, totalDocuments } = action.payload;

        state[fetchingContentType].totalDocuments = totalDocuments;
        state[fetchingContentType].pages[fetchingPageNumber].entities =
          entities;
        if (Object.keys(entities).length === 0)
          state[fetchingContentType].pages[fetchingPageNumber].status =
            contentsStatus.notFound;
        else
          state[fetchingContentType].pages[fetchingPageNumber].status =
            contentsStatus.idle;
      }),
  // .addCase(fetchContent.rejected, (state, action) => {
  //   const fetchingContentType = "";
  //   const fetchingPageNumber = "-1";
  //   state[fetchingContentType].pages[fetchingPageNumber].status =
  //     contentsStatus.idle;

  //   alert(action.error.message);
  // }),
});

export const { initiateFetching, resetFavouritesContent, resetMyBlogsContent } =
  contentSlice.actions;
export const contentSliceReducer = contentSlice.reducer;
