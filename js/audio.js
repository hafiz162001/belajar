/**
 * TOEFL Listening Audio Engine
 * Menggunakan Web Speech Synthesis API dengan simulasi suara multi-pembicara (Man, Woman, Narrator, Professor)
 * serta visualizer gelombang suara & pengatur kecepatan audio.
 */

export const AudioPlayer = {
  synth: typeof window !== "undefined" && window.speechSynthesis ? window.speechSynthesis : null,
  currentUtterance: null,
  isPlaying: false,
  playbackRate: 1.0,
  onStateChange: null,

  // Deteksi ketersediaan Speech Synthesis
  isSupported() {
    return !!this.synth;
  },

  // Putar dialog bergantian
  playDialogue(dialogueLines, onComplete = null) {
    if (!this.synth) {
      if (onComplete) onComplete();
      return;
    }

    this.stop();
    this.isPlaying = true;
    if (this.onStateChange) this.onStateChange({ isPlaying: true });

    let currentLineIndex = 0;

    const speakNext = () => {
      if (!this.isPlaying) return;

      if (currentLineIndex >= dialogueLines.length) {
        this.isPlaying = false;
        if (this.onStateChange) this.onStateChange({ isPlaying: false, activeSpeaker: null });
        if (onComplete) onComplete();
        return;
      }

      const line = dialogueLines[currentLineIndex];
      const utterance = new SpeechSynthesisUtterance(line.text);
      utterance.lang = "en-US";
      utterance.rate = this.playbackRate;

      // Karakterisasi suara berdasarkan pembicara
      if (line.speaker.toLowerCase().includes("woman")) {
        utterance.pitch = 1.25;
      } else if (line.speaker.toLowerCase().includes("man")) {
        utterance.pitch = 0.85;
      } else if (line.speaker.toLowerCase().includes("narrator")) {
        utterance.pitch = 1.0;
        utterance.rate = this.playbackRate * 0.95;
      } else {
        utterance.pitch = 1.0;
      }

      if (this.onStateChange) {
        this.onStateChange({
          isPlaying: true,
          activeSpeaker: line.speaker,
          activeText: line.text,
          lineIndex: currentLineIndex
        });
      }

      utterance.onend = () => {
        currentLineIndex++;
        // Beri jeda kecil antar kalimat
        setTimeout(speakNext, 400);
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        currentLineIndex++;
        setTimeout(speakNext, 200);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    };

    speakNext();
  },

  stop() {
    this.isPlaying = false;
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.onStateChange) {
      this.onStateChange({ isPlaying: false, activeSpeaker: null });
    }
  },

  setSpeed(rate) {
    this.playbackRate = rate;
  }
};
