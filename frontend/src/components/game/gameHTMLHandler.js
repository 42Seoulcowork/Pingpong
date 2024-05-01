import { dispatch, getState } from "../../state/store.js";
import { gameOver, gameWaitingModal } from "../../utils/languagePack.js";

export const scoreHandler = (player1, player2) => {
  document.getElementById("player1score").innerText = player1;
  document.getElementById("player2score").innerText = player2;
};

export const nicknameHandler = (nickname1, nickname2) => {
  document.getElementById("player1name").innerText = nickname1;
  document.getElementById("player2name").innerText = nickname2;
};

export const gameOverDescriptionUpdate = (newText) => {
  document.getElementById("gameOverDescription").innerText = newText;
};

export const gameWaitingModalDescriptionUpdate = (newText) => {
  document.getElementById("gameWaitingModalDescription").innerText = newText;
};

export const gameResultsUpdate = (round) => {
  const languageId = getState().languageId;
  document.getElementById("gameWaitingModalTitle").innerText =
    gameOver[languageId].gameOver;

  const firstMatch =
    gameWaitingModal[languageId].firstMatch +
    round[0].winner +
    gameWaitingModal[languageId].loser +
    round[0].loser;
  const secondMatch =
    gameWaitingModal[languageId].secondMatch +
    round[1].winner +
    gameWaitingModal[languageId].loser +
    round[1].loser;
  document.getElementById("gameWaitingModalDescription").innerText =
    firstMatch + "<br />" + secondMatch;
};
