import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { loginButton } from "../../utils/languagePack.js";
import Logo from "../../../public/42_logo.svg";

export default class Login extends Component {
  didMount() {}

  template() {
    const languageId = this.store.getState().languageId;
    const OAuth_URL =
      "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b8ee714debb1a7c3febef1c78bc4eacb56043624455068279b88fe88c991c42e&redirect_uri=https%3A%2F%2F127.0.0.1%2Fapi%2Foauth&response_type=code";

    let loginStatus = this.store.getState().isLoggedIn;
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
