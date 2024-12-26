import { defineStore } from 'pinia'
import { Howl } from 'howler'

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
    initializeSound(src: string) {
      this.sound = new Howl({
        src: [src],
        loop: true,
        autoplay: false,
        volume: 0.5
      })
      if (this.playAudio) {
        this.playAudioAfterUserGesture()
      }
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
        this.playAudioAfterUserGesture()
      } else {
        this.sound?.stop()
      }
    }
  }
})
