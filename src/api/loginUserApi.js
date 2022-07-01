import { jwtKey, userIdKey, serverDomain } from "../constants";

export const loginUserApi = async function (userData) {
  try {
    const response = await fetch(`${serverDomain}logIn`, {
      method: "POST",
      body: userData,
    });

    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message);

    const jwt = responseData.token;
    const userId = responseData.user._id;

    localStorage.setItem(jwtKey, jwt);
    localStorage.setItem(userIdKey, userId);

    return Promise.resolve(responseData.user);
  } catch (error) {
    return Promise.reject(error);
  }
};
