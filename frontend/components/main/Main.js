import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { gameModeCard } from "../../utils/languagePack.js";

export default class Main extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, this.store);
  }

  getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === encodeURIComponent(name)) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }

  template() {
    if (this.getCookie("languageId") != null) {
      this.store.dispatch("languageId", this.getCookie("languageId"));
    }

    const loginStatus = this.store.getState().isLoggedIn;
    const languageId = this.store.getState().languageId;

    if (loginStatus === true) {
      return `
      <div class='main-page'>
        <header></header>
        <div class='d-flex flex-column align-items-center justify-content-center' style="height: 100vh;">
          <div class="language-selector text-center">
            <h2 class="mb-4">${gameModeCard[languageId].play}</h2>
              <div class="row justify-content-center">
                <div class="card m-2" style="width: 15rem;">
                  <div class="card-body">
                    <h5 class="card-title">${gameModeCard[languageId].Local}</h5>
                    <p class="card-text text-start">${gameModeCard[languageId].LocalDescription}</p>
                    <a href="#" class="btn btn-outline-danger d-grid gap-2">${gameModeCard[languageId].start}</a>
                  </div>
                </div>
                <div class="card m-2" style="width: 15rem;">
                  <div class="card-body">
                    <h5 class="card-title">${gameModeCard[languageId].Remote}</h5>
                    <p class="card-text text-start">${gameModeCard[languageId].RemoteDescription}</p>
                    <a href="#" class="btn btn-outline-success d-grid gap-2">${gameModeCard[languageId].start}</a>
                  </div>
                </div>
                <div class="card m-2" style="width: 15rem;">
                  <div class="card-body">
                    <h5 class="card-title">${gameModeCard[languageId].Tournament}</h5>
                    <p class="card-text text-start">${gameModeCard[languageId].TournamentDescription}</p>
                    <a href="#" class="btn btn-outline-info d-grid gap-2">${gameModeCard[languageId].start}</a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    `;
    } else {
      router.push("/login");
    }
  }
}
