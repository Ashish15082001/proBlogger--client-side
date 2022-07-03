import {
  // fetchBlogsContent,
  fetchContent,
  // fetchTrendingContent,
} from "./contentsThunk";

const { createSlice } = require("@reduxjs/toolkit");

export const contentTypes = {
  blogs: "blogsContent",
  trending: "trendingContent",
  favourites: "favouritesContent",
  myBlogs: "myBlogsContent",
};

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
    pages: {},
  },
  favouritesContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    pages: {},
  },
  myBlogsContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    pages: {},
  },
  contentCache: {},
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
        entities: [],
      };
    },
    resetTrendingContent(state, action) {
      state.trendingContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
      };
    },
    resetBlogsContent(state, action) {
      state.blogsContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
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
    viewBlog(state, action) {
      const { blogId, userId, date } = action.payload;
      state.contentCache[blogId].views[userId] = { date };
    },
    likeBlog(state, action) {
      const { blogId, userId, date } = action.payload;
      if (state.contentCache[blogId].likes[userId])
        delete state.contentCache[blogId].likes[userId];
      else state.contentCache[blogId].likes[userId] = { date };
    },
    commentOnBlog(state, action) {
      const {
        blogId,
        userId,
        commenterName,
        commenterProfileImage,
        comment,
        date,
      } = action.payload;

      if (state.contentCache[blogId].comments[userId])
        state.contentCache[blogId].comments[userId].comment += " " + comment;
      else
        state.contentCache[blogId].comments[userId] = {
          date,
          comment,
          commenterName,
          commenterProfileImage,
        };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContent.pending, (state, action) => {
        console.log("pending...");
        const fetchingContentType = state.fetchingContentType;
        const fetchingPageNumber =
          state[fetchingContentType].fetchingPageNumber;

        state[fetchingContentType].pages[fetchingPageNumber].status =
          contentsStatus.fetching;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        console.log("fulfilled...");
        const fetchingContentType = state.fetchingContentType;
        const fetchingPageNumber =
          state[fetchingContentType].fetchingPageNumber;

        if (action.payload.isError) {
          state[fetchingContentType].status = contentsStatus.idle;
          return;
        }
        const { entities, totalDocuments } = action.payload;
        state[fetchingContentType].totalDocuments = totalDocuments;
        state.contentCache = { ...state.contentCache, ...entities };
        state[fetchingContentType].pages[fetchingPageNumber].entities =
          Object.keys(entities);

        if (Object.keys(entities).length === 0)
          state[fetchingContentType].pages[fetchingPageNumber].status =
            contentsStatus.notFound;
        else
          state[fetchingContentType].pages[fetchingPageNumber].status =
            contentsStatus.idle;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        console.log("rejected...");
        const fetchingContentType = state.fetchingContentType;
        const fetchingPageNumber =
          state[fetchingContentType].fetchingPageNumber;

        // console.log(fetchingContentType);
        // console.log(fetchingPageNumber);
        state[fetchingContentType].pages[fetchingPageNumber].status = "idle";
      }),
});

export const {
  initiateFetching,
  resetBlogsContent,
  resetTrendingContent,
  resetFavouritesContent,
  resetMyBlogsContent,
  likeBlog,
  commentOnBlog,
  viewBlog,
} = contentSlice.actions;
export const contentSliceReducer = contentSlice.reducer;
