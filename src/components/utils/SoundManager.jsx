class SoundManager {
  // Menyimpan semua objek audio
  static sounds = {};
  static backsoundAudio = null; // Objek khusus untuk backsound
  static volume = localStorage.getItem("soundVolume")
    ? parseFloat(localStorage.getItem("soundVolume"))
    : 1.0;
  static isBacksoundPaused = false;

  // Daftar file audio (kecuali backsound)
  static soundFiles = [
    "click-sound",
    "correct-answer",
    "intro-survey",
    "revealed-survey",
    "top-survey",
    "waiting-survey",
    "wrong-answer",
    "winner",
    "revealed-all-survey",
  ];

  // Daftar suara yang harus menghentikan backsound lebih lama
  static longPauseSounds = ["winner", "intro-survey"];

  // Load semua sound di awal, kecuali backsound (backsound di-load terpisah)
  static loadSounds() {
    this.soundFiles.forEach((name) => {
      this.sounds[name] = new Audio(`/assets/sounds/${name}.ogg`);
      this.sounds[name].volume = this.volume;
      this.sounds[name].preload = "auto"; // Preload agar tidak delay saat diputar pertama kali
    });

    // Load khusus backsound
    this.backsoundAudio = new Audio(`/assets/sounds/backsound.ogg`);
    this.backsoundAudio.volume = this.volume;
    this.backsoundAudio.loop = true;
    this.backsoundAudio.preload = "auto";
  }

  // **Getter khusus untuk backsound**
  static getBacksoundSound() {
    return this.backsoundAudio;
  }

  // **Putar backsound**
  static playBacksoundSound() {
    if (!this.backsoundAudio.paused) return; // Jika backsound sudah diputar, abaikan
    this.backsoundAudio
      .play()
      .then(() => console.log("Backsound diputar"))
      .catch((error) => console.error("Gagal memutar backsound:", error));
  }

  // **Pause backsound sementara**
  static pauseBacksound() {
    if (!this.backsoundAudio.paused) {
      this.backsoundAudio.pause();
      this.isBacksoundPaused = true;
    }
  }

  // **Lanjutkan backsound jika tidak ada suara lain yang sedang dimainkan**
  static resumeBacksound() {
    setTimeout(() => {
      const isAnySoundPlaying = this.soundFiles.some(
        (name) => this.sounds[name] && !this.sounds[name].paused
      );
      const isLongPausePlaying = this.longPauseSounds.some(
        (name) => this.sounds[name] && !this.sounds[name].paused
      );

      // Jangan lanjutkan backsound jika masih ada suara penting yang berjalan
      if (!isAnySoundPlaying && this.isBacksoundPaused && !isLongPausePlaying) {
        this.playBacksoundSound();
        this.isBacksoundPaused = false;
      }
    }, 500);
  }

  // **Getter suara selain backsound**
  static getSound(name) {
    return this.sounds[name] || null;
  }

  // **Method umum untuk memainkan suara (kecuali backsound)**
  static playSound(name, shouldPauseBacksound = false) {
    const sound = this.getSound(name);
    if (sound) {
      if (shouldPauseBacksound) {
        this.pauseBacksound();
      }

      sound.currentTime = 0; // Reset waktu agar bisa diputar ulang cepat
      sound
        .play()
        .then(() => {
          console.log(`${name} diputar`);
          sound.onended = () => {
            console.log(`${name} selesai`);
            this.resumeBacksound(); // Kembalikan backsound setelah selesai
          };
        })
        .catch((error) => console.error(`Gagal memutar ${name}:`, error));
    }
  }

  static stopSound(name) {
    const sound = this.getSound(name);
    if (sound) {
      sound.pause();
      sound.currentTime = 0; // Reset waktu agar bisa diputar ulang cepat
    }
  }

  // **Method pemutar suara penting (backsound akan dijeda)**
  static playCorrectAnswer() {
    this.playSound("correct-answer", true);
  }

  static playTopSurvey() {
    this.playSound("top-survey", true);
  }

  static playWaitingSurvey() {
    this.playSound("waiting-survey", true);
  }

  static playWrongAnswer() {
    this.playSound("wrong-answer", true);
  }

  static playIntroSurvey() {
    this.playSound("intro-survey", true);
  }

  static playWinnerSurvey() {
    this.playSound("winner", true);
  }

  static playRevealedAllSurvey() {
    this.playSound("revealed-all-survey", true);
  }

  static playClickSound() {
    this.playSound("click-sound", false);
  }

  static playRevealedSurvey() {
    this.playSound("revealed-survey", false);
  }

  // **Set volume global (semua suara ikut berubah)**
  static setVolume(newVolume) {
    this.volume = newVolume;
    localStorage.setItem("soundVolume", newVolume);

    // Set volume untuk semua suara kecuali backsound
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = newVolume;
    });

    // Set volume backsound secara terpisah
    if (this.backsoundAudio) {
      this.backsoundAudio.volume = newVolume;
    }
  }
}

// **Load semua sound saat pertama kali diakses**
SoundManager.loadSounds();

// Ekspor agar bisa digunakan di komponen React
export default SoundManager;
