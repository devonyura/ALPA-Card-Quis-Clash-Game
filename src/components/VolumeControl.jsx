import React, { useState } from "react";
import SoundManager from "./utils/SoundManager";

const VolumeControl = () => {
  const [volume, setVolume] = useState(SoundManager.volume);

  // Mengubah volume
  const handleVolumeChange = (event) => {
    SoundManager.playClickSound();
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    SoundManager.setVolume(newVolume);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
      }}
    >
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeControl;
