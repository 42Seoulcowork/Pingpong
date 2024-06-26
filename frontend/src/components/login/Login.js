import Component from "../Component.js";
import Header from "../header/Header.js";
import { router } from "../../utils/Router.js";
import { loginButton } from "../../utils/languagePack.js";
import { getState } from "../../state/store.js";
import Logo from "../../../public/42_logo.svg";

export default class Login extends Component {
  didMount() {
    const headerFlag = document.getElementById("header").childElementCount;
    if (headerFlag === 0) {
      const $header = document.getElementById("header");
      new Header($header, this.state);
    }
  }

  template() {
    const languageId = getState().languageId;
    const SERVER_URL = window.location.hostname;
    const OAuth_URL =
      import.meta.env.VITE_OAUTH_URL_1 +
      SERVER_URL +
      import.meta.env.VITE_OAUTH_URL_2;
    const loginStatus = getState().isLoggedIn;
    if (loginStatus === true) {
      router.push("/");
      throw "PassThrough";
    }

    return `
    <div class='d-flex flex-column align-items-center justify-content-center' style="height: 100vh;">
      <div class='login-page'>
        <div class="language-selector text-center">
          <h2 class="mb-4 fs-1 nanum-gothic-bold">${loginButton[languageId].loginDescription}</h2>
            <div class="d-grid gap-2 justify-content-center" role="group">
              <a href="${OAuth_URL}" class="btn btn-dark text-white" role="button" id="loginButton" style="width: 15rem; height: 10rem;">
                  <img src="${Logo}" class="mr-2 align-middle" alt="42_logo">
              </a>
            </div>
        </div>
      </div>
    </div>
    `;
  }
}
