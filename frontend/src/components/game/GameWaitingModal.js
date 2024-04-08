import Component from "../Component.js";
import { gameWaitingModal } from "../../utils/languagePack.js";
import { getState } from "../../state/store.js";
import { router } from "../../utils/Router.js";

export default class GameWaitingModal extends Component {
  template() {
    const languageId = getState().languageId;

    return `
    <div class="modal" id="gameWaitingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3 p-2 nanum-gothic-bold">${gameWaitingModal[languageId].waiting}</h1>
          </div>
          <div class="modal-body">
            <p class="fs-3 p-2 m-1">${gameWaitingModal[languageId].description}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-lg" data-bs-dismiss="modal" id="gameWaitingButton">${gameWaitingModal[languageId].cancel}</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#gameWaitingButton", () => {
      router.push("/");
    });
  }
}
