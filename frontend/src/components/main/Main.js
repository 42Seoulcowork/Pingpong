import Header from "../header/Header.js";
import Component from "../Component.js";
import GameSettingModal from "../game/GameSettingModal.js";
import { gameModeCard } from "../../utils/languagePack.js";
import { router } from "../../utils/Router.js";
import { dispatch, getState } from "../../state/store.js";

export default class Main extends Component {
  didMount() {
    dispatch("newGame", false);

    const headerFlag = document.getElementById("header").childElementCount;
    if (headerFlag === 0) {
      const $header = document.getElementById("header");
      new Header($header, this.state);
    }

    const $gameSettingModal = this.target.querySelector(
      "#gameSettingModalWrapper"
    );
    new GameSettingModal($gameSettingModal, this.state);
  }

  template() {
    const languageId = getState().languageId;

    const loginStatus = getState().isLoggedIn;
    if (loginStatus === false) {
      router.push("/login");
      throw "PassThrough";
    }

    return `
    <div id="main-page">
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
    <div id="gameSettingModalWrapper"></div>
    `;
  }

  setEvent() {
    const nicknameLine = document.getElementById("nicknameLine");

    this.addEvent("click", "#localGameChoiceButton", () => {
      dispatch("gameMode", "local");
      dispatch("newGame", true);
      nicknameLine.hidden = true;
    });
    this.addEvent("click", "#remoteGameChoiceButton", () => {
      dispatch("gameMode", "remote");
      dispatch("newGame", true);
      nicknameLine.hidden = false;
    });
    this.addEvent("click", "#tournamentGameChoiceButton", () => {
      dispatch("gameMode", "tournament");
      dispatch("newGame", true);
      nicknameLine.hidden = false;
    });
  }
}
