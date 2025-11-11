import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurveyByIndex, deleteSurvey } from "../utils/surveyStorage";
import useKeyboardNavigation from "../utils/useKeyboardNavigation";
import SoundManager from "../utils/SoundManager";
import ConfirmModal from "../utils/confirmModal";

const PreviewSurvey = () => {

  const { index } = useParams();
  const indexString = toString(index);
  const survey = getSurveyByIndex(parseInt(index, 10));
  console.log(indexString);

  useKeyboardNavigation(
    {
    "Backspace": "/list-survey"
    },
    () => {
      return {"e":`/edit-survey/${index}`};
    }
  );

  const navigate = useNavigate();

  
  if (!survey) {
    return <p>survey tidak ditemukan.</p>
  }

  const handleDelete = () => {

    SoundManager.playClickSound();

    const deleteProccess = deleteSurvey(index);

    if (deleteProccess) {
      navigate("/list-survey");
    } else {
      return deleteProccess;
    }

  };

  return (
    <>
      <div className="text-center">
        <h2 className="mb-2">Preview Survey</h2>
        <div className="card text-white bg-primary mb-3 px-3 py-2 card-78">
          <div className="card-body">
            <h2 className="card-questions mt-3">
              {survey.question}
            </h2>
          </div>
        </div>
      </div>
      <div className="container my-1">
        <div className="row">
          <div className="col-md-6">
            {survey.answers.slice(0,5).map((item, index) => (
              <div className="list-item" key={index}>
                <div className="list-card card-78" data-key="1">
                  <div>{index + 1}.</div>
                  <div className="answer">{item.answer}</div>
                  <div className="number-circle">{item.points}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            {survey.answers.slice(5,10).map((item, index) => (
              <div className="list-item" key={index + 5}>
                <div className="list-card card-78" data-key="1">
                  <div>{index + 6}.</div>
                  <div className="answer">{item.answer}</div>
                  <div className="number-circle">{item.points}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <button className="btn-lg button-77 xlg" onClick={()=>{navigate("/list-survey");SoundManager.playClickSound();}}>
          kembali
          <span className="btn-key" data-key="">
            [Backspace]
          </span>
        </button>
        <button className="btn-lg button-77 xlg" data-key="Enter" onClick={()=>{navigate(`/edit-survey/${index}`);SoundManager.playClickSound();}}>
          EDIt <span className="btn-key">[E]</span>
        </button>
        <button className="btn-lg button-77 xlg" data-key="Enter" onClick={()=>ConfirmModal.call_confirm("Yakin Ingin Menghapus Survey?",handleDelete)}>
          HAPUS
        </button>
      </div>
      <button className="btn btn-primary btn-sm info">
        <i className="bi bi-info-circle" data-key="i"></i>
      </button>
    </>
  );
};

export default PreviewSurvey;
