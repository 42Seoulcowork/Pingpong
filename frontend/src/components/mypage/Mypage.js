import Component from "../Component.js";
import MypageHTML from "./MypageHTML.js";
import mypageRestrictionModal from "./mypageRestrictionModal.js";
import { getProfileInfo } from "../../utils/apiHandler.js";
import * as bootstrap from "bootstrap";

export default class Mypage extends Component {
  didMount() {
    const loginStatus = this.store.getState().isLoggedIn;

    if (loginStatus === true) {
      getProfileInfo(
        (response) => {
          this.store.dispatch("intraID", response.intra_id);
          this.store.dispatch("numberOfWins", response.win);
          this.store.dispatch("numberOfLoses", response.lose);

          const $mypage = this.target.querySelector("#mypage");
          new MypageHTML($mypage, this.store);
        },
        () => {
          console.log("Failed to get profile info");
          const $mypageModal = this.target.querySelector(
            "#mypageRestrictionWrapper"
          );
          new mypageRestrictionModal($mypageModal, this.store);

          const modal = new bootstrap.Modal("#mypageRestrictionModal");
          modal.show();
        }
      );
    } else {
      const $mypageModal = this.target.querySelector(
        "#mypageRestrictionWrapper"
      );
      new mypageRestrictionModal($mypageModal, this.store);

      const modal = new bootstrap.Modal("#mypageRestrictionModal");
      modal.show();
    }
  }

  template() {
    return `
    <div id="mypage"></div>
    <div id="mypageRestrictionWrapper"></div>
    `;
  }
}
