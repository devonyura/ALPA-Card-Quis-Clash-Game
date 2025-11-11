import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SoundManager from "./SoundManager";

const useKeyboardNavigation = (
  staticRoutes = {},
  dynamicRoutes = () => ({})
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      const pressedKey = event.key; // Ambil tombol yang sedang ditekan
      console.log("Tombol yang ditekan:", pressedKey);

      const dynamicKeys = dynamicRoutes(pressedKey); // Kirim tombol yang ditekan ke callback
      const allRoutes = { ...staticRoutes, ...dynamicKeys };

      if (allRoutes[pressedKey]) {
        SoundManager.playClickSound();
        navigate(allRoutes[pressedKey]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate, staticRoutes, dynamicRoutes]);
};

export default useKeyboardNavigation;
