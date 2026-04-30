<template lang="pug">
main(role="main" ref="root")
  transition(name="home")
    section#page-home.page.page-home
      .page-home__overlay
        .js-overlay.page-home__overlay--second
        .js-overlay.page-home__overlay--first
      .page-home__chapter.is-active
        .page-home__chapter-background
          nuxt-img.page-home__chapter-background--image2(provider="cloudinary" format="webp" cover src="v1661278329/perseverancia/blue_y3u5at.jpg" fit="fill" :alt="heroAlt" preload fetchpriority="high")
      .page-home__chapter
        .page-home__chapter-background
          nuxt-img.page-home__chapter-background--image(provider="cloudinary" format="webp" cover src="v1661278333/perseverancia/bg_mb6eok.png" fit="fill" :alt="heroAlt")
      .page-home__transition
        canvas.page-home__transition-main
        img.page-home__transition-sprite(src="/sprite_test5.png" data-src="/sprite_test5.png" alt="")
        canvas.page-home__transition-temp
      .vertical-align
        .vertical-align-item
          span
            p.page-home__slogan Resp∴ Log∴ Simb∴
          span
            h1.page-home__title Memento Mori N.° 107
          .page-home__cta
            nuxt-link(to="https://granlogiacosmos.mx/") Jurisdiccionada a la Noble, Leal y Centenaria Gran Logia "Cosmos" del Estado de Chihuahua
      details.page-home__intro(aria-labelledby="page-home-intro-summary")
        summary#page-home-intro-summary.page-home__intro-summary {{ introHeading }}
        .page-home__intro-inner
          p.page-home__intro-p(v-for="(paragraph, idx) in introParagraphs" :key="idx") {{ paragraph }}
  </template>

<script setup>
const { locale, t, tm } = useI18n()

const introHeading = computed(() => t('home-intro.heading'))

const introParagraphs = computed(() => {
  const raw = tm('home-intro.paragraphs')
  return Array.isArray(raw) ? raw : []
})

const heroAlt = computed(() =>
  locale.value === 'en'
    ? 'Respectable Symbolic Lodge Memento Mori No. 107 — Freemasonry in Chihuahua City, Mexico'
    : 'Respetable Logia Simbólica Memento Mori N.° 107 — masonería en la ciudad de Chihuahua, México'
)

const indexTitle = computed(() =>
  locale.value === 'en'
    ? 'Masonic lodge in Chihuahua — Grand Lodge Cosmos'
    : 'Logia masónica en Chihuahua — Gran Logia Cosmos'
)

const indexOgTitle = computed(() =>
  locale.value === 'en'
    ? 'Masonic lodge in Chihuahua | Memento Mori No. 107 — Grand Lodge Cosmos'
    : 'Logia masónica en Chihuahua | Memento Mori N.° 107 — Gran Logia Cosmos'
)

const indexDescription = computed(() =>
  locale.value === 'en'
    ? 'Respectable Symbolic Lodge Memento Mori No. 107 in Chihuahua City, under the Grand Lodge Cosmos. Universal fraternity, philosophical work and path for those seeking to join Freemasonry in Chihuahua.'
    : 'Respetable Logia Simbólica Memento Mori N.° 107 en la ciudad de Chihuahua, bajo la Gran Logia Cosmos. Fraternidad universal, trabajo filosófico y camino para quienes buscan unirse a la masonería en Chihuahua.'
)

useSeoMeta({
  title: indexTitle,
  description: indexDescription,
  ogTitle: indexOgTitle,
  ogDescription: indexDescription,
  ogType: 'website',
  twitterTitle: indexOgTitle,
  twitterDescription: indexDescription
})

const organizationJsonLd = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://memento-mori.mx/#organization',
    name: 'Respetable Logia Simbólica Memento Mori N.° 107',
    alternateName: ['Memento Mori No. 107', 'R∴L∴S∴ Memento Mori 107'],
    url: 'https://memento-mori.mx',
    logo: 'https://memento-mori.mx/favicon.png',
    image: 'https://memento-mori.mx/og.png',
    foundingDate: '2025',
    email: 'secretaria@memento-mori.mx',
    description:
      locale.value === 'en'
        ? 'Respectable Symbolic Lodge Memento Mori No. 107 in Chihuahua, Mexico. Affiliated with Gran Logia Cosmos. Masonic fraternity dedicated to philosophical work, knowledge and moral development.'
        : 'Respetable Logia Simbólica Memento Mori N.° 107 en Chihuahua, México. Jurisdiccionada a la Gran Logia Cosmos. Fraternidad masónica dedicada a la reflexión filosófica, el conocimiento y el perfeccionamiento moral.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Libertad 1004, Zona Centro',
      addressLocality: 'Chihuahua',
      addressRegion: 'Chihuahua',
      postalCode: '31000',
      addressCountry: 'MX'
    },
    telephone: '+526366976926',
    areaServed: { '@type': 'City', name: 'Chihuahua' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'membership',
      email: 'secretaria@memento-mori.mx',
      telephone: '+526366976926',
      url: 'https://memento-mori.mx/ser-mason'
    },
    parentOrganization: {
      '@type': 'Organization',
      '@id': 'https://granlogiacosmos.mx/#organization',
      name: 'Gran Logia Cosmos del Estado de Chihuahua',
      url: 'https://granlogiacosmos.mx/'
    }
  })
)

const websiteJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://memento-mori.mx/#website',
  name: 'Memento Mori N.° 107',
  url: 'https://memento-mori.mx',
  publisher: { '@id': 'https://memento-mori.mx/#organization' },
  inLanguage: ['es-MX', 'en']
})

useHead({
  script: [
    { type: 'application/ld+json', children: organizationJsonLd },
    { type: 'application/ld+json', children: websiteJsonLd }
  ]
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
    }
  }

  .page-home__intro {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 105;
    box-sizing: border-box;
    width: min(42rem, calc(100vw - 2rem));
    margin-left: auto;
    margin-right: auto;
    padding: 0 min(5vw, 1.75rem) calc(4rem + env(safe-area-inset-bottom, 0));
    border: 0;
    text-align: center;

    .page-home__intro-summary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.35em;
      margin: 0 auto;
      padding: 0.35rem 0;
      list-style: none;
      cursor: pointer;
      font-weight: 400;
      font-size: clamp(0.58rem, 1vw, 0.68rem);
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: rgb(255 255 255 / 52%);
      text-shadow: 0 1px 12px rgb(0 0 0 / 55%);
      transition: color 0.35s ease;

      &::after {
        content: '';
        flex-shrink: 0;
        width: 0.28em;
        height: 0.28em;
        margin-left: 0.05em;
        border-right: 1px solid currentcolor;
        border-bottom: 1px solid currentcolor;
        transform: rotate(45deg) translateY(-0.12em);
        opacity: 0.65;
        transition: transform 0.25s ease;
      }

      &::-webkit-details-marker {
        display: none;
      }

      &:hover {
        color: #a1907f;
      }
    }

    &[open] .page-home__intro-summary {
      color: rgb(255 255 255 / 78%);

      &::after {
        transform: rotate(225deg) translateY(0.08em);
      }
    }

    .page-home__intro-inner {
      margin-top: 0.65rem;
      padding-top: 0.65rem;
      border-top: 1px solid rgb(255 255 255 / 12%);
      max-height: min(46vh, 17.5rem);
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      font-weight: 300;
      font-size: clamp(0.64rem, 1.05vw, 0.78rem);
      line-height: 1.58;
      color: rgb(255 255 255 / 86%);
      text-shadow:
        0 0 1px rgb(0 0 0 / 85%),
        0 1px 14px rgb(0 0 0 / 55%);
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: rgb(255 255 255 / 22%) transparent;

      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgb(255 255 255 / 22%);
        border-radius: 2px;
      }
    }

    .page-home__intro-p {
      margin: 0 0 0.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    @media only screen and (width <= 768px) {
      width: min(100vw - 1.25rem, 36rem);
      padding-bottom: calc(3.6rem + env(safe-area-inset-bottom, 0));

      .page-home__intro-summary {
        font-size: clamp(0.54rem, 2.5vw, 0.64rem);
        letter-spacing: 0.22em;
      }

      .page-home__intro-inner {
        max-height: min(42vh, 14rem);
        font-size: clamp(0.6rem, 2.75vw, 0.72rem);
      }
    }
  }
}
</style>
