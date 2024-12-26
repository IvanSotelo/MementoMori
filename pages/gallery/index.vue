<template>
  <main ref="gallery">
    <section id="page-gallery" class="page page-gallery">
      <div :class="['page-gallery__mobile-underlay', asideActive && isMobile ? 'active' : '']" />
      <aside
        class="js-aside page-gallery-aside"
        :class="{ active: asideActive }"
        @mouseenter="
          () => {
            asideActive = true
          }
        "
        @mouseleave="
          () => {
            asideActive = false
          }
        "
        @click="toggleAside"
      >
        <div class="js-aside-container page-gallery-aside__container">
          <div class="page-gallery-aside__filter">
            <p class="page-gallery-aside__filter--title">Filters</p>
            <ul>
              <li
                v-for="filter in filters"
                :key="filter.title"
                :class="{ active: currentFilter === filter.class }"
                @click="() => applyFilter(filter.class)"
              >
                <p>{{ filter.title }}</p>
                <p>1</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="js-aside-trigger page-gallery-aside__trigger-wrapper">
          <p class="js-aside-trigger-tex">Filter</p>
        </div>
      </aside>
      <smooth-scroll class="page-gallery__grid">
        <div ref="gridContainer" class="js-grid">
          <figure
            v-for="image in images"
            :key="image.url"
            :class="['js-item', 'page-gallery__row--item', image.class]"
          >
            <nuxt-link :to="'gallery/' + image.url">
              <div class="page-gallery__row--item__info">
                <div class="page-gallery__row--item__text">
                  <div class="page-gallery__row--item__text--inner">
                    <p>{{ image.year }}</p>
                    <p>{{ image.title }}</p>
                  </div>
                </div>
                <nuxt-img
                  provider="cloudinary"
                  format="webp"
                  preload
                  cover
                  placeholder
                  :src="'v1661741839/perseverancia/' + image.url + '.jpg'"
                  width="300"
                />
              </div>
            </nuxt-link>
          </figure>
        </div>
      </smooth-scroll>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { LocomotiveScroll } from 'locomotive-scroll'
const { $locomotiveScroll } = useNuxtApp()
const gallery = ref<HTMLElement | null>(null)
const gridContainer = ref<HTMLElement | null>(null)
let grid: unknown
let scroll: LocomotiveScroll 

const asideActive = ref(false)
const currentFilter = ref('*')
const isMobile = ref(false)

const filters = [
  { title: 'All', class: '*' },
  { title: 'Aniversarios', class: '.aniversary' },
  { title: 'En Logia', class: '.lodge' },
  { title: 'Gran Logia', class: '.grandlodge' },
  { title: 'Bajo la bóveda', class: '.sky' }
]

const images = [
  {
    url: '2024-4',
    year: '2024',
    title: 'Tenida Interlogial',
    class: 'lodge'
  },
  {
    url: '2024-3',
    year: '2024',
    title: 'Solsticio de Verano',
    class: 'sky'
  },
  {
    url: '2024-2',
    year: '2024',
    title: 'Iniciación',
    class: 'lodge'
  },
  {
    url: '2024-1',
    year: '2024',
    title: 'Aumento de salario',
    class: 'lodge'
  },

  {
    url: '2022-3',
    year: '2022',
    title: 'Tenida Semestral',
    class: 'grandlodge'
  },
  {
    url: '2022-4',
    year: '2022',
    title: 'Entrega de mandil de pasado gran maestro',
    class: 'grandlodge'
  },
  {
    url: '2022-5',
    year: '2022',
    title: 'Entrega de mandil de pasado gran maestro',
    class: 'grandlodge'
  },
  {
    url: 'reconocimiento2',
    year: '2022',
    title: 'Reconocimiento Conyugal Hiram Abif Gandara Perez',
    class: 'lodge'
  },
  {
    url: 'reconocimiento1',
    year: '2022',
    title: 'Reconocimiento Conyugal Hiram Abif Gandara Perez',
    class: 'lodge'
  },
  {
    url: '2022-2',
    year: '2022',
    title: 'Reposición de Gran Carta Patente',
    class: 'grandlodge'
  },
  {
    url: '2022-1',
    year: '2022',
    title: 'Entrega de Hermano AJEF',
    class: 'lodge'
  },
  {
    url: '2022',
    year: '2022',
    title: 'Tenida Semestral',
    class: 'lodge'
  },
  {
    url: '2021-2',
    year: '2021',
    title: 'Tenida Luctuosa',
    class: 'lodge'
  },
  {
    url: '2021-1',
    year: '2021',
    title: 'Tenida Regular',
    class: 'lodge'
  },
  {
    url: '2021',
    year: '2021',
    title: 'Bajo la boveda en Delicias',
    class: 'sky'
  },
  {
    url: '2019',
    year: '2019',
    title: 'Visita de hermanos de otros orientes',
    class: 'lodge'
  },
  {
    url: '2018-2',
    year: '2018',
    title: 'Bajo la boveda en Delicias',
    class: 'sky'
  },
  {
    url: '2018',
    year: '2018',
    title: 'Bajo la boveda en Delicias',
    class: 'sky'
  },
  {
    url: '2017',
    year: '2017',
    title: 'Aniversario de Perseverancia 2017',
    class: 'aniversary'
  },
  {
    url: '2017-4',
    year: '2017',
    title: 'Inicio de ciclo',
    class: 'lodge'
  },
  {
    url: '2017-3',
    year: '2017',
    title: 'Visita del Muy Respetable Maestro Fernando Motta Allen',
    class: 'lodge'
  },
  {
    url: '2017-5',
    year: '2017',
    title: 'Visita del Muy Respetable Maestro Auden Acosta',
    class: 'lodge'
  },
  {
    url: '2017-2',
    year: '2017',
    title: 'Bajo la boveda en Delicias',
    class: 'lodge'
  },
  {
    url: '2017-1',
    year: '2017',
    title: 'Tenida Semestral',
    class: 'lodge'
  },
  {
    url: '2017-6',
    year: '2017',
    title: 'Tenida fúnebre',
    class: 'lodge'
  },
  {
    url: '1990',
    year: '1996',
    title: 'Logia en calle corregidora',
    class: 'lodge'
  }
]

const toggleAside = () => {
  if (isMobile.value) {
    asideActive.value = !asideActive.value
  }
}

const applyFilter = (filterClass: string) => {
  currentFilter.value = filterClass
  if (grid) {
    grid.arrange({ filter: filterClass })
  }
  if (scroll) {
    scroll.update()
  }
}

onMounted(async () => {
  useGsap.to(gallery.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 1,
    ease: 'easeInOut'
  })
  if (import.meta.client) {
    const Isotope = (await import('isotope-layout')).default

    grid = new Isotope(gridContainer.value, {
      itemSelector: '.js-item',
      percentPosition: true,
      layoutMode: 'masonry',
      hiddenStyle: { opacity: 0 },
      visibleStyle: { opacity: 1 },
      masonry: { columnWidth: '.page-gallery__row--item' }
    })

    grid.on('arrangeComplete', () => {
      scroll.update()
    })
  }

  setTimeout(() => {
    grid.arrange()
    scroll.update()
  }, 1000)

  scroll = $locomotiveScroll(gallery.value?.querySelector('[data-scroll-container]') || undefined)
})

onUnmounted(() => {
  scroll.destroy()
})
watch(asideActive, (newVal) => {
  const triggerText = gallery.value?.querySelector('.js-aside-trigger-tex')
  if (newVal) {
    useGsap.to(triggerText, { autoAlpha: 0, duration: 0.5, ease: 'easeInOut' })
  } else {
    useGsap.to(triggerText, { autoAlpha: 1, duration: 0.5, ease: 'easeInOut' })
  }
})
</script>

<style lang="scss" scoped>
.page-gallery {
  background-color: #fff;
  .page-gallery__mobile-underlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.46);
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
    &.active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }
  .page-gallery-aside {
    position: fixed;
    width: 30vw;
    height: 100vw;
    background: rgba(255, 255, 255, 0.97);
    z-index: 2;
    transform: translateX(-80%);
    -webkit-transform: translateX(-80%);
    transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
    -webkit-transition: -webkit-transform 1s;
    will-change: transform;
    &.active {
      transform: translateX(0);
    }
    .page-gallery-aside__container {
      position: absolute;
      left: 0;
      width: 80%;
      top: 10vw;
      text-align: left;
      p {
        color: #000;
      }
      .page-gallery-aside__filter {
        .page-gallery-aside__filter--title {
          text-transform: uppercase;
          padding: 1vw 0;
          padding: 1vw 2.5vw;
        }
        li {
          padding: 0.3vw 2.5vw;
          position: relative;
          transition: background 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          cursor: pointer;
          &.active {
            background: rgba(0, 0, 0, 0.05);
            &::before {
              content: '';
              position: absolute;
              height: 100%;
              width: 2.5%;
              top: 0;
              background: #b5a492;
              left: 0;
            }
          }
          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
          p {
            display: inline-block;
            pointer-events: none;
            letter-spacing: 0.3px;
            font-family: PTSerifPro-Book;
            &:last-of-type {
              float: right;
              color: #adadad;
            }
          }
        }
      }
    }
    .page-gallery-aside__trigger-wrapper {
      position: absolute;
      height: 100vh;
      width: 20%;
      right: 0;
      cursor: pointer;
      p {
        transform: rotate(-90deg) translateX(-50%) translateY(70%);
        transform-origin: 50% 100%;
        position: relative;
        text-transform: uppercase;
        top: 30%;
        color: #000;
      }
    }
  }
  .page-gallery__grid {
    width: 100%;
    padding-top: 8vw;
    padding-left: 3vw;
    @media only screen and (max-width: 768px) {
      padding-left: 0;
      padding-top: 20vw;
    }
    .page-gallery__row {
      width: 101.5%;
      padding: 0;
      margin: 0 auto;
      opacity: 0;
    }
    .page-gallery__row--item__info {
      position: relative;
      height: 80%;
      width: 85%;
      display: -ms-flexbox;
      display: flex;
      margin: 0 auto;
      cursor: pointer;
      @media only screen and (max-width: 768px) {
        width: 90%;
      }
      .page-gallery__row--item__text {
        position: absolute;
        width: 90%;
        margin: 0 auto;
        left: 0;
        right: 0;
        height: 100%;
        background: rgba(162, 156, 148, 0.88);
        top: 50%;
        transform: translateY(-50%);
        text-align: left;
        opacity: 0;
        transition: opacity 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        @media only screen and (max-width: 768px) {
          top: auto;
          bottom: -11vh;
          height: auto;
          background: 0 0;
          width: 90%;
          opacity: 1;
        }
        .page-gallery__row--item__text--inner {
          border-left: 3px solid #fff;
          padding-left: 1.5vw;
          padding-right: 1.5vw;
          margin-top: 1.5vw;
          @media only screen and (max-width: 768px) {
            padding-left: 3.5vw;
          }
          p {
            color: #fff;
            letter-spacing: 0;
            transform: translateX(-8%);
            transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
            line-height: 1.8;
            font-family: 'Playfair Display';
            &:first-of-type {
              font-style: italic;
            }
            @media only screen and (max-width: 768px) {
              color: #000 !important;
              transform: translateX(0);
            }
          }
        }
      }
      &:hover {
        .page-gallery__row--item__text {
          opacity: 1;
          p {
            transform: translateX(0);
          }
        }
      }
    }
    .page-gallery__row--item {
      width: 25%;
      position: relative;
      margin-bottom: 5vh;
      @media only screen and (max-width: 768px) {
        width: 100%;
        margin-bottom: 14vh;
      }
      img {
        width: 90%;
        height: 50%;
        margin: 0 auto;
        display: block;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .page {
    .page-gallery-aside {
      height: 100vh;
      width: 70vw;
      .page-gallery-aside__container {
        top: 10vh;
        .page-gallery-aside__filter {
          li {
            padding: 1.5vh 3vh;
          }
        }
      }
      .page-gallery-aside__filter--title {
        display: none;
      }
    }
  }
}
</style>
