import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { gameSettingCard } from "../../utils/languagePack.js";

export default class GameSettingModal extends Component {
  template() {
    const languageId = this.store.getState().languageId;

    return `
    <div class="modal fade" id="gameSettingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gameSettingModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-2 nanum-gothic-bold">${gameSettingCard[languageId].setting}</h1>
          </div>
          <form id="gameSettingForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="nickname" class="form-label">${gameSettingCard[languageId].nickname}</label>
                <div class="row">
                  <div class="col">
                    <input type="text" class="form-control" name="nickname" id="nickname" placeholder="your nickname" required maxlength="10">
                  </div>
                  <div class="col"></div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">${gameSettingCard[languageId].difficulty}</label>
                <div class="row">
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="difficulty" value="easy" id="easyMode" checked>
                    <label class="form-check-label" for="easyMode">
                      ${gameSettingCard[languageId].easyMode}
                    </label>
                  </div>
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="difficulty" value="hard" id="hardMode">
                    <label class="form-check-label" for="hardMode">
                      ${gameSettingCard[languageId].hardMode}
                    </label>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">${gameSettingCard[languageId].appearance}</label>
                <div class="row">
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="appearance" value="light" id="lightMode" checked>
                    <label class="form-check-label" for="lightMode">
                      ${gameSettingCard[languageId].lightMode}
                    </label>
                  </div>
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="appearance" value="dark" id="darkMode">
                    <label class="form-check-label" for="hardMode">
                      ${gameSettingCard[languageId].darkMode}
                    </label>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">${gameSettingCard[languageId].ballColor}</label>
                <div class="row">
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="ballColor" value="red" id="redColor" checked>
                    <label class="form-check-label" for="redColor">
                      ${gameSettingCard[languageId].red}
                    </label>
                  </div>
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="ballColor" value="yellow" id="yellowColor">
                    <label class="form-check-label" for="yellowColor">
                      ${gameSettingCard[languageId].yellow}
                    </label>
                  </div>
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="ballColor" value="purple" id="purpleColor">
                    <label class="form-check-label" for="purpleColor">
                      ${gameSettingCard[languageId].purple}
                    </label>
                  </div>
                </div>
              </div>        
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-outline-info px-4" id="gamebutton">${gameSettingCard[languageId].start}</button>
              <button type="button" class="btn btn-outline-warning px-4" data-bs-dismiss="modal">${gameSettingCard[languageId].close}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("submit", "#gameSettingForm", () => {
      console.log("submit");
    });
  }
}
