export default class Component {
  target;
  props;
  state;

  constructor(target, props) {
    try {
      this.target = target;
      this.props = props;
      this.state = {};
      this.setup();
      this.mount();
      this.setEvent();
    } catch (event) {
      if (event != "PassThrough") {
        console.error(event);
      }
    }
  }

  setup() {}
  template() {
    return "";
  }
  render() {
    const template = this.template();
    if (template) {
      this.target.innerHTML = template;
    }
  }
  mount() {
    this.render();
    this.didMount();
  }
  update() {
    this.render();
    this.didUpdate();
  }

  didMount() {}
  didUpdate() {}

  setState(newState) {
    const nextState = { ...this.state, ...newState };
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return;
    }
    this.state = nextState;
    this.update();
  }

  setEvent() {}
  addEvent(eventType, selector, callback) {
    const child = this.target.querySelector(selector);
    child.addEventListener(eventType, callback);
  }
}
