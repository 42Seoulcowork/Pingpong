import Component from "../Component.js";
import { mypageCard } from "../../utils/languagePack.js";
import { getState } from "../../state/store.js";

export default class MypageHTML extends Component {
  template() {
    const languageId = getState().languageId;
    const intraID = getState().intraID;
    const numberOfWins = getState().numberOfWins;
    const numberOfLoses = getState().numberOfLoses;
    const numberOfPlays = numberOfWins + numberOfLoses;

    return `
    <div class="container">
      <div class="row">
        <div
          class="col-md-6 col-lg-6 offset-md-3 offset-lg-3 d-flex flex-column toppad align-items-center justify-content-center"
          style="height: 100vh"
        >
          <div class="card border shadow">
            <div class="card-header">
              <h3 class="card-title m-3 text-center nanum-gothic-bold">
                ${mypageCard[languageId].greet}&nbsp;${intraID}
              </h3>
            </div>
            <div class="card-body">
              <div>
                <table class="table table-user-information align-middle">
                  <tbody>
                    <tr>
                      <td>${mypageCard[languageId].numberOfWins}:</td>
                      <td>${numberOfWins}</td>
                    </tr>
                    <tr>
                      <td>${mypageCard[languageId].numberOfLoses}:</td>
                      <td>${numberOfLoses}</td>
                    </tr>
                    <tr>
                    <td>${mypageCard[languageId].numberOfPlays}:</td>
                    <td>${numberOfPlays}</td>
                  </tr>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
