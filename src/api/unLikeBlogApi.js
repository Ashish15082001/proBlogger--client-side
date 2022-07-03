import { jwtKey, serverDomain } from "../constants";

export const unLikeBlogApi = async function (dataObject) {
  try {
    const jwt = localStorage.getItem(jwtKey);
    if (!jwt) throw new Error("jason web token does not exists.");

    const response = await fetch(`${serverDomain}unLikeBlog`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject),
    });

    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message);

    return Promise.resolve(responseData);
  } catch (error) {
    return Promise.reject(error);
  }
};
