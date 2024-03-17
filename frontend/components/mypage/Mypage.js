import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import { mypageButton, mypageCard } from "../../utils/languagePack.js";

export default class Mypage extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, this.store);
  }

  template() {
    const loginStatus = this.store.getState().isLoggedIn;

    const languageId = this.store.getState().languageId;
    const alertMessage = mypageButton[languageId].alert;

    const intraID = this.store.getState().intraID;
    const nickname = this.store.getState().nickname;
    const numberOfWins = this.store.getState().numberOfWins;

    if (loginStatus === true) {
      return `
      <div class='mypage'>
        <header></header>
        <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-6 offset-md-3 offset-lg-3 d-flex flex-column toppad align-items-center justify-content-center" style="height: 100vh;">
            <div class="card border shadow">
              <div class="card-header">
                <h3 class="card-title m-3 text-center">${mypageCard[languageId].greet}&nbsp;${intraID}</h3>
              </div>
              <div class="card-body">
                  <div>
                    <table class="table table-user-information">
                      <tbody>
                        <tr>
                          <td>${mypageCard[languageId].nickname}:</td>
                          <td>${nickname}</td>
                        </tr>
                        <tr>
                          <td>${mypageCard[languageId].numberOfWins}:</td>
                          <td>${numberOfWins}</td>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </table>
                    <div class="row mx-1">
                      <a href="#" class="btn btn-outline-info col-auto me-auto">${mypageCard[languageId].gameRecord}</a>
                      <a href="#" class="btn btn-outline-warning col-auto ms-auto">${mypageCard[languageId].edit}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    `;
    } else {
      alert(alertMessage);
      router.push("/login");
    }
  }
}
