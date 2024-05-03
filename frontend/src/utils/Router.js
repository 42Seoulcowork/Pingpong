import { customEventEmitter } from "./helpers.js";

class Router {
  $app;
  state;
  routes = {};
  fallback = "/";

  constructor({ $app, routes, $state, fallback = "/" }) {
    this.$app = $app;
    this.state = $state;
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
    const element = event.detail.element;

    history.pushState(event.detail, "", path);

    this.renderPage(path, element);
  }

  onRoutePopHandler(event) {
    if (event.state === null) return;

    const path = event.state.path;
    const element = event.state.element;

    this.renderPage(path, element);
  }

  hasRoute(path) {
    return typeof this.routes[path] !== "undefined";
  }

  getRoute(path) {
    return this.routes[path];
  }

  renderPage(path, element) {
    let route;

    /* 동적 라우팅 처리 */
    const regex = /\w{1,}$/; // 동적 라우팅으로 전달되는 :id 는 모두 [문자열 + 숫자] 조합으로 간주

    if (this.hasRoute(path)) {
      route = this.getRoute(path);
    } else if (regex.test(path)) {
      // 주소가 없는 경우를 동적 라우팅으로 간주하고 이를 :id 로 치환
      route = this.getRoute(path.replace(regex, ":id"));
      if (route === undefined) route = this.getRoute(this.fallback);
    } else {
      // 그 외 입력되지 않은 모든 주소에 대해서는 fallback 실행
      route = this.getRoute(this.fallback);
    }

    let $element = this.$app.querySelector("#" + element);
    if (!$element) $element = this.$app.querySelector("#main");

    // route는 Component 인스턴스, 따라서 생성자에 target과 props를 전달
    new route($element, this.state);
  }

  push(path, element = "main") {
    customEventEmitter("moveRoutes", {
      ...history.state,
      path,
      element,
    });
  }
}

export let router;

export function initRouter(options) {
  const routerObj = new Router(options);

  router = {
    push: (path, element) => routerObj.push(path, element),
  };

  customEventEmitter(
    "moveRoutes",
    history.state ?? {
      path: window.location.pathname,
      element: "main",
    }
  );
}
