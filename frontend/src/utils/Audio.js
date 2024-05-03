export default class MusicPlayer {
  constructor(path) {
    this.audio = new Audio(path);
  }

  playMusic() {
    this.audio.loop = true;
    this.audio.play();
  }

  stopMusic() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  playSoundEffect(effectName) {
    const effect = new Audio(effectName);
    effect.play();
  }
}
