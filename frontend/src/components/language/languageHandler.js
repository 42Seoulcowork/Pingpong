import { dispatch } from "../../state/store.js";
import { setCookie } from "../../utils/cookieHandler.js";
import {
  languageSelector,
  mypageButton,
  logoutButton,
} from "../../utils/languagePack.js";

const headerHTMLChanger = (languageId) => {
  const $header = document.getElementById("header");

  $header.querySelector("#languageHeader").innerHTML =
    languageSelector[languageId].language;
  $header.querySelector("#mypageHeader").innerHTML =
    mypageButton[languageId].mypage;
  $header.querySelector("#logoutHeader").innerHTML =
    logoutButton[languageId].logoutDescription;
};

const languageHTMLChanger = (languageId) => {
  const $languageSelector = document.querySelector("#language-selector");

  $languageSelector.innerHTML = languageSelector[languageId].selectLanguage;
};

export const languageChanger = (languageId) => {
  document.documentElement.lang = languageId;
  dispatch("languageId", languageId);
  setCookie("languageId", languageId, 3);
  headerHTMLChanger(languageId);
  languageHTMLChanger(languageId);
};
