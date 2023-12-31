/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable-next-line react/no-array-index-key */

import { useState } from 'react';
import COLORS from '../../constant/colors';
import useTimeMachine from '../../hooks/useTimeMachine';
import './TimeMachine.scss';

function TimeMachine() {
  const [currentColorIndex, setCurrentColorIndex] = useState<number | null>(null);
  const {
    lastValueStored,
    history,
    timeIndex,
    isTraveling,
    updateHistory,
    updateIndex,
    updateIsTraveling,
  } = useTimeMachine<number[]>([]);

  const handleColorClick = (index: number) => {
    const lastIndex = lastValueStored.current && history[history.indexOf(lastValueStored.current)];
    if (index !== lastIndex) {
      setCurrentColorIndex(index);
      updateHistory([...history, index]);
      updateIndex(history.length);
    }
  };

  const handleNextClick = () => {
    if (timeIndex < history.length - 1) {
      const nextIndex = timeIndex + 1;
      setCurrentColorIndex(history[nextIndex]);
      updateIndex(nextIndex);
      updateIsTraveling(true);
    }
  };

  const handlePrevClick = () => {
    if (timeIndex > 0) {
      const prevIndex = timeIndex - 1;
      setCurrentColorIndex(history[prevIndex]);
      updateIndex(prevIndex);
      updateIsTraveling(true);
    }
  };

  const handleResumeClick = () => {
    if (isTraveling && lastValueStored.current !== undefined) {
      setCurrentColorIndex(history[history.indexOf(lastValueStored.current)]);
      updateIndex(history.indexOf(lastValueStored.current));
      updateIsTraveling(false);
    }
  };

  return (
    <div className="timeMachine">
      <div className="timeMachine__container">
        <div className="timeMachine__grid">
          {COLORS.map((color, index) => (
            <div
              role="presentation"
              key={index}
              className="timeMachine__gridItems"
              style={{
                backgroundColor: color,
                opacity: currentColorIndex === index ? 1 : 0.20,
                pointerEvents: isTraveling ? 'none' : 'auto',
              }}
              onClick={() => handleColorClick(index)}
            />
          ))}
        </div>
        <div className="timeMachine__options">
          <button onClick={handleNextClick} disabled={timeIndex === history.length - 1} type="button">
            Next
          </button>
          <button onClick={handlePrevClick} disabled={timeIndex === -1 || timeIndex === 0} type="button">
            Previous
          </button>
          <button onClick={handleResumeClick} disabled={timeIndex === history.length - 1} type="button">
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}
export default TimeMachine;
