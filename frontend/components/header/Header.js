import Component from "../Component.js";
import { router } from "../../utils/Router.js";

export default class Header extends Component {
  template() {
    return `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-brand" id="main">Pingpong</div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav mb-lg-0">
            <li class="nav-item" >
              <div class="nav-link active" aria-current="page" id="language">Language</div>
            </li>
            <li class="nav-item">
              <div class="nav-link active" aria-current="page" id="mypage">My Page</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `;
  }

  setEvent() {
    this.addEvent("click", "#main", () => {
      router.push("/");
    });
    this.addEvent("click", "#mypage", () => {
      router.push("/");
    });
    this.addEvent("click", "#language", () => {
      router.push("/login");
    });
  }
}
