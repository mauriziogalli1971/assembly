import { useState } from "react";
import Word from "./components/Word.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Languages from "./components/Languages.jsx";
import Status from "./components/Status.jsx";
import { languages } from "./assets/js/languages.js";
import { getFarewellText, getRandomWord } from "./assets/js/utils.js";
import ReactConfetti from "react-confetti";
import Countdown from "./components/Countdown.jsx";

// Game settings
const MAX_ATTEMPTS = languages.filter(
  (language) => language.name.toLowerCase() !== "assembly",
).length;
const COUNTDOWN_SECONDS = 60;

function Hangman() {
  const [word, setWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [expired, setExpired] = useState(false);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !word.includes(letter),
  ).length;
  const attemptLeft = MAX_ATTEMPTS - wrongGuessCount;
  const isGameStart = guessedLetters.length === 0;
  const isGameLost = wrongGuessCount >= languages.length - 1 || expired;
  const isGameWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameWon || isGameLost;
  const isGamePlay = !(isGameStart || isGameOver);

  const countdownTime = expired ? 0 : COUNTDOWN_SECONDS;

  const printMessage = () => {
    if (guessedLetters.length) {
      if (word.includes([...guessedLetters].pop())) {
        return "Well done buddy! 🥳";
      }
    } else {
      return "Press any key to start.";
    }

    if (wrongGuessCount > 0) {
      return getFarewellText(languages[wrongGuessCount - 1].name);
    }
  };

  function resetGame() {
    setWord(() => getRandomWord());
    setGuessedLetters([]);
    setExpired(false);
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under {MAX_ATTEMPTS} attempts to keep the
          programming world safe from Assembly!
        </p>
      </header>

      <Status
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        message={printMessage()}
      />

      <Languages languages={languages} wrongGuessCount={wrongGuessCount} />

      <Word
        word={word}
        guessedLetters={guessedLetters}
        isGameOver={isGameOver}
      />

      <section className={"score"}>
        <Countdown isGameStart={isGameStart} isGamePlay={isGamePlay} setExpired={setExpired} countdownTime={countdownTime} />
        <small className={isGamePlay ? null : "disabled"}>
          {attemptLeft} attempts left
        </small>
      </section>

      <Keyboard
        word={word}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        isGameOver={isGameOver}
      />

      {isGameOver && (
        <button className="new-game" onClick={() => resetGame()}>
          New game
        </button>
      )}

      {isGameWon && <ReactConfetti />}
    </main>
  );
}

export default Hangman;
