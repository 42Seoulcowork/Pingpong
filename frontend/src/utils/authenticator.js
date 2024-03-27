export function sessionAuthentication(store) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/session", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    if (xhr.status === 200) {
      store.dispatch("isLoggedIn", true);
    } else {
      store.dispatch("isLoggedIn", false);
    }
  } catch (error) {
    store.dispatch("isLoggedIn", false);
  }
}

export function logout(store) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/session", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    if (xhr.status === 204) {
      store.dispatch("isLoggedIn", false);
    }
  } catch (e) {}
}
