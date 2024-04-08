import Component from "../Component.js";
import Header from "../header/Header.js";
import MypageHTML from "./MypageHTML.js";
import MypageRestrictionModal from "./MypageRestrictionModal.js";
import { getProfileInfo } from "../../utils/apiHandler.js";
import { dispatch, getState } from "../../state/store.js";
import * as bootstrap from "bootstrap";

export default class Mypage extends Component {
  didMount() {
    const headerFlag = document.getElementById("header").childElementCount;
    if (headerFlag === 0) {
      const $header = document.getElementById("header");
      new Header($header, this.state);
    }

    const loginStatus = getState().isLoggedIn;
    if (loginStatus === true) {
      getProfileInfo(
        (response) => {
          dispatch("intraID", response.intra_id);
          dispatch("numberOfWins", response.win);
          dispatch("numberOfLoses", response.lose);

          const $mypage = this.target.querySelector("#mypage");
          new MypageHTML($mypage, this.state);
        },
        () => {
          console.log("Failed to get profile info");
          const $mypageModal = this.target.querySelector("#mypageRestriction");
          new MypageRestrictionModal($mypageModal, this.state);

          const modal = new bootstrap.Modal("#mypageRestrictionModal");
          modal.show();
        }
      );
    } else {
      const $mypageModal = this.target.querySelector("#mypageRestriction");
      new MypageRestrictionModal($mypageModal, this.state);

      const modal = new bootstrap.Modal("#mypageRestrictionModal");
      modal.show();
    }
  }

  template() {
    return `
    <div id="mypage"></div>
    <div id="mypageRestriction"></div>
    `;
  }
}
