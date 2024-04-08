let store = {
  location: "/", // or "/game" or "/login"
  isLoggedIn: false,
  intraID: "Defalut_ID",
  numberOfWins: 0,
  numberOfLoses: 0,
  languageId: "ko",

  // Game Option
  nickname: "Default_Nickname",
  gameMode: "local", // or "remote" or "tournament"
  difficulty: "easy", // or "hard"
  appearance: "day", // or "night"
  ballColor: "red", // or "yellow" or "purple"
  newGame: false, // or true

  // 공통 게임 정보: 게임이 종료되었을 때 업데이트
  endReason: "normal", // or "left"
  winner: null, // 최근 라운드 우승자의 nickname

  // 공통 게임 정보: 게임이 시작되거나 종료되었을 때 업데이트
  gameStatus: "ended", // or "playing"
  gameContext: {
    roomName: "",
    leftUser: "-", // nickname
    rightUser: "-", // nickname
    participated: false, // 본인 참석 여부
    userSide: "left", // 본인의 side
  },

  // 공통 게임 정보: 게임 도중 실시간으로 업데이트
  leftUserScore: 0,
  rightUserScore: 0,
  ballPosition: { x: 0, y: 0 },
  ballVelocity: { x: 0, y: 0 },
  leftPaddlePosition: 200,
  rightPaddlePosition: 200,

  // tournament 정보
  round: 0,
  tournamentPlayer: ["", "", "", ""], // [player1_nickname, player2_nickname, player3_nickname, player4_nickname]
  tournamentScore: {
    round1: ["-", "-"], // [leftScore, rightScore]
    round2: ["-", "-"],
    round3: ["-", "-"],
  },

  tournamentWinner: {
    round1: "-", // nickname
    round2: "-",
    round3: "-",
  },
};

function reducer(store, action, newState) {
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

export function dispatch(action, newState) {
  const newObj = reducer(store, action, newState);

  if (newObj !== "") {
    store = newObj;
  }
}

export function getState() {
  return store;
}
