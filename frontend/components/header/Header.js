import Component from "../Component.js";
import { router } from "../../utils/Router.js";
import {
  mypageButton,
  languageSelector,
  logoutButton,
} from "../../utils/languagePack.js";

export default class Header extends Component {
  template() {
    const languageId = this.store.getState().languageId;
    const loginStatus = this.store.getState().isLoggedIn;

    let logoutButtonHidden = "";
    if (loginStatus === false) {
      logoutButtonHidden = "hidden";
    }

    return `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-brand" id="mainHeader">PINGPONG</div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav mb-lg-0">
            <li class="nav-item" >
              <div class="nav-link active" aria-current="page" id="languageHeader">${languageSelector[languageId].language}</div>
            </li>
            <li class="nav-item">
              <div class="nav-link active" aria-current="page" id="mypageHeader">${mypageButton[languageId].mypage}</div>
            </li>
            <li class="nav-item">
              <div class="nav-link active" aria-current="page" id="logoutHeader" ${logoutButtonHidden}>${logoutButton[languageId].logoutDescription}</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `;
  }

  setEvent() {
    this.addEvent("click", "#mainHeader", () => {
      router.push("/");
    });
    this.addEvent("click", "#mypageHeader", () => {
      router.push("/mypage");
    });
    this.addEvent("click", "#languageHeader", () => {
      router.push("/language");
    });
    this.addEvent("click", "#logoutHeader", () => {
      this.store.dispatch("isLoggedIn", false);
      router.push("/login");
    });
  }
}
