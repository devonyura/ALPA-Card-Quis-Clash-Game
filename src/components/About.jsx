import React from "react";
import { useNavigate } from "react-router-dom";
import useKeyboardNavigation from "./utils/useKeyboardNavigation";
import SoundManager from "./utils/SoundManager";
import ProfilePic from "./../images/profile.jpg";

const About = () => {
  const navigate = useNavigate();

  useKeyboardNavigation({
    Backspace: "/main-menu",
  });

  return (
    <div className="row align-content-center">
      <div className="col d-flex justify-content-center">
        <div
          className="card text-white bg-primary mb-3 px-4 card-78 tutor"
          data-key="2"
        >
          <div className="card-body">
            <div className="mt-5 text-center">
              <button
                className="btn-lg button-77 xlg"
                onClick={() => {
                  navigate("/main-menu");
                  SoundManager.playClickSound();
                }}
              >
                Main Menu
                <span className="btn-key" data-key="Backspace">
                  [Backspace]
                </span>
              </button>
            </div>
            <h1>About</h1>
            <h2>Aplikasi ini dibuat untuk hiburan. family Anime 100!</h2>
            <p>
              <img
                src={ProfilePic}
                style={{ width: 200, borderRadius: 500 }}
                className="img-responsive"
              />
            </p>
            <p className="text-primary">dibuat dengan 💖 dari @devonyura</p>
            <h2 className="text-secondary">family Anime 100 Ver.1.0</h2>
            <h2>Credits</h2>
            <div className="row" style={{ width: 86 + "vw", margin: "auto" }}>
              <div className="col md-3">
                <p>
                  Sound Effect by{" "}
                  <a href="https://pixabay.com/users/voicebosch-30143949/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=182476">
                    Otto
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=182476">
                    Pixabay
                  </a>
                </p>
                <p>
                  Sound Effect by{" "}
                  <a href="https://pixabay.com/users/tomas_herudek-45372583/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=257485">
                    Tomáš Herudek
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=257485">
                    Pixabay
                  </a>
                </p>
              </div>
              <div className="col md-3">
                <p>
                  Sound Effect by{" "}
                  <a href="https://pixabay.com/users/audiosto-40753689/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183620">
                    Audiosto
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183620">
                    Pixabay
                  </a>
                </p>
                <p>
                  Sound Effect by{" "}
                  <a href="https://pixabay.com/users/eritnhut1992-25656588/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=20582">
                    Nhựt Bùi
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=20582">
                    Pixabay
                  </a>
                </p>
              </div>
              <div className="col md-3">
                <p>
                  Sound Effect by{" "}
                  <a href="https://pixabay.com/users/floraphonic-38928062/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183921">
                    floraphonic
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183921">
                    Pixabay
                  </a>
                </p>
                <p>
                  Sound Effect by{" "}
                  <a href="https://pixabay.com/users/emircanalp-17632163/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=125029">
                    EMİRCAN ALP
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=125029">
                    Pixabay
                  </a>
                </p>
              </div>
              <div className="col md-3">
                <p>
                  Sound Effect by{" "}
                  <a href="https://pixabay.com/users/floraphonic-38928062/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183922">
                    floraphonic
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183922">
                    Pixabay
                  </a>
                </p>
                <p>
                  Music by{" "}
                  <a href="https://pixabay.com/users/backgroundmusicforvideos-46459014/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=259693">
                    Maksym Malko
                  </a>{" "}
                  from{" "}
                  <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=259693">
                    Pixabay
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
