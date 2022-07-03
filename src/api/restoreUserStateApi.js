import { jwtKey, userIdKey, serverDomain } from "../constants";

export const restoreUserStateApi = async function () {
  try {
    const jwt = localStorage.getItem(jwtKey);
    const userId = localStorage.getItem(userIdKey);

    if (!jwt) throw new Error("jason web token does not exists.");
    if (!userId) throw new Error("userId does not exists.");

    const response = await fetch(`${serverDomain}user/${userId}/data`, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
      method: "GET",
    });

    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message);

    return Promise.resolve({
      credentials: responseData.credentials,
      statistics: responseData.statistics,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
