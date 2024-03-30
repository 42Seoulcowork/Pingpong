import Component from "../Component.js";
import logoutRestrictionModal from "./logoutRestrictionModal.js";
import { logoutButtonHandler } from "./headerHandler.js";
import { router } from "../../utils/Router.js";
import { logout } from "../../utils/apiHandler.js";
import {
  mypageButton,
  languageSelector,
  logoutButton,
} from "../../utils/languagePack.js";

export default class Header extends Component {
  didMount() {
    logoutButtonHandler(this.store);
  }

  template() {
    const languageId = this.store.getState().languageId;

    return `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-brand nanum-gothic-bold" id="mainHeader">PINGPONG</div>
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
              <div class="nav-link active" aria-current="page" id="logoutHeader" hidden>${logoutButton[languageId].logoutDescription}</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="logoutRestrictionModal"></div>
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
      logout(
        () => {
          this.store.dispatch("isLoggedIn", false);
          logoutButtonHandler(this.store);
          router.push("/login");
        },
        () => {
          const $logoutRestrictionModal = this.target.querySelector(
            "#logoutRestrictionModal"
          );
          new logoutRestrictionModal($logoutRestrictionModal, this.store);

          const modal = new bootstrap.Modal("#logoutRestrictionModal");
          modal.show();
        }
      );
    });
  }
}
