import * as bootstrap from "bootstrap";

let gameWaitingModal;
let gameOverModal;

export const gameWaitingModalInit = () => {
  gameWaitingModal = new bootstrap.Modal("#gameWaitingModal");
  gameWaitingModalShow();
};

export const gameWaitingModalShow = () => {
  gameWaitingModal.show();
};

export const gameWaitingModalHide = () => {
  gameWaitingModal.hide();
};

export const gameWaitingReadyButtonShow = () => {
  document.getElementById("gameWaitingReadyButton").hidden = false;
  document.getElementById("gameWaitingButton").hidden = true;
};

export const gameWaitingButtonShow = () => {
  document.getElementById("gameWaitingButton").hidden = false;
  document.getElementById("gameWaitingReadyButton").hidden = true;
};

export const gameOverModalInit = () => {
  gameOverModal = new bootstrap.Modal("#gameOverModal");
  gameOverModal.show();
};
