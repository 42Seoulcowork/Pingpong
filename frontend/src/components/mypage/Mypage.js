import Component from "../Component.js";
import Header from "../header/Header.js";
import MypageHTML from "./MypageHTML.js";
import MypageRestrictionModal from "./MypageRestrictionModal.js";
import { getProfileInfo } from "../../utils/apiHandler.js";
import { modalInit } from "../../utils/modalHandler.js";
import { dispatch, getState } from "../../state/store.js";

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
          const $mypageModal = this.target.querySelector("#mypageRestriction");
          new MypageRestrictionModal($mypageModal, this.state);
          modalInit("mypageRestrictionModal", ["loginFirstButton"], []);
        }
      );
    } else {
      const $mypageModal = this.target.querySelector("#mypageRestriction");
      new MypageRestrictionModal($mypageModal, this.state);
      modalInit("mypageRestrictionModal", ["mypageLoginFirstButton"]);
    }
  }

  template() {
    return `
    <div id="mypage"></div>
    <div id="mypageRestriction"></div>
    `;
  }
}
