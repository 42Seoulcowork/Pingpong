import Header from "../header/Header.js";
import Component from "../Component.js";
import { router } from "../../utils/Router.js";

export default class Main extends Component {
  didMount() {
    const $header = this.target.querySelector("header");
    new Header($header, this.store);
  }

  template() {
    return `
    <header></header>
    <div class='d-flex flex-column align-items-center justify-content-center' style="height: 100vh;">
      <div class='language-page'>
        <div class="language-selector text-center">
          <h2 class="mb-3">Select Language</h2>
            <div class="d-grid gap-2 d-md-block" role="group">
                <button type="button" class="btn btn-outline-dark">English</button>
                <button type="button" class="btn btn-outline-primary">한국어</button>
                <button type="button" class="btn btn-outline-info">Français</button>
            </div>
        </div>
      </div>
    </div>
    `;
  }
}
