import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { dispatch, getState } from "../../state/store.js";
import { gameSettingCard } from "../../utils/languagePack.js";
import * as bootstrap from "bootstrap";

export default class GameSettingModal extends Component {
  template() {
    const languageId = getState().languageId;

    return `
    <div class="modal fade" id="gameSettingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
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
                    <input class="form-check-input" type="radio" name="appearance" value="day" id="dayMode" checked>
                    <label class="form-check-label" for="dayMode">
                      ${gameSettingCard[languageId].dayMode}
                    </label>
                  </div>
                  <div class="form-check col mx-3">
                    <input class="form-check-input" type="radio" name="appearance" value="night" id="nightMode">
                    <label class="form-check-label" for="nightMode">
                      ${gameSettingCard[languageId].nightMode}
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
              <button type="submit" class="btn btn-outline-info px-4" data-bs-dismiss="modal" id="gamebutton">${gameSettingCard[languageId].start}</button>
              <button type="button" class="btn btn-outline-warning px-4" data-bs-dismiss="modal">${gameSettingCard[languageId].close}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal fade" id="specialCharacterModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3 p-3 nanum-gothic-bold">${gameSettingCard[languageId].specialCharacter}</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark btn-lg" data-bs-dismiss="modal">${gameSettingCard[languageId].confirm}</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  setEvent() {
    const form = this.target.querySelector("#gameSettingForm");

    this.addEvent("submit", "#gameSettingForm", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
      if (regExp.test(formData.get("nickname"))) {
        const $special = document.getElementById("specialCharacterModal");
        const modal = new bootstrap.Modal($special);
        modal.show();
        return;
      }

      formData.forEach((value, key) => dispatch(key, value));

      router.push("/game");
    });
  }
}
