import { defineStore } from 'pinia'
import { Howl } from 'howler'

const AUDIO_SRC =
  'https://res.cloudinary.com/controlla/video/upload/v1662314937/perseverancia/McCanick_320kbps_qtukua.mp3'

export const useAudioStore = defineStore('audio', {
  state: () => {
    const playAudioCookie = useCookie('playAudio', { default: () => 'true' })
    const playAudio = playAudioCookie.value === 'true'

    return {
      playAudio,
      sound: null as Howl | null
    }
  },
  actions: {
    initializeSound() {
      if (this.sound) return
      this.sound = new Howl({
        src: [AUDIO_SRC],
        loop: true,
        autoplay: false,
        volume: 0.5
      })
    },
    playAudioAfterUserGesture() {
      if (this.sound && this.playAudio) {
        this.sound.play()
      }
    },
    togglePlayAudio() {
      this.playAudio = !this.playAudio
      useCookie('playAudio').value = this.playAudio.toString()

      if (this.playAudio) {
        this.initializeSound()
        this.playAudioAfterUserGesture()
      } else {
        this.sound?.stop()
      }
    }
  }
})
