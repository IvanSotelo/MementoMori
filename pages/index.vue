<template lang="pug">
main(role="main" ref="root")
  transition(name="home")
    section#page-home.page.page-home
      .page-home__overlay
        .js-overlay.page-home__overlay--second
        .js-overlay.page-home__overlay--first
      .page-home__chapter.is-active
        .page-home__chapter-background
          nuxt-img.page-home__chapter-background--image2(provider="cloudinary" format="webp" cover src="v1661278329/perseverancia/blue_y3u5at.jpg" fit="fill" :alt="heroAlt")
      .page-home__chapter
        .page-home__chapter-background
          nuxt-img.page-home__chapter-background--image(provider="cloudinary" format="webp" cover src="v1661278333/perseverancia/bg_mb6eok.png" fit="fill" :alt="heroAlt" preload)
      .page-home__transition
        canvas.page-home__transition-main
        img.page-home__transition-sprite(src="/sprite_test5.png" data-src="/sprite_test5.png" alt="")
        canvas.page-home__transition-temp
      .vertical-align
        .vertical-align-item
          span
            p.page-home__slogan Resp∴ Log∴ Simb∴
          span
            h1.page-home__title Memento Mori No.107
          .page-home__cta
            nuxt-link(to="https://granlogiacosmos.mx/") Jurisdiccionada a la Noble, Leal y Centenaria Gran Logia "Cosmos" del Estado de Chihuahua
          section.page-home__seo(:aria-label="homeFaq.ariaLabel")
            h2.page-home__seo-heading {{ homeFaq.heading }}
            dl.page-home__seo-faq
              template(v-for="(item, i) in homeFaq.items" :key="i")
                dt.page-home__seo-q {{ item.q }}
                dd.page-home__seo-a {{ item.a }}
            p.page-home__seo-lead
              span {{ homeFaq.lead }}
              nuxt-link.page-home__seo-link(:to="localePath('ser-mason')") {{ homeFaq.linkText }}
  </template>

<script setup>
const { locale } = useI18n()
const localePath = useLocalePath()

const heroAlt = computed(() =>
  locale.value === 'en'
    ? 'Respectable Symbolic Lodge Memento Mori No. 107 — Freemasonry in Chihuahua City, Mexico'
    : 'Respetable Logia Simbólica Memento Mori N.° 107 — masonería en la ciudad de Chihuahua, México'
)

const homeFaq = computed(() =>
  locale.value === 'en'
    ? {
        heading: 'Masonic lodges in Chihuahua',
        ariaLabel: 'Information about Freemasonry in Chihuahua',
        items: [
          {
            q: 'Are there Masonic lodges in Chihuahua?',
            a: 'Yes. Regular symbolic lodges in Chihuahua City work under the jurisdiction of the Grand Lodge Cosmos of the State of Chihuahua. Memento Mori No. 107 is one of them.'
          },
          {
            q: 'I want to become a Freemason in Chihuahua. What should I do?',
            a: 'Start by sending a membership application to the lodge secretary. Use the official form on this site so the secretary can contact you and explain the next steps.'
          }
        ],
        lead: 'If you want to become a Freemason in Chihuahua, you can begin with the ',
        linkText: 'membership application.'
      }
    : {
        heading: 'Logias masónicas en Chihuahua',
        ariaLabel: 'Información sobre masonería en Chihuahua',
        items: [
          {
            q: '¿Hay logias masónicas en Chihuahua?',
            a: 'Sí. En la ciudad de Chihuahua operan logias masónicas regulares bajo la jurisdicción de la Gran Logia Cosmos del estado de Chihuahua. Memento Mori N.° 107 es una de ellas.'
          },
          {
            q: 'Quiero ser masón en Chihuahua, ¿qué debo hacer?',
            a: 'El primer paso es enviar una solicitud de ingreso a la secretaría de la logia. Use el formulario oficial en este sitio para que puedan orientarle y explicarle el proceso.'
          }
        ],
        lead: 'Si quiere ser masón en Chihuahua, puede iniciar con la ',
        linkText: 'solicitud de ingreso.'
      }
)

const indexTitle = computed(() =>
  locale.value === 'en'
    ? 'Masonic lodges in Chihuahua — Grand Lodge Cosmos'
    : 'Logias masónicas en Chihuahua — Gran Logia Cosmos'
)

const indexOgTitle = computed(() =>
  locale.value === 'en'
    ? 'Masonic lodges in Chihuahua | Memento Mori No. 107 — Grand Lodge Cosmos'
    : 'Logias masónicas en Chihuahua | Memento Mori N.° 107 — Gran Logia Cosmos'
)

const indexDescription = computed(() =>
  locale.value === 'en'
    ? 'Masonic lodges in Chihuahua City under the Grand Lodge Cosmos: Respectable Symbolic Lodge Memento Mori No. 107. For those searching for lodges in Chihuahua or who want to become a Freemason in Chihuahua — fraternity, philosophical work, and how to apply.'
    : 'Logias masónicas en Chihuahua capital bajo la Gran Logia Cosmos: Respetable Logia Simbólica Memento Mori N.° 107. Para quien busca logias masoneras en Chihuahua o quiere ser masón en Chihuahua: fraternidad, trabajo filosófico y cómo solicitar ingreso.'
)

const homeFaqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaq.value.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a
    }
  }))
}))

useHead({
  script: computed(() => [
    {
      key: 'jsonld-home-faq',
      type: 'application/ld+json',
      children: JSON.stringify(homeFaqJsonLd.value)
    }
  ])
})

useSeoMeta({
  title: indexTitle,
  description: indexDescription,
  ogTitle: indexOgTitle,
  ogDescription: indexDescription,
  ogType: 'website',
  twitterTitle: indexOgTitle,
  twitterDescription: indexDescription
})

const root = ref(null)
const bgFrameWidth = 480
const bgFrameHeight = 270
const bgSpriteFrames = 137
const bgSpriteCol = 46
const bgSpriteRate = 1
let bgMainCanvas = null
let bgTempCanvas = null
let bgMainContext = null
let bgTempContext = null
let bgSprite = null
let bgSpriteX = 0
let bgSpriteY = 0
let bgSpriteFrame = 1
let bgSpriteThen = Date.now()
let bgNextImage = null
let bgCurrentImage = null
let bgCanvasRenderStop = false

const canvasInit = () => {
  bgMainCanvas = root.value.querySelector('.page-home__transition-main')
  bgMainContext = bgMainCanvas.getContext('2d')
  bgTempCanvas = root.value.querySelector('.page-home__transition-temp')
  bgTempContext = bgTempCanvas.getContext('2d')
  bgTempContext.mozImageSmoothingEnabled = false
  bgTempContext.webkitImageSmoothingEnabled = false
  bgTempContext.msImageSmoothingEnabled = false
  bgTempContext.imageSmoothingEnabled = false
  bgSprite = root.value.querySelector('.page-home__transition-sprite')
  canvasTransition()
}

const canvasTransition = () => {
  const e = root.value.querySelectorAll('.page-home__chapter')[0]
  const i = root.value.querySelectorAll('.page-home__chapter')[1]
  const n = e.children[0]
  const r = i.children[0]
  const o = root.value.querySelector('.page-home__transition')
  bgCurrentImage = n.children[0]
  bgNextImage = r.children[0]
  bgSpriteX = 0
  bgSpriteY = 0
  bgSpriteFrame = 1
  bgCanvasRenderStop = !1
  bgTempContext.rect(0, 0, bgTempCanvas.width, bgTempCanvas.height)
  bgTempContext.fillStyle = bgNextImage.dataset.background
  bgTempContext.fill()
  setTimeout(() => {
    i.style.zIndex = 4
    o.style.opacity = 1
    o.style.zIndex = 4
    i.style.zIndex = 4
    i.style.top = 0
    i.style.left = 0
    bgCanvasRender(true)
  }, 100)
}

const bgCanvasRender = (t) => {
  if (
    !bgCanvasRenderStop &&
    (bgMainContext.clearRect(0, 0, bgMainCanvas.width, bgMainCanvas.height),
    bgTempContext.clearRect(0, 0, bgTempCanvas.width, bgTempCanvas.height),
    (bgTempContext.globalCompositeOperation = 'source-over'),
    (bgMainContext.globalCompositeOperation = 'source-over'),
    t)
  ) {
    bgTempContext.drawImage(
      bgSprite,
      bgFrameWidth * bgSpriteX,
      bgFrameHeight * bgSpriteY,
      bgFrameWidth,
      bgFrameHeight,
      0,
      0,
      bgTempCanvas.width,
      bgTempCanvas.height + 2
    )
    bgTempContext.globalCompositeOperation = 'source-out'
    bgTempContext.drawImage(
      bgNextImage,
      bgNextImage.getBoundingClientRect().left,
      bgNextImage.getBoundingClientRect().top,
      bgNextImage.getBoundingClientRect().width,
      bgNextImage.getBoundingClientRect().height
    )
    bgMainContext.drawImage(
      bgCurrentImage,
      bgCurrentImage.getBoundingClientRect().left,
      bgCurrentImage.getBoundingClientRect().top,
      bgCurrentImage.getBoundingClientRect().width,
      bgCurrentImage.getBoundingClientRect().height
    )
    bgMainContext.globalCompositeOperation = 'source-over'
    bgMainContext.drawImage(bgTempCanvas, 0, 0)
    const i = Date.now()
    const n = i - bgSpriteThen
    if (n > bgSpriteRate) {
      bgCanvasSpriteNextFrame(t)
      bgSpriteThen = i - (n % bgSpriteRate)
    }
    requestAnimationFrame(() => {
      bgCanvasRender(t)
    })
  }
}

const bgCanvasSpriteNextFrame = (t) => {
  if (bgSpriteFrame >= bgSpriteFrames) {
    bgCanvasRenderStop = true
  } else {
    if (t) {
      bgSpriteX++
      if (bgSpriteX >= bgSpriteCol) {
        bgSpriteX = 0
        bgSpriteY++
      }
    } else {
      bgSpriteX--
      if (bgSpriteX < 0) {
        bgSpriteX = bgSpriteCol - 1
        bgSpriteY--
      }
    }
    bgSpriteFrame++
  }
}

const imageRetina = () => {
  if (root.value != null) {
    const background = root.value.querySelector('.page-home__chapter-background--image')
    const ratio = 1.7777
    const i = background.parentNode
    let imgWidth = i.getBoundingClientRect().width
    let imgHeight = imgWidth / ratio
    if (imgHeight < i.getBoundingClientRect().height) {
      imgHeight = i.getBoundingClientRect().height
      imgWidth = imgHeight * ratio
    }
    background.style.width = imgWidth + 'px'
    background.style.height = imgHeight + 'px'
    background.style.top = (i.getBoundingClientRect().height - imgHeight) / 2 + 'px'
    background.style.left = (i.getBoundingClientRect().width - imgWidth) / 2 + 'px'
    globalResize()
  }
}
const globalResize = () => {
  root.value.querySelector('.page-home__chapter-background--image2').width = window.innerWidth
  root.value.querySelector('.page-home__chapter-background--image2').height = window.innerHeight
  root.value.querySelector('.page-home__transition-main').width = window.innerWidth
  root.value.querySelector('.page-home__transition-main').height = window.innerHeight
  root.value.querySelector('.page-home__transition-temp').width = window.innerWidth
  root.value.querySelector('.page-home__transition-temp').height = window.innerHeight
}

const onEnter = () => {
  useGsap.to(root.value.querySelector('.page'), 1.3, {
    autoAlpha: 1,
    delay: 0.2,
    ease: 'easeInOut'
  })
  useGsap.to(root.value.querySelector('.page-home__title'), 2, {
    autoAlpha: 1,
    y: '0%',
    ease: 'easeIn',
    delay: 0.5
  })
  useGsap.to(root.value.querySelector('.page-home__slogan'), 2, {
    autoAlpha: 1,
    y: '0%',
    ease: 'easeIn',
    delay: 0.5
  })
  useGsap.to(root.value.querySelector('.page-home__cta'), 2, {
    autoAlpha: 1,
    delay: 1.5
  })
  const seoEl = root.value.querySelector('.page-home__seo')
  if (seoEl) {
    useGsap.to(seoEl, 2, {
      autoAlpha: 1,
      delay: 2,
      ease: 'easeInOut'
    })
  }
}
onMounted(() => {
  canvasInit()
  onEnter()
  window.addEventListener('resize', imageRetina)
  imageRetina()
})
</script>

<style lang="scss" scoped>
.page-home {
  span {
    height: auto;
    width: 100%;
    display: block;
    overflow: hidden;
  }
  .canvas-overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 4;
  }
  .page-home__overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    pointer-events: none;
    .page-home__overlay--first,
    .page-home__overlay--second {
      position: absolute;
      height: 100%;
      width: 100%;
      will-change: transform;
      transform: translateZ(0);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -ms-perspective: 1000;
      perspective: 1000;
    }
    .page-home__overlay--first {
      z-index: 2;
      background: #282830;
      transform: translateY(100%);
    }
    .page-home__overlay--second {
      z-index: 1;
      background: #1a1a1f;
      transform: translateY(100%);
    }
  }
  .page-home__chapter {
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    &:first-of-type {
      background: #00f;
    }
    .page-home__chapter-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      img {
        position: relative;
        max-width: none;
        opacity: 0.9 !important;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
        @media only screen and (max-width: 768px) {
          object-position: 50% 40%;
        }
      }
    }
  }
  .page-home__transition {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    canvas {
      display: inline-block;
      vertical-align: baseline;
    }
    img {
      max-width: 100%;
      opacity: 0;
      height: auto;
    }
  }
  .vertical-align {
    display: table;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 50;
    .vertical-align-item {
      display: table-cell;
      vertical-align: middle;
      .page-home__title {
        text-transform: uppercase;
        font-size: 2.5em;
        letter-spacing: 0.3em;
        font-weight: 100;
        will-change: transform;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -ms-perspective: 1000;
        perspective: 1000;
        transform: translate(0px, -100%);
        opacity: 0;
        @media only screen and (max-width: 768px) {
          font-size: 5vw;
        }
      }
      .page-home__slogan {
        text-transform: uppercase;
        font-size: 0.8em;
        letter-spacing: 0.3em;
        padding-bottom: 1em;
        will-change: transform;
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -ms-perspective: 1000;
        perspective: 1000;
        opacity: 0;
        transform: translate(0px, 100%);
        @media only screen and (max-width: 768px) {
          font-size: 2.6vw;
        }
      }
      .page-home__cta {
        display: inline-block;
        padding-top: 0.5vw;
        text-transform: uppercase;
        opacity: 0;
        @media only screen and (max-width: 768px) {
          position: relative;
          top: 35vw;
        }
        a {
          color: rgba(255, 255, 255, 1);
          transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
          &:hover {
            color: #a1907f;
          }
        }
      }
      .page-home__seo {
        max-width: 34rem;
        margin: 2rem auto 0;
        padding: 0 1.25rem;
        text-align: center;
        opacity: 0;
        visibility: hidden;
        @media only screen and (max-width: 768px) {
          margin-top: 3rem;
          position: relative;
          top: 28vw;
        }
      }
      .page-home__seo-heading {
        margin: 0 0 0.85rem;
        font-size: 0.65rem;
        font-weight: 400;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.45);
      }
      .page-home__seo-faq {
        margin: 0 0 1rem;
        text-align: left;
      }
      .page-home__seo-q {
        margin: 0.65rem 0 0.25rem;
        font-size: 0.72rem;
        letter-spacing: 0.06em;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.72);
        &:first-child {
          margin-top: 0;
        }
      }
      .page-home__seo-a {
        margin: 0;
        font-size: 0.72rem;
        line-height: 1.45;
        color: #8e8e9e;
      }
      .page-home__seo-lead {
        margin: 0;
        font-size: 0.72rem;
        line-height: 1.45;
        color: rgba(255, 255, 255, 0.55);
      }
      .page-home__seo-link {
        color: #a1907f;
        text-decoration: underline;
        text-underline-offset: 2px;
        transition: color 0.2s ease;
        &:hover {
          color: #c4b49f;
        }
      }
    }
  }
}
</style>
