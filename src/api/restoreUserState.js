import { jwtKey, userIdKey, serverDomain } from "../constants";

export const restoreUserState = async function () {
  try {
    const jwt = localStorage.getItem(jwtKey);

    if (!jwt) throw new Error("jason web token does not exists.");
    const userId = localStorage.getItem(userIdKey);
    const response = await fetch(`${serverDomain}userData?id=${userId}`, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
      method: "GET",
    });

    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message);

    return Promise.resolve(responseData.user);
  } catch (error) {
    return Promise.reject(error);
  }
};
