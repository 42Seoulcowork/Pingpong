import Component from "../Component.js";
import { languageSelector } from "../../utils/languagePack.js";
import { setLanguage } from "../../utils/cookieHandler.js";
import { headerLanguageChanger } from "../header/headerHandler.js";
import { router } from "../../utils/Router.js";

export default class Language extends Component {
  template() {
    const languageId = this.store.getState().languageId;

    return `
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
      headerLanguageChanger("en");
      router.push("/language");
    });
    this.addEvent("click", "#koreanButton", () => {
      setLanguage("languageId", "ko", 3, this.store);
      headerLanguageChanger("ko");
      router.push("/language");
    });
    this.addEvent("click", "#frenchButton", () => {
      setLanguage("languageId", "fr", 3, this.store);
      headerLanguageChanger("fr");
      router.push("/language");
    });
  }
}
