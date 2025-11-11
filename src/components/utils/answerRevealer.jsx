import {
  showCorrectOverlay,
  showTopSurveyOverlay,
  showWaitOverlay,
} from "./overlay";
import SoundManager from "./SoundManager";

// utils/answerRevealer.js
export default function createAnswerRevealer(
  setRevealedAnswers,
  setActiveButton
) {
  let timeoutId = null;

  const handleKeyDown = (event) => {
    const keyMap = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
      9: 8,
      0: 9,
    };

    if (keyMap.hasOwnProperty(event.key)) {
      const index = keyMap[event.key];

      if (!timeoutId) {
        setActiveButton(index);
        showWaitOverlay();
        SoundManager.playWaitingSurvey();
        timeoutId = setTimeout(() => {
          console.log(event.key);
          if (event.key === "1") {
            showTopSurveyOverlay();
            SoundManager.playTopSurvey();
          } else {
            showCorrectOverlay();
            SoundManager.playCorrectAnswer();
          }
          setTimeout(() => {
            setRevealedAnswers((prev) => [...prev, index]);
            SoundManager.playRevealedSurvey();
          }, 2800);
        }, 2500);
      }
    }
  };

  const handleKeyUp = (event) => {
    const keyMap = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6,
      8: 7,
      9: 8,
      0: 9,
    };

    if (keyMap.hasOwnProperty(event.key)) {
      clearTimeout(timeoutId);
      timeoutId = null;
      setActiveButton(null);
    }
  };

  return { handleKeyDown, handleKeyUp };
}
