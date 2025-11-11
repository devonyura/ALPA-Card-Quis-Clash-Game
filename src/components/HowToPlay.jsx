import React from "react";
import { useNavigate } from "react-router-dom";
import useKeyboardNavigation from "./utils/useKeyboardNavigation";
import SoundManager from "./utils/SoundManager";

const HowToPlay = () => {
  const navigate = useNavigate();

  useKeyboardNavigation({
    Backspace: "/main-menu",
  });

  return (
    <div className="row align-content-center">
      <div className="col d-flex justify-content-center">
        <div
          className="card text-white bg-primary mb-3 px-4 py-4 card-78 tutor"
          data-key="2"
        >
          <div className="card-body">
            <h1>cara bermain</h1>
            <ol className="list-group list-group-numbered text-start">
              <li className="list-group-item d-flex align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    pemain terdiri dari dua tim (biru & merah)
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <div className="fw-bold">
                  kedua tim mengajukan 1 orang untuk melakukan suit jepang
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <div className="fw-bold">
                  tim yang menang suit berhak memilih daftar survey yang akan
                  dimainkan dan berhak menjawab survey pertama kali.
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <div className="fw-bold">
                  jika jawaban benar akan mendapat skor sesuai poin jawaban
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <div className="fw-bold">
                  jika jawaban salah maka soal dilempar ke tim lawan
                </div>
              </li>
              <li className="list-group-item d-flex align-items-start">
                <div className="fw-bold">poin terbanyak adalah pemenangnya</div>
              </li>
            </ol>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default HowToPlay;
