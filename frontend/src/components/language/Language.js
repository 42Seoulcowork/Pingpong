import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { languageSelector } from "../../utils/languagePack.js";
import { setLanguage } from "../../utils/cookieHandler.js";

export default class Main extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, this.store);
  }

  template() {
    const languageId = this.store.getState().languageId;

    return `
    <header></header>
    <div class='d-flex flex-column align-items-center justify-content-center' style="height: 100vh;">
      <div class='language-page'>
        <div class="language-selector text-center">
          <h2 class="mb-4 fs-1 nanum-gothic-bold">${languageSelector[languageId].selectLanguage}</h2>
            <div class="d-grid gap-2 d-md-block" role="group">
                <button type="button" class="btn btn-outline-info fs-4 m-1 btn-lg" id="englishButton">English</button>
                <button type="button" class="btn btn-outline-warning fs-4 m-1 btn-lg" id="koreanButton">한국어</button>
                <button type="button" class="btn btn-outline-dark fs-4 m-1 btn-lg" id="frenchButton">Français</button>
            </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#englishButton", () => {
      setLanguage("languageId", "en", 3, this.store);
      this.mount();
    });
    this.addEvent("click", "#koreanButton", () => {
      setLanguage("languageId", "ko", 3, this.store);
      this.mount();
    });
    this.addEvent("click", "#frenchButton", () => {
      setLanguage("languageId", "fr", 3, this.store);
      this.mount();
    });
  }
}
