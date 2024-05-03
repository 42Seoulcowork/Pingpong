import Component from "../Component.js";
import GameRestrictionModal from "./GameRestrictionModal.js";
import GameWaitingModal from "./GameWaitingModal.js";
import GameOverModal from "./GameOverModal.js";
import { pingpong } from "./pingpong.js";
import { socketHandler } from "./gameEventHandler.js";
import { gameBoard } from "../../utils/languagePack.js";
import { router } from "../../utils/Router.js";
import { modalInit } from "../../utils/modalHandler.js";
import { getState, dispatch } from "../../state/store.js";

export default class Game extends Component {
  didMount() {
    if (getState().newGame === false) {
      const $gameRestriction = document.getElementById("gameRestriction");
      new GameRestrictionModal($gameRestriction, this.state);
      modalInit("gameRestrictionModal", ["unpreparedButton"]);

      throw "PassThrough";
    }

    const headerFlag = document.getElementById("header").childElementCount;
    if (headerFlag !== 0) {
      const $header = document.getElementById("header");
      $header.innerHTML = "";
    }

    const $gameWaiting = document.getElementById("gameWaiting");
    new GameWaitingModal($gameWaiting, this.state);

    const $gameOver = document.getElementById("gameOver");
    new GameOverModal($gameOver, this.state);
  }

  template() {
    const languageId = getState().languageId;

    const loginStatus = getState().isLoggedIn;
    if (loginStatus === false) {
      router.push("/login");
      throw "PassThrough";
    } else if (getState().newGame === false) {
      return `
      <div id="gameRestriction"></div>
      `;
    }

    return `
    <div id="container">
      <div class="fixed-top d-flex align-items-center justify-content-center">
        <div
          class="card border-dark text-bg-light mt-2 fs-4 flex-fill"
          style="max-width: 18rem"
        >
          <div class="card-header text-bg-dark border-dark nanum-gothic-bold text-center">${gameBoard[languageId].score}</div>
          <div class="card-body row p-2">
            <div class="col">
              <p class="card-text fs-6 py-1 mb-2 text-center" id="player1name">${gameBoard[languageId].player1}</p>
              <p class="card-text fs-5 text-center nanum-gothic-bold" id="player1score">0</p>
            </div>
            <div class="col">
              <p class="card-text fs-6 py-1 mb-2 text-center" id="player2name">${gameBoard[languageId].player2}</p>
              <p class="card-text fs-5 text-center nanum-gothic-bold" id="player2score">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="gameWaiting"></div>
    <div id="gameOver"></div>
    `;
  }

  setEvent() {
    const [openModal, closeModal] = modalInit("gameWaitingModal", [
      "gameWaitingCloseButton",
    ]);

    pingpong();
    socketHandler(openModal, closeModal);
    dispatch("newGame", false);
  }
}
