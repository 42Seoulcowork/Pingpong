import { dispatch, getState } from "../../state/store.js";
import { modalInit } from "../../utils/modalHandler.js";
import {
  gameOver,
  gameBoard,
  gameWaitingModal,
} from "../../utils/languagePack.js";
import {
  scoreHandler,
  nicknameHandler,
  gameWaitingReadyButtonShow,
  gameWaitingButtonShow,
  gameOverDescriptionUpdate,
  gameResultsUpdate,
  gameWaitingModalDescriptionUpdate,
} from "./gameHTMLHandler.js";

let socket;
let allowedKeys;
let pauseFlag;

export const socketHandler = (animate, moveFunction, openModal, closeModal) => {
  const languageId = getState().languageId;
  const gameMode = getState().gameMode;

  pauseFlag = true;

  const SERVER_URL = window.location.hostname;
  const webSocketURL = "wss://" + SERVER_URL + "/ws/" + gameMode + "/";
  socket = new WebSocket(webSocketURL);
  window.addEventListener("popstate", closeSocket);
  const child = document.querySelector("#gameWaitingCloseButton");
  child.addEventListener("click", closeSocket);

  socket.onopen = () => {
    console.log("WebSocket connection opened");
    animate();
    let message = {
      ready: true,
      difficulty: getState().difficulty,
    };
    if (gameMode === "local") {
      message.p1 = gameBoard[languageId].player1;
      message.p2 = gameBoard[languageId].player2;
    } else {
      message.nickname = getState().nickname;
    }
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
      closeModal();
      if (data.nickname) {
        nicknameHandler(data.nickname[0], data.nickname[1]);
      } else {
        const defalutData = gameBoard[languageId];
        nicknameHandler(defalutData.player1, defalutData.player2);
      }
      pauseFlag = false;
    }

    if (data.gameOver !== undefined) {
      if (data.gameOver === "normal")
        gameOverDescriptionUpdate(gameOver[languageId].normal + data.winner);
      else if (data.gameOver === "already in game")
        gameOverDescriptionUpdate(gameOver[languageId].alreadyInGame);
      else if (data.gameOver === "disconnected")
        gameOverDescriptionUpdate(gameOver[languageId].disconnected);
      else if (data.gameOver === "not authenticated")
        gameOverDescriptionUpdate(gameOver[languageId].notAuthenticated);
      else if (data.gameOver === "final") {
        if (data.round === undefined) {
          gameWaitingModalDescriptionUpdate(gameOver[languageId].final);
          openModal();
        } else {
          gameResultsUpdate(data.round, languageId);
          const readyButton = document.getElementById("gameWaitingReadyButton");
          readyButton.addEventListener("click", readyHandler, { once: true });
          gameWaitingReadyButtonShow();
        }
        return;
      }
      dispatch("endReason", data.gameOver);
      modalInit("gameOverModal", ["gameOverButton"]);
      socket.close();
      return;
    }

    moveFunction(data.ball, data.p1, data.p2);
    scoreHandler(data.score[0], data.score[1]);

    console.log("Received data:", data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
    pauseFlag = true;
    window.removeEventListener("popstate", closeSocket);
    document.removeEventListener("keydown", keydownHandler);
    document.removeEventListener("keyup", keyupHandler);
  };
};

function closeSocket() {
  if (socket && socket.readyState <= 1) {
    socket.close();
  }
}

const keydownHandler = (event) => {
  const keydown = event.key;
  if (keydown in allowedKeys && allowedKeys[keydown] == false) {
    const message = { [keydown]: true };
    socket.send(JSON.stringify(message));
    allowedKeys[keydown] = true;
  }
};

const keyupHandler = (event) => {
  const keyup = event.key;
  if (keyup in allowedKeys && allowedKeys[keyup] == true) {
    const message = { [keyup]: false };
    socket.send(JSON.stringify(message));
    allowedKeys[keyup] = false;
  }
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

  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyupHandler);
};

const readyHandler = () => {
  socket.send(
    JSON.stringify({
      final: true,
    })
  );
  pauseFlag = true;
  const languageId = getState().languageId;
  gameWaitingModalDescriptionUpdate(gameWaitingModal[languageId].description);
  gameWaitingButtonShow();
};
