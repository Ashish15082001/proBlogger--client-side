import { jwtKey, userIdKey } from "../constants";

export const loginUser = async function (userData) {
  try {
    const response = await fetch(`http://localhost:3001/logIn`, {
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
