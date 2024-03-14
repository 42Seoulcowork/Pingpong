import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";

export default class Main extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, { propTest: "mainprop" });
  }

  template() {
    return `
      <div class='main-page'>
        <header></header>
        <p>MainPage</p>
      </div>
    `;
  }
}
