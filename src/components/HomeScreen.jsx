import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SoundManager from "./utils/SoundManager";
import useKeyboardNavigation from "./utils/useKeyboardNavigation";
import Hint from "./../images/hint.svg";
import ConfimModal from "./utils/confirmModal";

const HomeScreen = () => {
  const navigate = useNavigate();

  // Handler keyika totmbol "Mulai!" diklik
  const handleStart = () => {
    navigate("/main-menu");
    // SoundManager.playClickSound();
  };

  useKeyboardNavigation({ Enter: "/main-menu" });

  const closeApp = () => {
    if (window.electronAPI) {
      window.electronAPI.closeApp();
    } else {
      console.error("window.electronAPI tidak ditemukan.");
    }
  };

  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key === "Enter") {
        SoundManager.playBacksoundSound();
      }

      if (event.key === "Escape") {
        ConfimModal.call_confirm("Keluar Dari aplikasi?", () => closeApp());
      }
    };

    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.addEventListener("keydown", handleEnterKey);
    };
  }, []);

  return (
    <div onClick={() => SoundManager.playBacksoundSound()}>
      <div className="flex justify-center text-center">
        <h1 className="text-slate-900 text-2xl">Card Quis Clash Game!</h1>
        <img src={Hint} alt="icon app" className="img-fluid" width="500" />
        <br></br>
        {/* <h1>quis family anime 100!</h1> */}
        <button className="btn btn-primary btn-lg xlg" onClick={handleStart}>
          Mulai! <span className="btn-key light">[Enters]</span>
        </button>
        <button
          className="btn btn-danger btn-lg xlg"
          onClick={() =>
            ConfimModal.call_confirm("Keluar Dari aplikasi?", () => {
              closeApp();
            })
          }
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
