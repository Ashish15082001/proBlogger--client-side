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

export const validateURL = function (str) {
  let regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
};
