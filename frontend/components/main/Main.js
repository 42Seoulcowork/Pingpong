import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { gameModeCard } from "../../utils/languagePack.js";

export default class Main extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, this.store);
  }

  template() {
    const languageId = this.store.obj.languageId;

    // if (this.store.Islogin) {
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
                    <p class="card-text">${gameModeCard[languageId].RemoteDescription}</p>
                    <a href="#" class="btn btn-outline-success d-grid gap-2">${gameModeCard[languageId].start}</a>
                  </div>
                </div>
                <div class="card m-2" style="width: 15rem;">
                  <div class="card-body">
                    <h5 class="card-title">${gameModeCard[languageId].Tournament}</h5>
                    <p class="card-text">${gameModeCard[languageId].TournamentDescription}</p>
                    <a href="#" class="btn btn-outline-info d-grid gap-2">${gameModeCard[languageId].start}</a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    `;
    // } else {
    //   router.push("/login");
    // }
  }
}
