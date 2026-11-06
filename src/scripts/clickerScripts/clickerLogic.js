import { setGameState } from "./clickerSettings.js";
import {
  hideControlButtons,
  hideHPbar,
  hideStartGameButton,
  showControlButtons,
  showHPbar,
} from "./clickerUI.js";

export function initGame() {
  setGameState("IDLE");
  hideHPbar();
  hideControlButtons();
}

export function startGame() {
  setGameState("RUNNING");
  showHPbar();
  showControlButtons();
  hideStartGameButton();
}
