import { Audio } from 'expo-av';

// Audio player utility
class AudioPlayer {
  private sound: Audio.Sound | null = null;

  // Load and play audio from a URI
  async playAudio(uri: string): Promise<void> {
    try {
      // Unload any existing audio
      await this.unloadAudio();
      
      // Load new audio
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      
      this.sound = sound;
      
      // Unload when finished playing
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          this.unloadAudio();
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  // Unload audio to free resources
  async unloadAudio(): Promise<void> {
    if (this.sound) {
      try {
        await this.sound.unloadAsync();
        this.sound = null;
      } catch (error) {
        console.error('Error unloading audio:', error);
      }
    }
  }
}

export default new AudioPlayer();
