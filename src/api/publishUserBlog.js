import { jwtKey, userIdKey } from "../constants";

export const publishUserBlog = async function (blogData) {
  try {
    const userId = localStorage.getItem(userIdKey);
    const token = localStorage.getItem(jwtKey);

    const response = await fetch(
      `http://localhost:3001/user/${userId}/publishBlog`,
      {
        method: "POST",
        body: blogData,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);

    return Promise.resolve(responseData);
  } catch (error) {
    return Promise.reject(error.message);
  }
};
