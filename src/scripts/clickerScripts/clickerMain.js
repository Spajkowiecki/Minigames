import { initGame, startGame } from "./clickerLogic.js";
import {
  setGameState,
  getGameState,
  gameStates,
  getDebugMode,
  toggleDebug,
} from "./clickerSettings.js";
//Main file of game

//! [ START NEW - CLEAR GAME ]
initGame();
//! -------------------------|

toggleDebug();

//variable for clicker controls to determine which button was clicked, by bubbling and dataset
const clickerControls = document.querySelector("#clicker-control");

//handling clicks of buttons
clickerControls.addEventListener("click", (clickEvent) => {
  if (!(clickerControls instanceof HTMLDivElement)) {
    return;
  }
  //getting info what button was clicked to perform right action
  const clickSource = clickEvent.target.closest("[data-control]");
  if (clickSource === null) {
    return;
  }

  const clickedButton = clickSource.dataset.control;

  if (clickSource instanceof HTMLButtonElement) {
    if (getGameState() === gameStates.IDLE) {
      if (clickedButton === "start") {
        if (getDebugMode()) {
          console.log("[ DEBUG MODE ]:: btn-control: START");
          startGame();
        }
      }
    }

    if (getGameState() === gameStates.RUNNING) {
      if (clickedButton === "click") {
        if (getDebugMode()) {
          console.log("[ DEBUG MODE ]:: btn-control: CLICK");
        }
      }

      if (clickedButton === "load") {
        if (getDebugMode()) {
          console.log("[ DEBUG MODE ]:: btn-control: LOAD");
        }
      }
    }
  }
});
