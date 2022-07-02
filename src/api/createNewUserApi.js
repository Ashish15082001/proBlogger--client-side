import { jwtKey, userIdKey, serverDomain } from "../constants";

export const createNewUserApi = async function (userData) {
  try {
    const response = await fetch(`${serverDomain}signUp`, {
      method: "POST",
      body: userData,
    });

    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message);
    console.log(responseData);
    const jwt = responseData.token;
    const userId = responseData.credentials._id;

    localStorage.setItem(jwtKey, jwt);
    localStorage.setItem(userIdKey, userId);

    return Promise.resolve(responseData.credentials);
  } catch (error) {
    return Promise.reject(error);
  }
};
