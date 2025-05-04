function Keyboard({ word, guessedLetters, setGuessedLetters, isGameOver }) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  function isCorrect(letter) {
    return word.split("").includes(letter);
  }

  function isGuessed(letter) {
    return guessedLetters.includes(letter);
  }

  function addGuessedLetter(letter) {
    return isGuessed(letter)
      ? guessedLetters
      : setGuessedLetters((guessedLetters) => [...guessedLetters, letter]);
  }

  function getKeyClassName(letter) {
    const keyboardClassName = "keyboard--btn";
    return isGuessed(letter)
      ? isCorrect(letter)
        ? `${keyboardClassName} keyboard--btn__guessed`
        : `${keyboardClassName} keyboard--btn__wrong`
      : keyboardClassName;
  }

  return (
    <section className="keyboard">
      {alphabet.map((letter, index) => (
        <button
          key={index}
          className={getKeyClassName(letter)}
          disabled={isGameOver}
          aria-disabled={word.includes(letter)}
          aria-label={`letter ${letter}`}
          onClick={(e) => {
            const clickedLetter = e.target.textContent;
            if (guessedLetters.includes(clickedLetter)) {
              return;
            }
            addGuessedLetter(clickedLetter);
          }}
        >
          {letter}
        </button>
      ))}
    </section>
  );
}

export default Keyboard;
