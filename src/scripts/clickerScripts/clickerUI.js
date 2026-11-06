const clickbtn = document.querySelector('[data-control="click"]');
const startbtn = document.querySelector('[data-control="start"]');
const loadbtn = document.querySelector('[data-control="load"]');
const clickerHpBar = document.querySelector("#clicker-actualhp");

/**
 * @description hide "Play game" button
 */
export function hideStartGameButton() {
  startbtn.style.display = "none";
}

/**
 * @description show "Play game" button
 */
export function showStartGameButton() {
  startbtn.style.display = "block";
}

/**
 * @description hide "Dig & Load" buttons
 */
export function hideControlButtons() {
  clickbtn.style.display = "none";
  loadbtn.style.display = "none";
}

/**
 * @description show "Dig & Load" buttons
 */
export function showControlButtons() {
  clickbtn.style.display = "block";
  loadbtn.style.display = "block";
}

export function hideHPbar() {
  clickerHpBar.style.display = "none";
}

export function showHPbar() {
  clickerHpBar.style.display = "flex";
}
