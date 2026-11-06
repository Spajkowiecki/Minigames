//This file contains basic settings of game

//! --- [ GAME SETTINGS ] ---

export const settings = {
  debugMode: false,
};

export function toggleDebug() {
  return (settings.debugMode = !settings.debugMode);
}

export function getDebugMode() {
  return settings.debugMode;
}

export const gameStates = Object.freeze({
  IDLE: "IDLE",
  RUNNING: "RUNNING",
});

export function getGameState() {
  return gameSettings.gameState;
}

export function setGameState(gameState) {
  gameSettings.gameState = gameState;
}

//! --- [ DEFAULT SETTINGS ] ---
export const gameSettings = {
  gameState: gameStates.IDLE,
};
