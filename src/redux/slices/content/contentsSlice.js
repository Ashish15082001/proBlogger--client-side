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
    entities: {},
  },
  blogsContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    pages: {},
    entities: {},
  },
  favouritesContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    pages: {},
    entities: {},
  },
  myBlogsContent: {
    totalDocuments: -1,
    fetchingPageNumber: -1,
    pages: {},
    entities: {},
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
      };
    },
    resetContent(state, action) {
      state.trendingContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
        entities: {},
      };
      state.blogsContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
        entities: {},
      };
      state.favouritesContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
        entities: {},
      };
      state.myBlogsContent = {
        totalDocuments: -1,
        fetchingPageNumber: -1,
        pages: {},
        entities: {},
      };
      state.fetchingContentType = "";
      state.contentCache = {};
    },

    viewBlog(state, action) {
      const { blogId, userId, date } = action.payload;
      state.contentCache[blogId].views[userId] = { userId, date };
    },
    likeBlog(state, action) {
      const { blogId, userId, date } = action.payload;
      state.contentCache[blogId].likes[userId] = { userId, date };
    },
    unLikeBlog(state, action) {
      const { blogId, userId } = action.payload;
      delete state.contentCache[blogId].likes[userId];
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

      if (!state.contentCache[blogId].comments[userId])
        state.contentCache[blogId].comments[userId] = {
          commenterName,
          commenterProfileImage,
          commenterComments: {},
        };

      state.contentCache[blogId].comments[userId].commenterComments[
        new Date(date).getTime()
      ] = {
        date,
        comment,
        userId,
      };
    },
    addBlogToFavouritesContent(state, action) {
      const { blogId } = action.payload;
      state.favouritesContent.entities[blogId] = blogId;
    },
    removeBlogFromFavouritesContent(state, action) {
      const { blogId } = action.payload;
      delete state.favouritesContent.entities[blogId];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContent.pending, (state, action) => {
        // console.log("pending...");
        const fetchingContentType = state.fetchingContentType;
        const fetchingPageNumber =
          state[fetchingContentType].fetchingPageNumber;

        state[fetchingContentType].pages[fetchingPageNumber].status =
          contentsStatus.fetching;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        // console.log("fulfilled...");
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

        for (const entityId in entities) {
          state[fetchingContentType].entities[entityId] = entityId;
        }
        // state[fetchingContentType].pages[fetchingPageNumber].entities =
        //   Object.keys(entities);

        // if (Object.keys(entities).length === 0)
        //   state[fetchingContentType].pages[fetchingPageNumber].status =
        //     contentsStatus.notFound;
        // else
        state[fetchingContentType].pages[fetchingPageNumber].status =
          contentsStatus.idle;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        // console.log("rejected...");
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
  resetContent,
  likeBlog,
  unLikeBlog,
  commentOnBlog,
  viewBlog,
  addBlogToFavouritesContent,
  removeBlogFromFavouritesContent,
} = contentSlice.actions;
export const contentSliceReducer = contentSlice.reducer;
