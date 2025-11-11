import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSurveys, initializeSurveyData} from "../utils/surveyStorage";
import useKeyboardNavigation from "../utils/useKeyboardNavigation";
import SoundManager from "../utils/SoundManager";
import ConfirmModal from "../utils/confirmModal";


const ListSurvey = () => {
  
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  
  // Fetch data from localStorage
  useEffect(()=>{
    initializeSurveyData();
    const surveyFromStorage = getAllSurveys();
    setSurveys(surveyFromStorage);
  }, []);

  useKeyboardNavigation(
    {
      "Backspace": "/main-menu",
      "Enter": "/add-survey"
    },
    () => {
      const dynamicRoutes = {};
      surveys.forEach((_, index)=>{
        const key = (index + 1) % 10;
        dynamicRoutes[key] = `/preview-survey/${index}`; 
      })
      return dynamicRoutes;
    }
  );

  const handleBack = () => {
    navigate("/main-menu");
    SoundManager.playClickSound();
  }

  return (
    <>
      <div className="text-center">
        <h2 className="mb-2">SEtup menu</h2>
        <div className="card text-white bg-primary mb-3 px-3 py-2 card-78">
          <div className="card-body">
            <h2 className="card-questions mt-1">Daftar Survey</h2>
          </div>
        </div>
      </div>
      <div className="container my-1">
        <div className="row">
          <div className="col-md-12 list-survey">
            {surveys.map((survey, index)=>(
              <div className="list-item" key={index}>
                <div className="list-card card-78" data-key="">
                  <div>{index + 1}.</div>
                  <div className="answer">
                    {survey.question}
                  </div>
                  <button className="btn-lg button-77 xlg">
                    <span className="btn-key" onClick={()=>{navigate(`/preview-survey/${index}`);SoundManager.playClickSound();}}>
                      Lihat Lengkap [{index + 1 % 10}]
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <button className="btn-lg button-77 xlg" data-key="Backspace" onClick={()=>ConfirmModal.call_confirm("Yakin",handleBack)}>
          Back
          <span className="btn-key">[Backspace]</span>
        </button>
        <button className="btn-lg button-77 xlg"  data-key="Enter" onClick={()=>{navigate("/add-survey");SoundManager.playClickSound();}}>
          Tambah survey
          <span className="btn-key">[ENTER]</span>
        </button>
      </div>
    </>
  );
};

export default ListSurvey;
