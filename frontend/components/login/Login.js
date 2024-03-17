import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { loginButton } from "../../utils/languagePack.js";
export default class Login extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, this.store);
  }

  template() {
    const loginStatus = this.store.getState().isLoggedIn;
    const languageId = this.store.getState().languageId;
    const OAuth_URL =
      "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b8ee714debb1a7c3febef1c78bc4eacb56043624455068279b88fe88c991c42e&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Foauth&response_type=code";

    if (loginStatus === false) {
      return `
      <header></header>
      <div class='d-flex flex-column align-items-center justify-content-center' style="height: 100vh;">
        <div class='login-page'>
          <div class="language-selector text-center">
            <h2 class="mb-3">${loginButton[languageId].loginDescription}</h2>
              <div class="d-grid gap-2 justify-content-center" role="group">
                <div class="btn btn-dark text-white" role="button" id="loginButton" style="width: 15rem; height: 10rem;">
                    <img src="static/42_logo.svg" class="mr-2 align-middle" alt="42_logo">
                </div>
              </div>
          </div>
        </div>
      </div>
      `;
    } else {
      router.push("/");
    }
  }

  setEvent() {
    this.addEvent("click", "#loginButton", () => {
      this.store.dispatch("isLoggedIn", true);
      router.push("/");
    });
  }
}
