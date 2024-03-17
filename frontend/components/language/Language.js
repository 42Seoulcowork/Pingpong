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
    const languageId = this.store.obj.languageId;

    return `
    <header></header>
    <div class='d-flex flex-column align-items-center justify-content-center' style="height: 100vh;">
      <div class='language-page'>
        <div class="language-selector text-center">
          <h2 class="mb-3">${languageSelector[languageId].selectLanguage}</h2>
            <div class="d-grid gap-2 d-md-block" role="group">
                <button type="button" class="btn btn-outline-dark" id="englishButton">English</button>
                <button type="button" class="btn btn-outline-primary" id="koreanButton">한국어</button>
                <button type="button" class="btn btn-outline-info" id="frenchButton">Français</button>
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
      this.store.obj.languageId = "en";
      this.setCookie("languageId", "en", 3);
      this.mount();
    });
    this.addEvent("click", "#koreanButton", () => {
      this.store.obj.languageId = "ko";
      this.setCookie("languageId", "ko", 3);
      this.mount();
    });
    this.addEvent("click", "#frenchButton", () => {
      this.store.obj.languageId = "fr";
      this.setCookie("languageId", "fr", 3);
      this.mount();
    });
  }
}
