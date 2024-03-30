import {
  mypageButton,
  languageSelector,
  logoutButton,
} from "../../utils/languagePack.js";

export const logoutButtonHandler = (store) => {
  const loginStatus = store.getState().isLoggedIn;
  const logoutHeader = document.querySelector("#logoutHeader");

  if (loginStatus === true) {
    logoutHeader.hidden = false;
  } else {
    logoutHeader.hidden = true;
  }
};

export const headerLanguageChanger = (languageId) => {
  const $header = document.getElementById("header");

  $header.querySelector("#languageHeader").innerHTML =
    languageSelector[languageId].language;
  $header.querySelector("#mypageHeader").innerHTML =
    mypageButton[languageId].mypage;
  $header.querySelector("#logoutHeader").innerHTML =
    logoutButton[languageId].logoutDescription;
};
