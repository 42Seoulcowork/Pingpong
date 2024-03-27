import Header from "../header/Header.js";
import Component from "../Component.js";
import GameSettingModal from "../game/GameSettingModal.js";
import { router } from "../../utils/Router.js";
import { gameModeCard } from "../../utils/languagePack.js";
import { sessionAuthentication } from "../../utils/apiHandler.js";
import { getCookie } from "../../utils/cookieHandler.js";

export default class Main extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, this.store);

    const $gameSettingModal = this.target.querySelector(
      "#gameSettingModalDoor"
    );
    new GameSettingModal($gameSettingModal, this.store);
  }

  template() {
    const lastLanguageId = getCookie("languageId");
    if (lastLanguageId) {
      this.store.dispatch("languageId", lastLanguageId);
      document.documentElement.lang = lastLanguageId;
    }
    const languageId = this.store.getState().languageId;

    sessionAuthentication(this.store);
    const loginStatus = this.store.getState().isLoggedIn;
    if (loginStatus === false) {
      router.push("/login");
      throw "PassThrough";
    }

    return `
    <div class="main-page">
      <header></header>
      <div
        class="d-flex flex-column align-items-center justify-content-center"
        style="height: 100vh"
      >
        <div class="language-selector text-center">
          <h2 class="mb-4 fs-1 nanum-gothic-bold">
            ${gameModeCard[languageId].play}
          </h2>
          <div class="row justify-content-center">
            <div class="card m-2" style="width: 15rem">
              <div class="card-body">
                <h5 class="card-title fs-4 mb-2 nanum-gothic-bold">
                  ${gameModeCard[languageId].Local}
                </h5>
                <p class="card-text text-start">
                  ${gameModeCard[languageId].LocalDescription}
                </p>
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-info d-grid gap-2 btn-lg"
                    id="localGameChoiceButton"
                    data-bs-toggle="modal"
                    data-bs-target="#gameSettingModal"
                  >
                    ${gameModeCard[languageId].start}
                  </button>
                </div>
              </div>
            </div>
            <div class="card m-2" style="width: 15rem">
              <div class="card-body">
                <h5 class="card-title fs-4 mb-2 nanum-gothic-bold">
                  ${gameModeCard[languageId].Remote}
                </h5>
                <p class="card-text text-start">
                  ${gameModeCard[languageId].RemoteDescription}
                </p>
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-warning d-grid gap-2 btn-lg"
                    id="remoteGameChoiceButton"
                    data-bs-toggle="modal"
                    data-bs-target="#gameSettingModal"
                  >
                    ${gameModeCard[languageId].start}
                  </button>
                </div>
              </div>
            </div>
            <div class="card m-2" style="width: 15rem">
              <div class="card-body">
                <h5 class="card-title fs-4 mb-2 nanum-gothic-bold">
                  ${gameModeCard[languageId].Tournament}
                </h5>
                <p class="card-text text-start">
                  ${gameModeCard[languageId].TournamentDescription}
                </p>
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-dark d-grid gap-2 btn-lg"
                    id="tournamentGameChoiceButton"
                    data-bs-toggle="modal"
                    data-bs-target="#gameSettingModal"
                  >
                    ${gameModeCard[languageId].start}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="gameSettingModalDoor"></div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#localGameChoiceButton", () => {
      this.store.dispatch("gameMode", "local");
    });
    this.addEvent("click", "#remoteGameChoiceButton", () => {
      this.store.dispatch("gameMode", "remote");
    });
    this.addEvent("click", "#tournamentGameChoiceButton", () => {
      this.store.dispatch("gameMode", "tournament");
    });
  }
}
