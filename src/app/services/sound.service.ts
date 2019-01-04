import { Howl } from 'howler';

export class SoundService {
  public playSound(): void {
    const sound = new Howl({
      src: [require('../../../assets/sounds/1.mp3')],
      html5: true
    });
    sound.play();
  }
}
