function Word({ word, guessedLetters, isGameOver }) {
  const letters = word.split("");

  return (
    <>
      <section className="word">
        <ol className="word--list">
          {letters.map((letter, index) => (
            <li
              key={index}
              className={`word--letter ${isGameOver && !guessedLetters.includes(letter) ? "word--letter__missed" : ""}`}
            >
              {guessedLetters.includes(letter)
                ? letter.toUpperCase()
                : `${isGameOver ? letter : ""}`}
            </li>
          ))}
        </ol>
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {isGameOver ? "The word was:" : "Current word:"}&nbsp;
          {
            letters.map((letter) => (
              guessedLetters.includes(letter) ? letter + "." : "blank."
            )).join(" ")
          }
        </p>
      </section>
    </>
  );
}

export default Word;
