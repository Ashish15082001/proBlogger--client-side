import { jwtKey, serverDomain, userIdKey } from "../constants";

export const publishBlogApi = async function (blogData) {
  try {
    const userId = localStorage.getItem(userIdKey);
    const token = localStorage.getItem(jwtKey);

    const response = await fetch(`${serverDomain}user/${userId}/publishBlog`, {
      method: "POST",
      body: JSON.stringify(blogData),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);

    return Promise.resolve(responseData);
  } catch (error) {
    return Promise.reject(error.message);
  }
};
