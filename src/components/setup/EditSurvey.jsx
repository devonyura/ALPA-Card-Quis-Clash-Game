import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateSurvey, getSurveyByIndex } from "../utils/surveyStorage";
import SoundManager from "../utils/SoundManager";
import ConfirmModal from "../utils/confirmModal";

const EditSurvey = () => {

  const {index} = useParams();

  const navigate = useNavigate();

  // State untuk menyimpan inputan
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(Array(10).fill(""));
	const [points, setPoints] = useState(Array(10).fill(""));

  // Ambil data survey
  useEffect(()=>{
    const oldSurvey = getSurveyByIndex(index);
    if (oldSurvey) {
      setQuestion(oldSurvey.question);
      setAnswers(oldSurvey.answers.map( a => a.answer));
      setPoints(oldSurvey.answers.map( a => a.points.toString()));
    }
  }, [index]);


  const handleSaveSurvey = () => {

		SoundManager.playClickSound();

		// Validasi input
		if (!question.trim() || answers.some(a => !a.trim()) || points.some(p => p === "")) {
			alert("Harap isi semua input sebelum menyimpan.");
			return;
		}

		// Format data survey
		const updatedSurvey = {
			question,
			answers: answers.map((answer, index) => ({
				answer,
				points: parseInt(points[index], 10) || 0
			}))
		};

		// Simpan survey
		updateSurvey(index ,updatedSurvey);

		// Redirect ke halaman list survey
		navigate(`/preview-survey/${index}`);
	};

	const handleAnswerChange = (index, value) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
	};

	const handlePointChange = (index, value) => {
		const newPoints = [...points];
		newPoints[index] = value;
		setPoints(newPoints);
	};

	const inputRef = useRef(null);

	useEffect(() => {
		// Saat komponen dimuat, fokuskan ke input
		if (inputRef.current) {
		inputRef.current.focus();
		}
	}, []);

	const handleBack = () => {
		navigate("/list-survey");
		SoundManager.playClickSound();
	}

  return (
    <>
      <div className="text-center">
				<h2 className="mb-2">Edit Survey</h2>
				<div className="card text-white bg-primary mb-3 px-3 py-2 card-78 form">
					<div className="card-body">
						<input
							type="text"
							className="form-control card-questions text-center"
							ref={inputRef}
							placeholder="Masukkan soal survey di sini"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="container my-1">
				<div className="row">
					{/* Kolom pertama (jawaban 1-5) */}
					<div className="col-md-6">
						{answers.slice(0, 5).map((answer, index) => (
							<div className="list-item" key={index}>
								<div className="list-card card-78">
									<div>{index + 1}.</div>
									<div className="answer">
										<input
											type="text"
											className="form-control text-center"
											placeholder={`Isi jawaban top survey #${index + 1}`}
											value={answer}
											onChange={(e) => handleAnswerChange(index, e.target.value)}
										/>
									</div>
									<div className="number-circle form">
										<input
											type="number"
											maxLength="3"
											className="form-control text-center"
											placeholder="No"
											value={points[index]}
											onChange={(e) => handlePointChange(index, e.target.value)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Kolom kedua (jawaban 6-10) */}
					<div className="col-md-6">
						{answers.slice(5, 10).map((answer, index) => (
							<div className="list-item" key={index + 5}>
								<div className="list-card card-78">
									<div>{index + 6}.</div>
									<div className="answer">
										<input
											type="text"
											className="form-control text-center"
											placeholder={`Isi jawaban top survey #${index + 6}`}
											value={answer}
											onChange={(e) => handleAnswerChange(index + 5, e.target.value)}
										/>
									</div>
									<div className="number-circle form">
										<input
											type="number"
											maxLength="3"
											className="form-control text-center"
											placeholder="No"
											value={points[index + 5]}
											onChange={(e) => handlePointChange(index + 5, e.target.value)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="mt-2 text-center">
				<button className="btn-lg button-77 xlg" onClick={() => {ConfirmModal.call_confirm("Batal Melakukan Edit?", handleBack)}}>
					Back
				</button>
				<button className="btn-lg button-77 xlg" data-key="Enter" onClick={handleSaveSurvey}>
					SIMPAN
				</button>
			</div>
    </>
  );
};

export default EditSurvey;
