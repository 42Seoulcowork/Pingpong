export const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === encodeURIComponent(name)) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
};

export const setCookie = (name, value, daysToExpire) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";
  document.cookie = cookieValue;
};

export const setLanguage = (name, value, daysToExpire, store) => {
  store.dispatch("languageId", value);
  setCookie(name, value, daysToExpire);
  document.documentElement.lang = value;
};
