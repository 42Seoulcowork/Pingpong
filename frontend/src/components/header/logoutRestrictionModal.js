import Component from "../Component.js";
import { logoutButton } from "../../utils/languagePack.js";
import { getState } from "../../state/store.js";

export default class logoutRestrictionModal extends Component {
  template() {
    const languageId = getState().languageId;

    return `
    <div class="modal" id="logoutRestrictionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3 p-3 nanum-gothic-bold" id="staticBackdropLabel">${logoutButton[languageId].logoutRestriction}</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-lg" data-bs-dismiss="modal" id="logoutFailedButton">${logoutButton[languageId].confirm}</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
