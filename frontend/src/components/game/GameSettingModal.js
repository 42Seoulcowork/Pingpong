import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { mypageButton } from "../../utils/languagePack.js";

export default class GameSettingModal extends Component {
  template() {
    const languageId = this.store.getState().languageId;

    return `
    <div class="modal fade" id="gameSettingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gameSettingModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-2 nanum-gothic-bold" id="staticBackdropLabel">만들어봅시다.</h1>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-lg" data-bs-dismiss="modal" id="gamebutton">게임의 선택</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#gamebutton", () => {
      router.push("/login");
    });
  }
}
