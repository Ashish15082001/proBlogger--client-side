import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtKey, userIdKey, serverDomain } from "../../../constants";

export const fetchContent = createAsyncThunk(
  "blogs/fetch",
  async ({ contentType, pageNumber }) => {
    try {
      const contentTypePlaceHolder =
        contentType === "blogsContent"
          ? "blogs"
          : contentType === "trendingContent"
          ? "trending"
          : contentType === "favouritesContent"
          ? "favourites"
          : contentType === "myBlogsContent"
          ? "myBlogs"
          : "";

      let response;

      if (
        contentTypePlaceHolder === "blogs" ||
        contentTypePlaceHolder === "trending"
      ) {
        response = await fetch(
          `${serverDomain}${contentTypePlaceHolder}?pageNumber=${pageNumber}`
        );
      } else if (
        contentTypePlaceHolder === "favourites" ||
        contentTypePlaceHolder === "myBlogs"
      ) {
        response = await fetch(
          `${serverDomain}user/${localStorage.getItem(
            userIdKey
          )}/${contentTypePlaceHolder}?pageNumber=${pageNumber}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem(jwtKey),
            },
          }
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) throw new Error(responseData.message);

      const entities = responseData.entities;
      const totalDocuments = responseData.totalDocuments;

      return Promise.resolve({ entities, isError: false, totalDocuments });
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
