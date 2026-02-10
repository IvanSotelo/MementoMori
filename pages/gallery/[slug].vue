<template lang="pug">
main(ref="slug")
  transition(name="page-transition")
    section.page.page-single
      .single
        .single__box
          .single__box--info
            span.js-line1
            p.js-year {{ image.year }}
            p.js-title {{ image.title }}
          .single__box--category.js-box-category
            span.js-line2
            p.js-category Perseverancia
        .single__image(@click="closeBox")
          nuxt-img(provider="cloudinary" format="webp" cover placeholder preload :src="image?.src || ('v1766431449/memento-mori/'+$route.params.slug+'.jpg')")
        .single__mobile-info(@click="boxHandler")
          p i
      .slider
        .slider__trigger
          p.js-slider-trigger(@click="sliderHandler") View All Gallery
        .slider__container
          .slider__container--wrapper.swiper-wrapper
            nuxt-img.swiper-slide(v-for="image in images" :key="image.url" provider="cloudinary" preload format="webp" cover :src="image.src || ('v1766431449/memento-mori/'+image.url+'.jpg')" width="200" @click="clickImage(image.url)")
</template>

<script setup lang="ts">
import Swiper from 'swiper'
const route = useRoute()
const router = useRouter()
interface Image {
  url: string
  year: string
  title: string
  class: string
  src?: string
}

const swiper: Ref<Swiper | null> = ref(null)
const sliderOpen = ref(false)
const boxOpen = ref(false)
const slug = ref(null)
let isMobile: boolean
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
const images: Ref<Image[]> = ref([
  {
    url: 'carta-bajo-dispensa-2025',
    year: '2025',
    title: 'Carta bajo dispensa 2025',
    class: 'lodge',
    src: 'v1766431449/memento-mori/fundacion.jpg'
  },
  {
    url: 'aumento-de-salario-2025',
    year: '2025',
    title: 'Aumento de salario 2025',
    class: 'lodge',
    src: 'v1766431839/memento-mori/aumento%20de%20salario%202025.jpg'
  },
  {
    url: 'solsticio-de-verano-2025',
    year: '2025',
    title: 'Solsticio de Verano 2025',
    class: 'sky',
    src: 'v1766431849/memento-mori/solsticio%20de%20verano%202025.jpg'
  },
  {
    url: 'iniciacion-2025',
    year: '2025',
    title: 'Iniciación 2025',
    class: 'lodge',
    src: 'v1766431913/memento-mori/iniciacion-2025.jpg'
  },
  {
    url: 'otorgamiento-carta-patente-2025',
    year: '2025',
    title: 'Otorgamiento carta patente 2025',
    class: 'lodge',
    src: 'v1766431979/memento-mori/otorgamiento%20carta%20patente%202025.jpg'
  },
  {
    url: 'solsticio-de-invierno-2025',
    year: '2025',
    title: 'Solsticio de invierno 2025',
    class: 'sky',
    src: 'v1766432002/memento-mori/solsticio%20de%20invierno%202025.jpg'
  }
])

const image = computed(() => images.value.find((e) => e.url === (route.params.slug as string)))

const addSwiper = () => {
  const el = slug.value.querySelector('.slider__container') as HTMLElement
  swiper.value = new Swiper(el, {
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    grabCursor: true,
    mousewheelControl: true
  })
}

const animateIn = () => {
  if (isMobile) {
    useGsap.set(slug.value.querySelector('.single__box'), { y: '100%', bottom: 0 })
  } else {
    useGsap.from(slug.value.querySelector('.single__box'), {
      x: '100%',
      ease: 'easeInOut',
      duration: 0.7
    })
    useGsap.from(slug.value.querySelector('.js-year'), {
      x: '-10%',
      autoAlpha: 0,
      ease: 'easeInOut',
      duration: 1.5
    })
    useGsap.from(slug.value.querySelector('.js-category'), {
      x: '-10%',
      autoAlpha: 0,
      ease: 'easeInOut',
      duration: 1.5
    })
    useGsap.from(slug.value.querySelector('.js-title'), {
      x: '-10%',
      autoAlpha: 0,
      ease: 'easeInOut',
      duration: 1.5
    })
    useGsap.from(slug.value.querySelector('.js-line1'), {
      height: 0,
      ease: 'easeInOut',
      duration: 1.5
    })
    useGsap.from(slug.value.querySelector('.js-line2'), {
      width: 0,
      ease: 'easeInOut',
      duration: 1.5
    })
  }
}

const clickImage = (url: string) => {
  router.push(url)
}

const openSlider = () => {
  const i =
    '-' +
    (slug.value.querySelector('.slider__container')?.getBoundingClientRect().height ?? 0) +
    'px'
  useGsap.to('.js-slider-trigger', { autoAlpha: 0, y: -10, duration: 0.5 })
  useGsap.to('.slider', { y: '0%', duration: 0.5 })
  useGsap.to('.js-slider-trigger', { autoAlpha: 1, y: 0, delay: 0.5, duration: 0.5 })
  useGsap.to('.single__box', {
    autoAlpha: 0,
    y: i,
    ease: 'easeOut',
    duration: 0.9,
    onComplete: () => {
      sliderOpen.value = true
    }
  })
}

const closeSlider = () => {
  useGsap.to('.js-slider-trigger', { autoAlpha: 0, y: -10, duration: 0.5 })
  useGsap.to('.slider', { y: '70%', duration: 0.5 })
  useGsap.to('.js-slider-trigger', { autoAlpha: 1, y: 0, delay: 0.5, duration: 0.5 })
  useGsap.to('.single__box', {
    autoAlpha: 1,
    y: 0,
    ease: 'easeOut',
    duration: 0.9,
    onComplete: () => {
      sliderOpen.value = false
    }
  })
}

const sliderHandler = () => (sliderOpen.value ? closeSlider() : openSlider())

const openBox = () => {
  useGsap.to(slug.value.querySelector('.single__box'), {
    height: isMobile ? '30%' : '100%',
    width: isMobile ? '100%' : '45%',
    y: isMobile ? '0%' : 0,
    bottom: 0,
    ease: 'easeInOut',
    duration: 0.8
  })
  useGsap.to(slug.value.querySelector('.single__box--info'), {
    padding: '0 6vw',
    top: isMobile ? '3%' : '15%',
    ease: 'easeInOut',
    duration: 0.8
  })
  useGsap.to(slug.value.querySelector('.js-category'), { autoAlpha: 1, duration: 0.8 })
  useGsap.to(slug.value.querySelector('.js-title'), {
    autoAlpha: 1,
    duration: 1.5,
    onComplete: () => {
      boxOpen.value = true
    }
  })
}

const closeBox = () => {
  useGsap.to(slug.value.querySelector('.js-category'), { autoAlpha: 0, duration: 0.5 })
  useGsap.to(slug.value.querySelector('.js-line2'), { autoAlpha: 0, duration: 0.5 })
  useGsap.to(slug.value.querySelector('.js-title'), { autoAlpha: 0, duration: 0.5 })
  useGsap.to(slug.value.querySelector('.single__box'), {
    height: isMobile ? 0 : '15vw',
    width: isMobile ? '100%' : '30%',
    y: isMobile ? '100%' : 0,
    bottom: isMobile ? '0vw' : '7vw',
    ease: 'easeInOut',
    duration: 0.8
  })
  useGsap.to(slug.value.querySelector('.single__box--info'), {
    padding: '2vw',
    top: 0,
    ease: 'easeNone',
    duration: 0.8
  })
  useGsap.to(slug.value.querySelector('.js-category'), { autoAlpha: 1, duration: 1.5 })
  useGsap.to(slug.value.querySelector('.js-line2'), {
    autoAlpha: 1,
    duration: 1.5,
    onComplete: () => {
      boxOpen.value = false
    }
  })
}

const boxHandler = () => (boxOpen.value ? closeBox() : openBox())

onMounted(() => {
  useGsap.to(slug.value.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 1,
    ease: 'easeInOut',
    done: animateIn
  })
  addSwiper()
})
</script>

<style lang="scss" scoped>
.single__image {
  transform: rotate(0.01deg);
  img {
    -webkit-mask-image: linear-gradient(to bottom, black 2%, #ffffff8a 98%);
    mask-image: linear-gradient(to bottom, black 2%, #ffffff8a 98%);
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    object-position: 50% 50%;
    will-change: transform;
    float: left;
  }
}
.single__box {
  position: absolute;
  right: 0;
  bottom: 7vw;
  height: 15vw;
  width: 30%;
  z-index: 1;
  background: #101010;
  overflow: hidden;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -ms-perspective: 1000;
  perspective: 1000;
  @media only screen and (max-width: 768px) {
    width: 100% !important;
    z-index: 100;
    bottom: 0;
  }
  &::before {
    content: '';
    background: linear-gradient(#000, rgba(0, 0, 0, 0));
    transition: all 1s ease;
    position: fixed;
    bottom: -1px;
    transform: rotate(180deg);
    right: 0;
    left: 0;
    opacity: 1;
    z-index: 1;
    height: 30vh;
    width: 100%;
    pointer-events: none;
  }
  &--info {
    text-align: left;
    position: relative;
    padding: 2vw;
    z-index: 2;
    @media only screen and (max-width: 768px) {
      padding: 7vw !important;
    }
    span {
      width: 3px;
      background: #b09e89;
      position: absolute;
      left: 0;
      height: 100%;
      top: 2vw;
      @media only screen and (max-width: 768px) {
        top: 7vw;
      }
    }
    p {
      font-family: 'Playfair Display';
      &:first-of-type {
        color: #737373;
        font-size: 1.3vw;
        font-style: italic;
        font-weight: 100;
        letter-spacing: 0;
        padding-bottom: 0.5vw;
        @media only screen and (max-width: 768px) {
          font-size: 5.4vw;
        }
      }
      &:last-of-type {
        color: #b09e89;
        letter-spacing: 0;
        font-size: 1.4vw;
        line-height: 1.2;
        @media only screen and (max-width: 768px) {
          font-size: 6.4vw;
        }
      }
    }
  }
  &--category {
    display: block;
    float: left;
    margin-left: 2vw;
    position: relative;
    z-index: 2;
    width: 70%;
    @media only screen and (max-width: 768px) {
      margin-left: 7vw !important;
      top: 5vw !important;
      width: 100%;
    }
    span {
      position: absolute;
      width: 35%;
      height: 1px;
      background: #fff;
      top: 0;
      left: 0;
    }
    p {
      color: #a7a7a7;
      letter-spacing: 0;
      font-size: 1vw;
      padding-top: 0.5vw;
      text-align: left;
      @media only screen and (max-width: 768px) {
        font-size: 4vw;
        padding-top: 3vw;
      }
    }
  }
  &--plus {
    display: inline-block;
    float: right;
    padding-right: 3vw;
    z-index: 2;
    position: relative;
    cursor: pointer;
    transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
    @media only screen and (max-width: 768px) {
      position: absolute;
      left: 6vw;
      top: -15vw;
      opacity: 1 !important;
    }
  }
  &--text {
    position: relative;
    top: 15%;
    text-align: left;
    padding: 6vw;
    opacity: 0;
    visibility: hidden;
    @media only screen and (max-width: 768px) {
      top: 54vw;
      position: absolute;
      padding: 0 7vw;
    }
    p {
      letter-spacing: 0;
      font-size: 1vw;
      line-height: 1.6;
      font-family: PTSerifPro-Book;
      padding-bottom: 1vw;
      @media only screen and (max-width: 768px) {
        font-size: 3.5vw;
      }
    }
  }
}
.slider {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
  transform: translateY(70%);
  @media only screen and (max-width: 768px) {
    display: none;
  }
}
.single__mobile-info {
  display: none;
  position: absolute;
  bottom: 3vw;
  right: 3vw;
  z-index: 2;
  background: rgba(0, 0, 0, 0.11);
  width: 13vw;
  height: 13vw;
  border: 1px solid #fff;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    display: block;
  }
  p {
    font-size: 8vw;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
}
.slider__trigger {
  display: inline-block;
  cursor: pointer;
  margin: 2vw;
  overflow: hidden;
  p {
    cursor: pointer;
    transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
    text-transform: uppercase;
    display: inline-block;
    &:hover {
      color: #978268;
    }
  }
}
.slider__container--wrapper {
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
}
.slider__container {
  height: 13vw;
  will-change: transform;
  background: #000;
  img {
    height: 65%;
    object-fit: cover;
    transform: translateZ(0);
    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    padding: 0 2vw;
    &:hover {
      transform: scale(1.15);
      cursor: pointer;
    }
  }
}
</style>
