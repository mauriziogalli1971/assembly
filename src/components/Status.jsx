function Status({ isGameWon, isGameLost, message }) {
  const content = {
    className: "status ",
    title: "-",
    message: "-",
  }

  if (isGameWon) {
    content.className += "status__visible status__won";
    content.title = "You win!";
    content.message = "Well done! 🎉";
  } else if (isGameLost) {
    content.className += "status__visible status__lost";
    content.title = "Game over!";
    content.message = "You better start learning Assembly 😭";
  } else {
    content.className += "status__visible status__bye";
    content.title = message;
    content.message = "";
  }


  return (
    <section className={content.className} aria-live="polite" role="status">
      <h2>{content.title}</h2>
      <p>{content.message}</p>
    </section>
  )
}

export default Status;