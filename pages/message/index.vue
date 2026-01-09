<template lang="pug">
main(ref="message")
  div
    section#page-message.page.page-message
      .vertical-align
        .vertical-align-item
          p.center Mensaje del Venerable Maestro
          br
          p.text &nbsp; &nbsp; &nbsp; Es un honor dirigirme a ustedes como Venerable Maestro del Ciclo Masónico 2026 de la Respetable Logia Simbólica “Memento Mori” N.° 107. Damos inicio a este nuevo ciclo reafirmando nuestro compromiso con la reflexión consciente, el trabajo interior y la responsabilidad que implica formar parte de una institución dedicada al desarrollo humano y moral.
            br
            | &nbsp; &nbsp; &nbsp; El nombre de nuestra Logia, Memento Mori, encierra un significado profundo: recordar la finitud de la vida como una invitación a vivir con propósito, actuar con rectitud y valorar el tiempo como un recurso invaluable. Esta reflexión constante nos orienta a priorizar lo esencial, a fortalecer el carácter y a dejar una huella positiva a través de nuestras acciones.
            br
            | &nbsp; &nbsp; &nbsp; Sigamos edificando sobre los principios universales de la sabiduría, la fuerza y la belleza, integrándolos en nuestra vida cotidiana y proyectándolos como valores que contribuyan al bienestar común. Que este ciclo masónico sea un periodo de aprendizaje significativo, reflexión profunda y acción coherente.
            br
            | &nbsp; &nbsp; &nbsp; En nombre de la R∴L∴S∴ “Memento Mori” N.° 107, les doy la más cordial bienvenida a este nuevo ciclo masónico, con el firme deseo de que el compromiso, la conciencia y el servicio guíen nuestro caminar.
            br
            br
            | V:.H:. Jesús Iván Sotelo Vargas 30°
            br
            | Venerable Maestro del Ciclo Masónico 2026
</template>

<script setup>
import classes from 'dom-classes'
const { $splitText } = useNuxtApp()
const message = ref(null)
onMounted(() => {
  useGsap.to(message.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 1,
    ease: 'easeInOut'
  })
  new $splitText(message.value?.querySelector('.text'), { chars: 1 })
  message.value?.querySelectorAll('.text > div').forEach((t) => {
    return classes.add(t, 'is-hidden')
  })
  useGsap.to(message.value?.querySelectorAll('.text > div'), 0.1, {
    delay: 1,
    stagger: 0.1,
    className: '-=is-hidden word'
  })
})
</script>

<style lang="scss">
.page-message {
  opacity: 0;
  visibility: hidden;
  position: relative;
  z-index: 0;
  .vertical-align {
    padding: 14vh 0;
    @media only screen and (max-width: 768px) {
      padding: 12vh 0;
    }
  }
  .center {
    margin: 0 auto;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
  }
  img {
    position: absolute;
    object-fit: contain;
    height: 95vh;
    bottom: 0;
    opacity: 0.4;
    right: 5vw;
  }
  p {
    width: 60vw;
    margin: 0 auto;
    text-align: left;
    letter-spacing: 0;
    font-size: 1.125rem;
    font-family: 'Playfair Display';
    line-height: 1.4;
    color: #8e8e9e;
    .word {
      opacity: 1;
      filter: blur(0);
      transform: translate3d(0, 0, 0);
      transition:
        opacity 0.3s ease-out,
        filter 0.3s ease-out,
        transform 0.3s ease-out;
    }
    .is-hidden {
      opacity: 0;
      filter: blur(5px);
      transform: translate3d(-10px, 0, 0);
      transition-duration: 0s;
    }
    .word:nth-of-type(11),
    .word:nth-of-type(12),
    .word:nth-of-type(19),
    .word:nth-of-type(20),
    .word:nth-of-type(21),
    .word:nth-of-type(22),
    .word:nth-of-type(23),
    .word:nth-of-type(24),
    .word:nth-of-type(25),
  
    .word:nth-of-type(66),
    .word:nth-of-type(67),

  
    .word:nth-of-type(130),
    .word:nth-of-type(131),
    .word:nth-of-type(132),
    .word:nth-of-type(133),
    .word:nth-of-type(134),
    .word:nth-of-type(135),
    .word:nth-of-type(136),
  
    .word:nth-of-type(170),
    .word:nth-of-type(171),
    .word:nth-of-type(172),
    .word:nth-of-type(173),
    .word:nth-of-type(174),
  
    .word:nth-of-type(205),
    .word:nth-of-type(206),
    .word:nth-of-type(207),
    .word:nth-of-type(208),
    .word:nth-of-type(209),
    .word:nth-of-type(210),
    .word:nth-of-type(211),
    .word:nth-of-type(212),
    .word:nth-of-type(213),
    .word:nth-of-type(214),
    .word:nth-of-type(215),
    .word:nth-of-type(216) {
      color: #fff;
    }
    @media only screen and (max-width: 768px) {
      width: 85vw;
      color: #85859e;
      font-size: 1em;
    }
  }
}
</style>
