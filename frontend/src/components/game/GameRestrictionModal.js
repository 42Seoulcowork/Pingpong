import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { gameSettingCard } from "../../utils/languagePack.js";
import { getState } from "../../state/store.js";

export default class GameRestrictionModal extends Component {
  template() {
    const languageId = getState().languageId;

    return `
    <div class="modal fade" id="gameRestrictionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3 p-3 nanum-gothic-bold">${gameSettingCard[languageId].unprepared}</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-lg" id="unpreparedButton">${gameSettingCard[languageId].confirm}</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#unpreparedButton", () => {
      router.push("/");
    });
  }
}
