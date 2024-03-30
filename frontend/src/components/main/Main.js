import Header from "../header/Header.js";
import Component from "../Component.js";
import GameSettingModal from "../game/GameSettingModal.js";
import Mainpage from "./Mainpage.js";
import { sessionAuthentication } from "../../utils/apiHandler.js";
import { getCookie } from "../../utils/cookieHandler.js";
import { router } from "../../utils/Router.js";
import { logoutButtonHandler } from "../header/headerHandler.js";

export default class Main extends Component {
  didMount() {
    const $header = document.getElementById("header");
    new Header($header, this.store);

    sessionAuthentication(
      () => {
        this.store.dispatch("isLoggedIn", true);
        logoutButtonHandler(this.store);
        const $mainpage = this.target.querySelector("#main-page");
        new Mainpage($mainpage, this.store);
        this.afterEvent();
      },
      () => {
        this.store.dispatch("isLoggedIn", false);
        logoutButtonHandler(this.store);
        router.push("/login");
      }
    );

    const $gameSettingModal = this.target.querySelector(
      "#gameSettingModalWrapper"
    );
    new GameSettingModal($gameSettingModal, this.store);
  }

  template() {
    const lastLanguageId = getCookie("languageId");
    if (lastLanguageId) {
      this.store.dispatch("languageId", lastLanguageId);
      document.documentElement.lang = lastLanguageId;
    }

    return `
    <div id="main-page"></div>
    <div id="gameSettingModalWrapper"></div>
    `;
  }

  afterEvent() {
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
