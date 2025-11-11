import React from "react";
import { useNavigate } from "react-router-dom";
import useKeyboardNavigation from "./utils/useKeyboardNavigation";
import SoundManager from "./utils/SoundManager";
import Information from "./../images/information.svg"
import Hint from "./../images/hint.svg"
import Play from "./../images/play.svg"
import SetUp from "./../images/set-up.svg"

const MainMenu = () => {

  const navigate = useNavigate();

  useKeyboardNavigation({
    "1": "/list-card-survey",
    "2": "/how-to-play",
    "3": "/list-survey",
    "i": "/about",
    "Backspace": "/"
  });

  return (
    <div className="py-5" id="apps">
      <div className="row align-content-center text-center">
        <h1 className="text-center mb-5">quis family anime 100!</h1>
        <div className="col d-flex justify-content-center" onClick={()=>{navigate("/list-card-survey"); SoundManager.playClickSound();}}>
          <div
            className="card text-white bg-primary mb-3 px-4 py-4 card-78"
            data-key="1"
          >
            <div className="card-body">
              <img
                src={Play}
                alt="icon app"
                className="img-fluid"
                width="200"
              />
              <h2 className="card-title mt-3">main</h2>
              <span className="btn-key light">[1]</span>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-start">
          <div
            className="card text-white bg-primary mb-3 px-4 py-4 card-78"
            data-key="2"
          >
            <div className="card-body" onClick={()=>{navigate("/how-to-play"); SoundManager.playClickSound();}}>
              <img
                src={Information}
                alt="icon app"
                className="img-fluid"
                width="200"
              />
              <h2 className="card-title mt-3">cara bermain</h2>
              <span className="btn-key light">[2]</span>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-start" onClick={()=>{navigate("/list-survey");SoundManager.playClickSound();}}>
          <div
            className="card text-white bg-primary mb-3 px-4 py-4 card-78"
            data-key="3"
          >
            <div className="card-body">
              <img
                src={SetUp}
                alt="icon app"
                className="img-fluid"
                width="200"
              />
              <h2 className="card-title mt-3">setup</h2>
              <span className="btn-key light">[3]</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button className="btn-lg button-77 xlg" onClick={()=>{navigate("/");SoundManager.playClickSound();}}>
            Home screen
            <span className="btn-key" data-key="Backspace">
              [Backspace]
            </span>
          </button>
        </div>
      </div>
      <button className="btn btn-primary btn-lg info" onClick={()=>{navigate("/about"); SoundManager.playClickSound();}}>
        <i className="bi bi-info-circle" data-key="i"></i>
      </button>
    </div>
  );
};

export default MainMenu;
