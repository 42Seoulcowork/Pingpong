import { initRouter } from "./utils/Router.js";
import Main from "./components/main/Main.js";
import Component from "./components/Component.js";
import Login from "./components/login/Login.js";

const routes = [
  { path: "/", page: Main },
  { path: "/login", page: Login },
];

const $app = document.querySelector("#app");

initRouter({ $app, routes });
