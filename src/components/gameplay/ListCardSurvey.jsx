import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSurveys } from "../utils/surveyStorage";
import useKeyboardNavigation from "../utils/useKeyboardNavigation";
import SoundManager from "../utils/SoundManager";
import ConfirmModal from "../utils/confirmModal";
import { showWinnerOverlay } from "../utils/overlay";

const ListCardSurvey = () => {
  const surveys = getAllSurveys();
  const navigate = useNavigate();

  const [teamRedPoints, setTeamRedPoints] = useState(
    () => parseInt(localStorage.getItem("teamRedPoints")) || 0
  );
  const [teamBluePoints, setTeamBluePoints] = useState(
    () => parseInt(localStorage.getItem("teamBluePoints")) || 0
  );

  // Simpan poin tim merah dan biru ke localStorage saat ada perubahan
  useEffect(() => {
    localStorage.setItem("teamRedPoints", teamRedPoints);
    localStorage.setItem("teamBluePoints", teamBluePoints);
  }, [teamRedPoints, teamBluePoints]);

  // Tambahkan event listener untuk menangani tombol 'r' dan 'y' untuk reset
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "r") {
        SoundManager.playClickSound();

        ConfirmModal.call_confirm("Reset Skor kedua tim?", () => {
          setTeamBluePoints(0);
          setTeamRedPoints(0);
          localStorage.setItem("teamRedPoints", "0");
          localStorage.setItem("teamBluePoints", "0");
        });
      }

      if (event.key === "w") {
        const winner = teamBluePoints > teamRedPoints ? "blue" : "red";
        const points =
          teamBluePoints > teamRedPoints ? teamBluePoints : teamRedPoints;
        console.log("Winner:", winner);
        console.log("points:", points);
        ConfirmModal.call_confirm("Tampilkan Pemenang", () => {
          SoundManager.playWinnerSurvey();
          showWinnerOverlay(winner, points);
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [teamBluePoints, teamRedPoints]);

  // Navigasi ke survey dan tandai sebagai sudah dikunjungi

  // Navigasi dengan keyboard (memastikan tidak menambahkan visitedSurveys yang sudah dihapus)
  useKeyboardNavigation(
    {
      Backspace: "/main-menu",
    },
    () => {
      const dynamicRoutes = {};
      surveys.forEach((_, index) => {
        const key = (index + 1) % 10;
        dynamicRoutes[key] = `/main-quis-survey/${index}`;
      });
      return dynamicRoutes;
    }
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w") {
        const winner = teamBluePoints > teamRedPoints ? "blue" : "red";
        const points =
          teamBluePoints > teamRedPoints ? teamBluePoints : teamRedPoints;
        ConfirmModal.call_confirm("Tampilkan Pemenang", () => {
          SoundManager.playWinnerSurvey();
          showWinnerOverlay(winner, points);
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [teamBluePoints, teamRedPoints]);

  return (
    <>
      <h1 className="text-center mb-2">Pilih survey yang ingin dimainkan</h1>
      <div className="row row-cols-4 g-4">
        {surveys.map((survey, index) => {
          return (
            <div className="col d-flex justify-content-center" key={index}>
              <div
                className={`card text-white bg-primary mb-3 px-4 py-4 card-78`}
              >
                <div className="card-body">
                  <h1 className="card-title mt-3 no">#{(index + 1) % 10}</h1>
                  <h2 className="card-title mt-3">Survey</h2>
                  <span className="btn-key light">[{(index + 1) % 10}]</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tim Merah & Tim Biru */}
      <div className="row container my-1 mt-4 point d-flex justify-content-center">
        <div className="col-md-6 d-flex justify-content-center">
          <div className="list-item">
            <div className="list-card card-78 red">
              <div>TIM MERAH</div>
              <div className="number-circle point">{teamRedPoints}</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <div className="list-item">
            <div className="list-card card-78 blue">
              <div>TIM BIRU</div>
              <div className="number-circle point">{teamBluePoints}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Kembali */}
      <div className="mt-2 text-center">
        <button
          className="btn-lg button-77 xlg"
          onClick={() => navigate("/main-menu")}
        >
          Main Menu{" "}
          <span className="btn-key" data-key="Backspace">
            [Backspace]
          </span>
        </button>
      </div>
      <div className="wrap-overlay"></div>
    </>
  );
};

export default ListCardSurvey;
