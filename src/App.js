import { useState } from "react";

function App() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const [stop, setStop] = useState(false);
  const [intervalRef, setIntervalRef] = useState(null);
  const [doubleClick, setDoubleClick] = useState(0);

  const startStopWatch = () => {
    let countSec = sec;
    let countMin = min;
    let countHour = hour;

    if (intervalRef === null) {
      const interval = setInterval(() => {
        if (countSec < 59) {
          countSec++;
          setSec(countSec);
        } else if (countMin < 59) {
          countSec = 0;
          setSec(countSec);
          ++countMin;
          setMin(countMin);
        } else {
          countMin = 0;
          countSec = 0;
          setSec(countMin);
          setMin(countMin);
          ++countHour;
          setHour(countHour);
        }
      }, 1000);
      setIntervalRef(interval);
    }

    if (stop && intervalRef) {
      setSec(0);
      setMin(0);
      setHour(0);
      setIntervalRef(null);
      clearInterval(intervalRef);
    }

    setStop(!stop);
  };

  const waitWatch = () => {
    setDoubleClick(doubleClick + 1);

    setTimeout(() => setDoubleClick(0), 300);

    if (doubleClick === 1 && !!intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }
  };

  const resetWatch = () => {
    if (!!intervalRef) clearInterval(intervalRef);
    startStopWatch()
  };

  return (
    <>
      <div>
        {hour >= 10 ? hour : "0" + hour} : {min >= 10 ? min : "0" + min} :{" "}
        {sec >= 10 ? sec : "0" + sec}
        <button onClick={startStopWatch}>Start/Stop</button>
      </div>
      <div>
        <button onClick={waitWatch}>Wait</button>
      </div>
      <div>
        <button onClick={resetWatch}>Reset</button>
      </div>
    </>
  );
}

export default App;
