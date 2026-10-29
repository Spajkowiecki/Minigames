// Dane gry

//! PAMIĘĆ GRY
/**
 * Gra musi pamiętać dane takie jak:
 *
 * 1. Gracz wchodzi na stronę gry, na środku jest guzik "Zagraj", po naciśnięciu znika i pojawiają się 3 znaczki,
 *    Komputer odlicza do w formie tekstowej, tj. papier, kamień, nożyce ... i gracz w ciągu tej sekwencji wybiera znak
 *    ( nie wybranie znaku oznacza to że komputer sam losuje graczowi znak) i komputer sprawdza warunki
 *
 *
 */

//! ODWOŁANIA DO DRZEWA DOM
const gameControl = document.querySelector("#game-control");
const computerChoice = document.querySelector("#computer-choice");

const imagesURL = "../../src/";

const symbols = ["PAPIER", "KAMIEŃ", "NOŻYCE"];

function addToPickHistory(pick) {
  gameData.playerPickHistory.push(pick);
}

function setGameState(state) {
  return (gameData.gameState = state);
}

function getGameState() {
  return gameData.gameState;
}

const settings = Object.freeze({
  gameFigures: Object.freeze({
    rock: "rock",
    paper: "paper",
    scissor: "scissor",
  }),

  gameMessages: Object.freeze({
    player: "PLAYER win this round",
    computer: "COMPUTER win this round",
    draw: "this round end with REMIS",
  }),

  gameResults: Object.freeze({
    player: "player",
    computer: "computer",
    draw: "draw",
  }),

  pointsLimit: 3,

  gameWinRule: Object.freeze({
    rock: "scissor",
    paper: "rock",
    scissor: "paper",
  }),
});

const inGameData = {
  gameState: "IDLE", //.......stan gry
  gameHistory: [], //.........wzór: [{winner: "Player", roundHistory: [{player: "rock", computer: "scissors"}]}]
  roundNumber: 0,
  points: {
    computer: 0,
    player: 0,
  },
};

function whoWinRound(player, computer) {
  if (player === computer) {
    return settings.gameResults.draw;
  }
  if (settings.gameWinRule[player] === computer) {
    return settings.gameResults.player;
  }

  return settings.gameResults.computer;
}

function computerSymbol() {
  const symbol = Object.values(settings.gameFigures);
  const randomSymbolIndex = Math.floor(Math.random() * symbol.length);
  computerChoice.setAttribute(
    "src",
    `${imagesURL}${symbol[randomSymbolIndex]}.png`,
  );

  console.log("Komputer wybrał: " + symbol[randomSymbolIndex]);

  return symbol[randomSymbolIndex];
}

// ----------- LISTENER FOR SOURCE FROM BUTTON WHICH ONE WAS CLICKED
gameControl.addEventListener("click", (btnEvent) => {
  btnEvent.preventDefault();
  const clickedButton = btnEvent.target.closest("[data-symbol]");
  if (!clickedButton) {
    return;
  }

  const playerSymbol = clickedButton.dataset.symbol;
  const compSymbol = computerSymbol();
  const winner = whoWinRound(playerSymbol, compSymbol);

  if (winner === settings.gameResults.computer) {
    inGameData.points.computer += 1;
  }
  if (winner === settings.gameResults.player) {
    inGameData.points.player += 1;
  }

  const roundPoints = {
    player: inGameData.points.player,
    computer: inGameData.points.computer,
  };

  const round = {
    whoWin: winner,
    points: roundPoints,
    player: playerSymbol,
    computer: compSymbol,
  };

  inGameData.roundNumber += 1;
  console.log(`RUNDA: ${inGameData.roundNumber}: `, inGameData.points);

  inGameData.gameHistory.push(round);
  // PO KAŻDYM KLIKNIECIU, zapisuje wynik w obiekcie i wysyłam do tablicy obiektow

  //ZAKONCZENIE GRY
  // if (inGameData.points.player === 3 || inGameData.points.computer === 3) {
  //   const points = Object.entries(inGameData.points);
  //   round.roundPoints.push(points);

  //   console.log("RUNDE WYGRYWA: ", determineWhoWin);
  // }

  console.log(settings.gameMessages[winner]);
});
