import Header from "../header/Header.js";
import Component from "../Component.js";

export default class Login extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, { propTest: "loginprop" });
  }

  template() {
    return `
      <div class='main-page'>
        <header></header>
        LoginPage
      </div>
    `;
  }
}
