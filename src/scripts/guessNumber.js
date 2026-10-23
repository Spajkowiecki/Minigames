//dostep do elementow DOM HTML'a
const form = document.querySelector("#guessNumber-form");

// W pierwszej kolejności losuje liczbę
function generateNumberToGuess(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function calculateTheDifference(number, numberToGuess) {
  const msg = {};
  //obliczenia
  const difference = Math.abs(number - numberToGuess);

  if (number > numberToGuess) {
    msg.toLowOrToBigMsg = "Twoja liczba jest większa od mojej";
  }
  if (number < numberToGuess) {
    msg.toLowOrToBigMsg = "Twoja liczba jest mniejsza od mojej";
  }

  if (difference >= 60 && difference <= 100) {
    msg.howFar = "No no no, prawie kosmos... ZBYT DUŻA RÓŻNICA";
  }
  if (difference >= 30 && difference <= 60) {
    msg.howFar = "Powiem ci że masz niezły rozstrzał... DUŻA RÓŻNICA";
  }
  if (difference >= 10 && difference <= 30) {
    msg.howFar = "No tu już trochę przesadziłeś... ";
  }
  if (difference >= 5 && difference <= 10) {
    msg.howFar = "Trochę za dużoo...";
  }
  if (difference <= 5) {
    msg.howFar = "Prawie, prawie trafiłeś...";
  }

  return msg;
}
const numberToGuess = generateNumberToGuess(1, 100);
console.log(numberToGuess);

function gameLoop(number) {
  //gra losuje liczbe
  console.log("GAME-LOOP");
  //teraz użytkownik wprowadza liczbę, zbieram dane z listenera

  if (number == numberToGuess) {
    console.log("Trafiłeś... HURA!");
    return true;
  }
  if (number != numberToGuess) {
    const msg = calculateTheDifference(number, numberToGuess);
    console.log(msg.toLowOrToBigMsg + " | " + msg.howFar);
    return false;
  }
}

function validatePlayerInput(number) {
  const playerNumber = number.trim();

  if (playerNumber.length === 0) {
    console.log("Pole liczby jest puste");
    return false;
  }

  if (!/^\d+$/.test(playerNumber)) {
    console.log("Regex, tylko liczby!");
    return false;
  }

  const convertNumber = Number.parseInt(playerNumber);

  if (convertNumber < 1 || convertNumber > 100) {
    console.log("Cyfra z poza zakresu gry");
    return false;
  }

  console.log("[TEST]: Cyfra poprawna");
  return convertNumber;
}

form.addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault();

  const { number } = form.elements;
  const myNumber = number.value;

  //console.log(myNumber);
  if (!validatePlayerInput(myNumber)) {
    return;
  }
  //resetuje pole po każdej próbie odgadnięcia
  const validatedNumber = validatePlayerInput(myNumber);
  gameLoop(validatedNumber);

  form.reset();
});
