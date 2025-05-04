function Languages({ languages, wrongGuessCount }) {
  return (
    <section className="languages">
      {languages.map((language, index) => {
        const isLanguageLost = index < wrongGuessCount;
        return <li
          key={index}
          className={`languages--item ${isLanguageLost ? "languages--item__wrong" : ""}`}
          style={{
            backgroundColor: language.backgroundColor,
            color: language.color,
          }}
        >
          {language.name}
        </li>;
      })}
    </section>
  );
}

export default Languages;
