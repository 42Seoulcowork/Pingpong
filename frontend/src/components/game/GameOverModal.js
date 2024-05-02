import Component from "../Component.js";
import { gameOver } from "../../utils/languagePack.js";
import { getState } from "../../state/store.js";
import { router } from "../../utils/Router.js";

export default class GameOverModal extends Component {
  template() {
    const languageId = getState().languageId;

    return `
    <div class="modal fade" id="gameOverModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3 p-2 nanum-gothic-bold">${gameOver[languageId].gameOver}</h1>
          </div>
          <div class="modal-body">
            <p class="fs-3 p-2 m-1" id="gameOverDescription">${gameOver[languageId].left}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-lg" id="gameOverButton">${gameOver[languageId].closeButton}</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#gameOverButton", () => {
      router.push("/");
    });
  }
}
