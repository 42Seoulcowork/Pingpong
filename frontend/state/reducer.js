export default function (store, action, newState) {
  let newStore = Object.assign({}, store);

  // just single depth action is allowed for now
  if (action in store) {
    newStore[action] = newState;
    return newStore;
  } else {
    console.log("Invalid action");
    return "";
  }
}
