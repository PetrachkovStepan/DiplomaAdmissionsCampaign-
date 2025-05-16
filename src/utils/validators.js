export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateSpecCode = (code) => {
  if (String(code).length > 15 || String(code).length < 8) {
    return null;
  }
  return String(code)
    .toLowerCase()
    .match(/^(\d{1,2}(-\d{2})*)$/);
};
export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\+375\d{9}$/;
  return regex.test(phoneNumber);
};
export const validateInteger = (input) => {
  const regex = /^[1-9]\d*$/;
  return regex.test(input);
};
