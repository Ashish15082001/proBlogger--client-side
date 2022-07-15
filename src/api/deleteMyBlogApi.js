import { jwtKey, serverDomain } from "../constants";

export const deleteMyBlogApi = async function ({ userId, blogId }) {
  try {
    const jwt = localStorage.getItem(jwtKey);
    if (!jwt) throw new Error("jason web token does not exists.");

    const response = await fetch(
      `${serverDomain}user/${userId}/deleteMyBlog/${blogId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message);

    return Promise.resolve(responseData);
  } catch (error) {
    return Promise.reject(error);
  }
};
