import { initRouter } from "./utils/Router.js";
import { sessionAuthentication } from "./utils/apiHandler.js";
import { getCookie } from "./utils/cookieHandler.js";
import { dispatch } from "./state/store.js";
import Main from "./components/main/Main.js";
import Login from "./components/login/Login.js";
import Language from "./components/language/Language.js";
import Mypage from "./components/mypage/Mypage.js";
import "./scss/style.scss";

const routes = [
  { path: "/", page: Main },
  { path: "/login", page: Login },
  { path: "/language", page: Language },
  { path: "/mypage", page: Mypage },
];

const $app = document.querySelector("#app");
const $header = document.createElement("header");
const $main = document.createElement("main");
const $footer = document.createElement("footer");

$app.append($header);
$app.append($main);
$app.append($footer);

$header.id = "header";
$main.id = "main";
$footer.id = "footer";

const languageId = getCookie("languageId");
if (languageId) {
  dispatch("languageId", languageId);
  document.documentElement.lang = languageId;
}

const $state = {};

sessionAuthentication(
  () => {
    dispatch("isLoggedIn", true);
    initRouter({ $app, routes, $state });
  },
  () => {
    dispatch("isLoggedIn", false);
    initRouter({ $app, routes, $state });
  }
);
