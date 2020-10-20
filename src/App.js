import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { SVGCircleWork, SVGCircleRest } from './Circle'
import { data } from './data'
import Exercise from './Exercise';


function App() {
  const [seconds, setSeconds] = useState(5);
  const [breaks, setBreaks] = useState(15);
  const [toggleButton, settoggleButton] = useState(false);
  const [hideTime, sethideTime] = useState(true)
  const [hideBreak, sethideBreak] = useState(false)
  const [pointer, setPointer] = useState(1)
  const [workout, setWorkout] = useState(data)

  const id = useRef(null);

  const clear = () => {
    clearInterval(id.current);
  };

  const toggle = () => {
    settoggleButton(!toggleButton);
  }

  const reset = () => {
    setSeconds(45);
    setBreaks(15);
  }

  const next = () => {
    const imgLength = workout.length;
    const newPointer = pointer === imgLength - 1 ? 0 : pointer + 1;
    setPointer(newPointer);
    setSeconds(45);
    setBreaks(0);
    settoggleButton(!toggleButton);
  }

  const previous = () => {
    const imgLength = workout.length;
    const newPointer = pointer === 0 ? imgLength - 1 : pointer - 1;
    setPointer(newPointer);
    setSeconds(45);
    setBreaks(0);
    settoggleButton(!toggleButton);
  }

  useEffect(() => {
    let interval = null;

    if (toggleButton) {
      id.current = setInterval(() => {
        setSeconds(seconds => seconds - 1);

      }, 1000);
    }
    else if (!toggleButton && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clear();
  }, [toggleButton, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      clear();
      sethideTime(false);
      sethideBreak(true);
      setPointer(p => p + 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
      id.current = setInterval(() => {
        setBreaks((breaks) => breaks - 1)
      }, 1000)
    }
    if (breaks === 0) {
      clear();
      reset();
      sethideTime(true);
      sethideBreak(false);
    }
    return () => clear();
  }, [breaks, seconds])

  const secondsRadius = mapNumber(seconds, 45, 0, 0, 360);
  const breaksRadius = mapNumber(breaks, 15, 0, 0, 360);

  return (
    <div className="container">
      <div className="timer-container">
        {hideTime && <p className="title">Workout time!</p>}
        {hideTime && <span className="timer">{seconds}</span>}
        {hideTime && <SVGCircleWork radius={secondsRadius} />}

        {hideBreak && <p className="title">Rest!</p>}
        {hideBreak && <span className="timer">{breaks}</span>}
        {hideBreak && <SVGCircleRest radius={breaksRadius} />}

        <div className="buttons">
          <button className="button-style" onClick={toggle}>{toggleButton ? <i className="fas fa-pause"></i> : <i className="fas fa-play" ></i>}  </button>
          <button className="button-style" onClick={reset}><i className="fas fa-undo-alt"></i></button>
        </div>

      </div>
      <div className="countdown">
        {hideTime && <p className="exercise-title">Current exercise:</p>}
        {hideBreak && <p className="exercise-title">Next exercise:</p>}
        {workout.map((items, id) => {
          if (items.id === pointer)
            return <Exercise key={items.id} items={items} previous={previous} next={next} pointer={pointer} />

        })}
      </div>
    </div>
  );
}

export default App;

function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}