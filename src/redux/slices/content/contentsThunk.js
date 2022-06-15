import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrendingContent = createAsyncThunk(
  "trendingBlogsContent/fetch",
  async (pageNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3001/trending?pageNumber=${pageNumber}`
      );
      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      const entities = responseData.blogs.entities;
      const totalDocuments = responseData.totalDocuments;

      return { entities, isError: false, totalDocuments };
    } catch (error) {
      return { isError: true, error: error.message };
    }
  }
);

export const fetchBlogsContent = createAsyncThunk(
  "blogs/fetch",
  async (pageNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3001/blogs?pageNumber=${pageNumber}`
      );
      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      const entities = responseData.blogs.entities;
      const totalDocuments = responseData.totalDocuments;

      return { entities, isError: false, totalDocuments };
    } catch (error) {
      return { isError: true, error: error.message };
    }
  }
);
