<template lang="pug">
main(ref="message")
  div
    section#page-message.page.page-message
      .vertical-align
        .vertical-align-item
          p.center Mensaje del Venerable Maestro
          br
          p.text &nbsp; &nbsp; &nbsp; Es un honor dirigirme a ustedes como Venerable Maestro del Ciclo Masónico en este próspero año 2024 de esta R:.B:. y C:.L:.S:. “Memento Mori” N.° 12.  En este templo de virtudes, la perseverancia y la lealtad son los cimientos sobre los cuales construimos nuestras vidas y nuestro compromiso con la fraternidad.
            br
            | &nbsp; &nbsp; &nbsp; La perseverancia nos guía a través de desafíos, recordándonos que la dedicación constante es la llave que abre las puertas hacia el conocimiento más profundo y la comprensión más completa. La lealtad, por otro lado, nos une como hermanos, fortaleciendo nuestros lazos y recordándonos que juntos somos más fuertes.
            br
            | &nbsp; &nbsp; &nbsp; Sigamos construyendo sobre los pilares de la sabiduría, la fuerza y la belleza, llevando la luz masónica a nuestras vidas y a la sociedad que nos rodea. Que este año esté lleno de aprendizajes significativos, momentos fraternales y un profundo sentido de propósito.
            br
            | &nbsp; &nbsp; &nbsp; En nombre de la Logia Memento Mori 12, les doy la bienvenida a este nuevo ciclo masónico. Que la luz del GADU ilumine nuestro camino y guíe nuestras acciones. 
            br
            br
            | V:.H:. Jesús Iván Sotelo Vargas 30°
            br
            | Venerable Maestro del Ciclo Masónico 2024
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
    .word:nth-of-type(20),
    .word:nth-of-type(23),
    .word:nth-of-type(24),
    .word:nth-of-type(25),
    .word:nth-of-type(26),
    .word:nth-of-type(27),
    .word:nth-of-type(28),
    .word:nth-of-type(29),
    .word:nth-of-type(30),
    .word:nth-of-type(37),
    .word:nth-of-type(38),
    .word:nth-of-type(39),
    .word:nth-of-type(40),
    .word:nth-of-type(60),
    .word:nth-of-type(90),
    .word:nth-of-type(97),
    .word:nth-of-type(126),
    .word:nth-of-type(127),
    .word:nth-of-type(161),
    .word:nth-of-type(162),
    .word:nth-of-type(163),
    .word:nth-of-type(164),
    .word:nth-of-type(165),
    .word:nth-of-type(179),
    .word:nth-of-type(188),
    .word:nth-of-type(189),
    .word:nth-of-type(190),
    .word:nth-of-type(191),
    .word:nth-of-type(192),
    .word:nth-of-type(193),
    .word:nth-of-type(194),
    .word:nth-of-type(195),
    .word:nth-of-type(196),
    .word:nth-of-type(197),
    .word:nth-of-type(198),
    .word:nth-of-type(199) {
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
