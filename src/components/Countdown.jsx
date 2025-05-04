import { useEffect, useState } from "react";

function Countdown({ isGameStart, isGamePlay, setExpired, countdownTime }) {
  const [seconds, setSeconds] = useState(countdownTime);

  // Derived values
  let expired = seconds === 0;
  let intervalId = 0;

  useEffect(() => {
    if (isGameStart) {
      setSeconds(countdownTime);
    } else if (isGamePlay && !expired) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      intervalId = setInterval(() => {
        setSeconds((seconds) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          expired = seconds === 0;
          return expired ? expired : seconds - 1;
        });
      }, 1000);
    } else if (expired) {
      setExpired(expired);
      setSeconds(countdownTime);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isGameStart, isGamePlay, expired]);

  return (
    <small className={!isGamePlay ? "disabled" : null}>
      {`⏱ ${ formatTime(countdownTime === 0 || isGameStart ? countdownTime : seconds)}`}
    </small>
  );

  /*function debug(id) {
    console.log(`id: ${id} : intervalId: ${intervalId} : isGameStart ${isGameStart} : isGamePlay ${isGamePlay} : expired ${expired} : seconds ${seconds} countdownTime : ${countdownTime}`);
  }*/
}

export default Countdown;


function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${formatElapsedTime(minutes)}:${formatElapsedTime(seconds)}`;
}

function formatElapsedTime(elapsedTime) {
  return formatNumberWithLeadingZeros(elapsedTime, 10);
}

function formatNumberWithLeadingZeros(number, max) {
  const maxLength = max.toString().length;
  return number < max ? number.toString().padStart(maxLength, 0) : number;
}
