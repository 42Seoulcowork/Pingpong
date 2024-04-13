import { dispatch, getState } from "../../state/store.js";
import { gameOver } from "../../utils/languagePack.js";
import * as bootstrap from "bootstrap";
import { SERVER_URL } from "../../utils/constants.js";

let socket;
let allowedKeys;
let gameWaitingModal;
let gameOverModal;

const scoreHandler = (p1, p2) => {
  document.getElementById("player1score").innerText = p1;
  document.getElementById("player2score").innerText = p2;
};

export const socketHandler = (socketOpenCallback, ball, p1, p2, gameMode) => {
  let pauseFlag = true;

  const webSocketURL = "wss://"+ SERVER_URL + "/ws/" + getState().gameMode + "/";
  socket = new WebSocket(webSocketURL);
  window.addEventListener("popstate", closeSocket);
  // socket = new WebSocket("wss://echo.websocket.org");

  socket.onopen = () => {
    console.log("WebSocket connection opened");
    socketOpenCallback();
    const message = { ready: true };
    socket.send(JSON.stringify(message));
  };

  socket.onerror = (event) => {
    console.log(event);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(event.data);

    if (pauseFlag === true) {
      keyEventHandler(gameMode);
      gameWaitingModalClose();
      pauseFlag = false;
    } else if (data.gameOver !== undefined) {
      dispatch("endReason", data.gameOver);
      if (data.gameOver === "normal") {
        dispatch("winner", data.winner);
        document.getElementById("gameOverDescription").innerText =
          gameOver[getState().languageId].normal + data.winner;
      }
      gameOverModalWork();
      socket.close();
    }

    ball.position.fromArray(data.ball);
    p1.position.fromArray(data.p1);
    p2.position.fromArray(data.p2);

    scoreHandler(data.score[0], data.score[1]);

    console.log("Received data:", data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
};

const keyEventHandler = (gameMode) => {
  if (gameMode == "local") {
    allowedKeys = {
      w: false,
      s: false,
      ArrowUp: false,
      ArrowDown: false,
    };
  } else {
    allowedKeys = {
      ArrowUp: false,
      ArrowDown: false,
    };
  }

  document.addEventListener("keydown", (event) => {
    const keydown = event.key;
    if (keydown in allowedKeys && allowedKeys[keydown] == false) {
      const message = { [keydown]: true };
      socket.send(JSON.stringify(message));
      allowedKeys[keydown] = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    const keyup = event.key;
    if (keyup in allowedKeys && allowedKeys[keyup] == true) {
      const message = { [keyup]: false };
      socket.send(JSON.stringify(message));
      allowedKeys[keyup] = false;
    }
  });
};

function closeSocket() {
    if (socket && socket.readyState <= 1) {
        socket.close();
        window.removeEventListener("popstate", closeSocket);
    }
}

export const gameWaitingModalWork = () => {
  gameWaitingModal = new bootstrap.Modal("#gameWaitingModal");
  gameWaitingModal.show();
};

const gameWaitingModalClose = () => {
  gameWaitingModal.hide();
};

const gameOverModalWork = () => {
  gameOverModal = new bootstrap.Modal("#gameOverModal");
  gameOverModal.show();
};
