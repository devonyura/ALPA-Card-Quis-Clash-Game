// src/router.jsx
import { createHashRouter } from "react-router-dom";

// Import semua komponen
import HomeScreen from "./components/HomeScreen";
import MainMenu from "./components/MainMenu";
import HowToPlay from "./components/HowToPlay";
import ListSurvey from "./components/setup/ListSurvey";
import AddSurvey from "./components/setup/AddSurvey";
import PreviewSurvey from "./components/setup/PreviewSurvey";
import EditSurvey from "./components/setup/EditSurvey";
import ListCardSurvey from "./components/gameplay/ListCardSurvey";
import MainQuisSurvey from "./components/gameplay/MainQuisSurvey";
import About from "./components/About";
import Layout from "./components/layout/Layout";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Terjadi kesalahan aplikasi</div>,
    children: [
      // Home Section
      { index: true, element: <HomeScreen /> },
      { path: "main-menu", element: <MainMenu /> },
      { path: "how-to-play", element: <HowToPlay /> },
      { path: "about", element: <About /> },

      // Setup Section
      { path: "list-survey", element: <ListSurvey /> },
      { path: "add-survey", element: <AddSurvey /> },
      { path: "preview-survey/:index", element: <PreviewSurvey /> },
      { path: "edit-survey/:index", element: <EditSurvey /> },

      // Gameplay Section
      { path: "list-card-survey", element: <ListCardSurvey /> },
      { path: "main-quis-survey/:index", element: <MainQuisSurvey /> },
    ],
  },
]);
