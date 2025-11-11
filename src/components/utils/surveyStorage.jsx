// Utility untuk CRUD data survey menggunakan localStorage
const SURVEY_KEY = "surveyData";

// Data survey default
const defaultSurveyData = [
	{
		question: "Siapa karakter anime terpopuler?",
		answers: [
			{ answer: "Naruto", points: 35 },
			{ answer: "Goku", points: 30 },
			{ answer: "Luffy", points: 20 },
			{ answer: "Eren", points: 15 },
			{ answer: "Deku", points: 10 },
			{ answer: "Sasuke", points: 5 },
			{ answer: "Itachi", points: 3 },
			{ answer: "Zoro", points: 2 },
			{ answer: "Levi", points: 1 },
			{ answer: "Gojo", points: 1 },
		],
	},
];

// Inisialisasi data survey di localStorage jika belum ada
export  function initializeSurveyData() {
	let existingData = localStorage.getItem(SURVEY_KEY);
	existingData = JSON.parse(existingData);

	if (!existingData || existingData.length === 0) {
		localStorage.setItem(SURVEY_KEY, JSON.stringify(defaultSurveyData));
	}
}

// Mendapatkan semua data survey dari localStorage
export  function getAllSurveys() {
	const data = localStorage.getItem(SURVEY_KEY);      
	return data ? JSON.parse(data) : [];
}

// Mendapatkan satu survey berdasarkan indeks
export function getSurveyByIndex(index) {
	const surveys = getAllSurveys();
	if (index >= 0 && index < surveys.length) {
		return surveys[index];
	} else {
		throw new Error("Index survey tidak valid");
	}
}

// Menambahkan survey baru ke localStorage
export  function addSurvey(newSurvey) {
	const surveys = getAllSurveys();
	surveys.push(newSurvey);
	localStorage.setItem(SURVEY_KEY, JSON.stringify(surveys));
}

// Mengupdate survey berdasarkan indeks
export  function updateSurvey(index, updatedSurvey) {
	const surveys = getAllSurveys();
	if (index >= 0 && index < surveys.length) {
		surveys[index] = updatedSurvey;
		localStorage.setItem(SURVEY_KEY, JSON.stringify(surveys));
	} else {
		throw new Error("Index survey tidak valid");
	}
}

// Menghapus survey berdasarkan indeks
export  function deleteSurvey(index) {
	const surveys = getAllSurveys();
	if (index >= 0 && index < surveys.length) {
		surveys.splice(index, 1);
		localStorage.setItem(SURVEY_KEY, JSON.stringify(surveys));
		return true;
	} else {
		throw new Error("Index survey tidak valid");
	}
}