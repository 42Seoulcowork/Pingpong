import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { languageSelector } from "../../utils/languagePack.js";

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

  setCookie(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    const cookieValue =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
    document.cookie = cookieValue;
  }

  setEvent() {
    this.addEvent("click", "#englishButton", () => {
      this.store.dispatch("languageId", "en");
      this.setCookie("languageId", "en", 3);
      document.documentElement.lang = "en";
      this.mount();
    });
    this.addEvent("click", "#koreanButton", () => {
      this.store.dispatch("languageId", "ko");
      this.setCookie("languageId", "ko", 3);
      document.documentElement.lang = "ko";
      this.mount();
    });
    this.addEvent("click", "#frenchButton", () => {
      this.store.dispatch("languageId", "fr");
      this.setCookie("languageId", "fr", 3);
      document.documentElement.lang = "fr";
      this.mount();
    });
  }
}
