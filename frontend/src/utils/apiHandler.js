export const sessionAuthentication = (trueCallback, falseCallback) => {
  fetch("/api/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        trueCallback();
      } else {
        falseCallback();
      }
    })
    .catch((e) => {
      falseCallback();
    });
};

export const logout = async (trueCallback, falseCallback) => {
  fetch("/api/session", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        trueCallback();
      } else {
        falseCallback();
      }
    })
    .catch(() => {
      falseCallback();
    });
};

export const getProfileInfo = (trueCallback, falseCallback) => {
  let status = 0;

  fetch("/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status === 200) {
        trueCallback(data);
      } else {
        falseCallback();
      }
    })
    .catch((e) => {
      falseCallback();
    });
};
