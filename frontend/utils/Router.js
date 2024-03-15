import Component from "../components/Component.js";
import { customEventEmitter } from "../utils/helpers.js";

class Router {
  $app;
  rootStore;
  routes = {};
  fallback = "/";

  constructor({ $app, routes, $store, fallback = "/" }) {
    this.$app = $app;
    this.rootStore = $store;
    this.fallback = fallback;

    routes.forEach((route) => {
      this.routes[route.path] = route.page;
    });

    this.initEvent();
  }

  initEvent() {
    document.addEventListener(
      "moveRoutes",
      this.onRouteChangeHandler.bind(this)
    );

    window.addEventListener("popstate", this.onRoutePopHandler.bind(this));
  }

  onRouteChangeHandler(event) {
    const path = event.detail.path;
    history.pushState(event.detail, "", path);

    this.renderPage(path);
  }

  onRoutePopHandler() {
    const path = window.location.pathname;
    this.renderPage(path);
  }

  hasRoute(path) {
    return typeof this.routes[path] !== "undefined";
  }

  getRoute(path) {
    return this.routes[path];
  }

  renderPage(path) {
    let route;

    /* 동적 라우팅 처리 */
    const regex = /\w{1,}$/; // 동적 라우팅으로 전달되는 :id 는 모두 [문자열 + 숫자] 조합으로 간주

    if (this.hasRoute(path)) {
      route = this.getRoute(path);
    } else if (regex.test(path)) {
      // 주소가 없는 경우를 동적 라우팅으로 간주하고 이를 :id 로 치환
      route = this.getRoute(path.replace(regex, ":id"));
    } else {
      // 그 외 입력되지 않은 모든 주소에 대해서는 fallback 실행
      route = this.getRoute(this.fallback);
    }

    // route는 Component 인스턴스, 따라서 생성자에 target과 props를 전달
    new route(this.$app, this.rootStore);
  }

  push(path) {
    customEventEmitter("moveRoutes", {
      ...history.state,
      path,
    });
  }
}

export let router;

export function initRouter(options) {
  const routerObj = new Router(options);

  router = {
    push: (path) => routerObj.push(path),
  };

  customEventEmitter(
    "moveRoutes",
    history.state ?? {
      path: "/",
    }
  );
}
