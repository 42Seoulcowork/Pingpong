import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { mypageButton } from "../../utils/languagePack.js";

export default class mypageRestrictionModal extends Component {
  template() {
    const languageId = this.store.getState().languageId;

    return `
    <div class="modal fade" id="mypageRestrictionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mypageModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3 p-3 nanum-gothic-bold" id="staticBackdropLabel">${mypageButton[languageId].alert}</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-lg" data-bs-dismiss="modal" id="loginFirstButton">${mypageButton[languageId].confirm}</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#loginFirstButton", () => {
      router.push("/login");
    });
  }
}
