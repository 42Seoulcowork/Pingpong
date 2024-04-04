import Component from "../Component.js";
import Header from "../header/Header.js";
import { languageSelector } from "../../utils/languagePack.js";
import { getState } from "../../state/store.js";
import { languageChanger } from "./languageHandler.js";

export default class Language extends Component {
  didMount() {
    const headerFlag = document.getElementById("header").childElementCount;
    if (headerFlag === 0) {
      const $header = document.getElementById("header");
      new Header($header, this.state);
    }
  }

  template() {
    const languageId = getState().languageId;

    return `
    <div class='d-flex flex-column align-items-center justify-content-center' style="height: 100vh;">
      <div class='language-page'>
        <div class="text-center">
          <h2 class="mb-4 fs-1 nanum-gothic-bold" id="language-selector">${languageSelector[languageId].selectLanguage}</h2>
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
      languageChanger("en");
    });
    this.addEvent("click", "#koreanButton", () => {
      languageChanger("ko");
    });
    this.addEvent("click", "#frenchButton", () => {
      languageChanger("fr");
    });
  }
}
