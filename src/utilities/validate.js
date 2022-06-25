export const validateEmail = function (email) {
  return email === "" || email.includes("@") === false ? false : true;
};

export const validatePassword = function (password) {
  return password.length < 8 ? false : true;
};

export const validateName = function (name) {
  return name.length === 0 ? false : true;
};

export const validateImage = function (image) {
  // console.log(image);

  if (
    !image ||
    (image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg")
  )
    return false;
  return true;
};

export const validateInputText = function (inputText) {
  return inputText.length === 0 ? false : true;
};
