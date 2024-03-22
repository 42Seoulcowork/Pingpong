import { initRouter } from "./utils/Router.js";
import Store from "./state/Store.js";
import Main from "./components/main/Main.js";
import Login from "./components/login/Login.js";
import Language from "./components/language/Language.js";
import Mypage from "./components/mypage/Mypage.js";
import Component from "./components/Component.js";
import "./scss/style.scss";

const routes = [
  { path: "/", page: Main },
  { path: "/login", page: Login },
  { path: "/language", page: Language },
  { path: "/mypage", page: Mypage },
];

const $app = document.querySelector("#app");

const $store = new Store();

initRouter({ $app, routes, $store });
