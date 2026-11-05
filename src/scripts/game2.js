const clickerImage = document.querySelector("#clicker-image");
const gameControl = document.querySelector("#clicker-control");

const clicks = document.querySelector("#scoreboard-clicks");
const points = document.querySelector("#scoreboard-points");

const clickerHpBar = document.querySelector("#clicker-actualhp");
const clickerHP = document.querySelector("#clicker-hpValue");

const DEBUG = false;

const gameState = {
  state: "IDLE",
};

const gameStatistics = {
  points: 0,
  clicks: 0,
};

const mineralData = {
  maxhp: 0,
  hp: 0,
};

function cutTheImage(imageDOM) {
  //przypisanie obrazu do zmiennej
  const image = imageDOM;
  //sprawdzenie czy wogóle ten obraz tam jest i czy jest elementem obrazu
  if (image === null) {
    if (DEBUG) {
      console.log("There is not image", error);
    }
    return;
  }
  if (!(image instanceof HTMLImageElement)) {
    if (DEBUG) {
      console.log("The object is not an instance of HTML image element", error);
    }
    return;
  }
  // po tych if'ach uzyskałem podpowiedzi do elementu HTML'a

  //Bez cięcia
  const withoutCut = "clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0);";

  //- kroki cięcia
  const cutSteps = [
    "100% 15%, 100% 100%, 0 100%, 0 30%",
    "100% 41%, 100% 100%, 0 100%, 0 30%",
    "100% 41%, 100% 100%, 0 100%, 0 53%",
    "100% 60%, 100% 100%, 0 100%, 0 53%",
    "100% 60%, 100% 100%, 0 100%, 0 68%",
    "100% 77%, 100% 100%, 0 100%, 0 53%",
    "100% 77%, 100% 100%, 0 100%, 0 88%",
    "100% 96%, 100% 100%, 0 100%, 0 88%",
    "100% 96%, 100% 100%, 0 100%, 0 100%",
    "100% 100%, 100% 100%, 0 100%, 0 100%",
  ];

  //zmiana ciecia po kliknieciu
  if (DEBUG) {
    console.log("cięcie!");
  }
}

function initGame() {
  const clickbtn = document.querySelector('[data-control="click"]');
  const loadbtn = document.querySelector('[data-control="load"]');

  if (!(clickbtn instanceof HTMLButtonElement)) {
    return;
  }
  if (!(loadbtn instanceof HTMLButtonElement)) {
    return;
  }

  clickerHpBar.style.display = "none";
  clickbtn.style.display = "none";
  loadbtn.style.display = "none";
}

function startGame() {
  gameState.state = "RUNNING";
  const clickbtn = document.querySelector('[data-control="click"]');
  const startbtn = document.querySelector('[data-control="start"]');
  const loadbtn = document.querySelector('[data-control="load"]');

  if (!(clickbtn instanceof HTMLButtonElement)) {
    return;
  }
  if (!(loadbtn instanceof HTMLButtonElement)) {
    return;
  }
  if (!(startbtn instanceof HTMLButtonElement)) {
    return;
  }

  startbtn.style.display = "none";
  clickerHpBar.style.display = "flex";
  clickbtn.style.display = "block";
  loadbtn.style.display = "block";

  spawnNewRock();
}

function setRock() {
  const rock = mineralData;
  clickerHpBar.style.width = "100%";
  rock.hp = 10;
  rock.maxhp = rock.hp;
  return rock;
}

function spawnNewRock() {
  console.log("CREATING NEW ROCK!");
  //ustawienia dot. aktualnego niszczonego obiektu.

  const baseImageURL = "../pages/assets2/";
  const imageNumber = Math.floor(Math.random() * 2) + 1;
  const randomImage = `${baseImageURL}iron_ore${imageNumber}.png`;

  console.log("IMAGE: ", randomImage);

  clickerImage.setAttribute("src", randomImage);
  const rock = setRock();
  clickerHP.textContent = rock.hp;
}

function performActionOnClick() {
  //Po kliknieciu odejmuje HP
  mineralData.hp -= 1;
  gameStatistics.clicks += 1;
  //wykonuje obliczenia zamiany na procenty by wykorzystac to do zmniejszenia paska
  const takeHpMath = (mineralData.hp / mineralData.maxhp) * 100;

  //ustawienie wartosci width paska zycia
  clickerHpBar.style.width = takeHpMath + "%";
  //ustawienie wartosci tekstowej dla hp
  clickerHP.textContent = mineralData.hp;
  clicks.textContent = gameStatistics.clicks;

  console.log(takeHpMath);
}

//? ------------------ [ GAME ] --------------------------------------//

initGame();

//! ------------------ [ LISTENERS OF GAME ] ------------------------ //

gameControl.addEventListener("click", (clickEvent) => {
  if (!(gameControl instanceof HTMLDivElement)) {
    return;
  }
  const clickSource = clickEvent.target.closest("[data-control]");
  if (clickSource === null) {
    return;
  }

  const pressedAction = clickSource.dataset.control;

  if (gameState.state === "IDLE") {
    startGame();
  }

  if (gameState.state === "RUNNING") {
    if (pressedAction === "click") {
      console.log("CLICK!");
      //Funkcja
      performActionOnClick();

      if (mineralData.hp === 0) {
        console.log("ZNISZCZONE!");
        gameStatistics.points += 1;
        points.textContent = gameStatistics.points;
        spawnNewRock();
      }
    }
    if (pressedAction === "load") {
      console.log("LOAD!");
    }
  }
});
