import { jwtKey, serverDomain } from "../constants";

export const removeBlogFromFavouritesApi = async function (dataObject) {
  try {
    const { userId, blogId } = dataObject;
    const jwt = localStorage.getItem(jwtKey);
    const response = await fetch(
      `${serverDomain}user/${userId}/blog/${blogId}/removeBlogFromFavourites`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/json",
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
