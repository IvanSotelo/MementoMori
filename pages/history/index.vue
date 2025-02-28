<template>
  <section id="page-history" ref="textContainer" class="page page-history">
    <div class="history">
      <aside
        class="history__aside"
        :class="{ active: isActive }"
        @mouseenter="isActive = true"
        @mouseleave="isActive = false"
      >
        <div class="history__aside-container">
          <div class="history__aside-filter">
            <p class="history__aside-filter--title">Capitulos</p>
            <ul>
              <li
                v-for="chapter in chapters"
                :key="chapter.title"
                :class="{ active: state.currentSection === chapter.title }"
                @click="slideToChapter(chapter)"
              >
                <p>{{ chapter.text }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="history__aside__trigger-wrapper">
          <div>
            <p
              v-for="chapter in chapters"
              :key="chapter.title"
              :class="{ active: state.currentSection === chapter.title }"
            >
              {{ chapter.mobile }}
            </p>
          </div>
        </div>
      </aside>
      <div class="device-content">
        <div class="history__timeline">
          <smooth-scroll class="history__timeline-wrapper">
            <div id="born" class="history__item" data-scroll-section>
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">1893</p>
                  <p class="history__item-text--title">Fundación de la Gran Logia Cosmos</p>
                  <p class="history__item-text--text">
                    En 1893 se fundó en la ciudad de Chihuahua la “Gran Logia Cosmos”, con
                    jurisdicción sobre las logias existentes en el estado, quedando como su primer
                    Gran Maestro el Coronel Miguel Ahumada, Gobernador del Estado.
                  </p>
                </div>
                <div class="history__item-aside--right bottom-10">
                  <nuxt-img
                    provider="cloudinary"
                    src="v1662342979/perseverancia/Grandes%20Maestros/ahumada.png"
                    alt="Miguel Ahumada"
                    placeholder
                    format="webp"
                    loading="lazy"
                  />
                  <span>
                    <p>Miguel Ahumada</p>
                    <p>1845 - 1917</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="history__item" data-scroll-section>
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">2025</p>
                  <p class="history__item-text--title">
                    Fundación de Memento Mori Nº 12
                  </p>
                  <p class="history__item-text--text">
                    En el espíritu de la fraternidad y el compromiso con los valores masónicos, se constituyó la Respetable Logia Simbólica Memento Mori, un taller dedicado a la búsqueda del conocimiento, la reflexión filosófica y el perfeccionamiento del individuo dentro de los principios de la masonería.

Bajo la dirección de su Venerable Maestro, Salomón Dozal Suárez, la logia se estableció con un cuadro logial compuesto por hermanos comprometidos con la enseñanza y práctica de la tradición masónica. Entre ellos, el Primer Vigilante Jesús Iván Sotelo Vargas y el Segundo Vigilante Heriberto Solis Rivas, quienes velan por el desarrollo de los trabajos y la formación de los aprendices.

El Secretario, Aquilino Ramírez Lorenzo, tiene la responsabilidad de registrar la historia y la evolución de la logia, mientras que el Orador, Jesús Nevárez Rascón, se encarga de velar por la pureza de los principios y la aplicación de la ley masónica.

El Tesorero, Zahid Daniel Vela Juárez, administra con prudencia los bienes de la logia, y el Maestro de Ceremonias, José Ángel Salas Granados, dirige con solemnidad los rituales y trabajos simbólicos. Asimismo, el Hospitalario, Rafael González Jurado, vela por la solidaridad y el bienestar de los hermanos.

Entre los oficiales encargados de la seguridad y el orden, destacan el Primer Experto Héctor Felipe Moreno Nevárez, el Segundo Experto Diego Alejandro Balderrama Gallegos, y el Guarda Templo Interior Raúl Palacios Perches.

El puesto de Ecónomo, desempeñado por el hermano Rafael Alberto Márquez Pérez, es fundamental para la administración de los recursos y la provisión de las necesidades materiales de la logia, asegurando su correcto funcionamiento.

La fundación de Memento Mori representa no solo el nacimiento de un nuevo espacio de estudio y reflexión, sino también el compromiso de sus miembros con la transmisión del conocimiento, el fortalecimiento de los lazos fraternos y el perfeccionamiento moral e intelectual.

Siguiendo el significado profundo de su nombre, Memento Mori, esta logia recuerda constantemente a sus integrantes la importancia de la humildad, la trascendencia de la vida y la necesidad de obrar con virtud en cada acción..
                  </p>
                </div>
              </div>
            </div>
            <!--
            <div class="history__item" data-scroll-section>
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">1956</p>
                  <p class="history__item-text--title">
                    Muy Respetable Gran Maestro Lázaro Villareal González
                  </p>
                  <p class="history__item-text--text">
                    Es elegido como Muy Respetable Gran Maestro de la Gran Logia Cosmos del Estado
                    de Chihuahua el V:.H:. Lázaro Villareal González.
                  </p>
                </div>
                <nuxt-img
                  class="history__item-image"
                  provider="cloudinary"
                  src="v1662343015/perseverancia/Grandes%20Maestros/villareal.png"
                  alt="Lázaro Villareal González"
                  placeholder
                  format="webp"
                  loading="lazy"
                />
              </div>
            </div>
            <div id="fifty" class="history__item" data-scroll-section data-scroll-id="fifty">
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">1957</p>
                  <p class="history__item-text--title">50° Aniversario</p>
                  <p class="history__item-text--text">
                    Celebración del quincuagésimo aniversario de Memento Mori
                  </p>
                </div>
                <nuxt-img
                  class="history__item-image"
                  provider="cloudinary"
                  src="v1662342978/perseverancia/Grandes%20Maestros/1957.png"
                  alt="50° Aniversario"
                  placeholder
                  format="webp"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="history__item" data-scroll-section>
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">1982</p>
                  <p class="history__item-text--title">Boletín informativo “357”</p>
                  <p class="history__item-text--text">
                    En 1982 publica su boletín informativo “357”, dirigido por el VH Pompeyo Aguilar
                    Araiza.
                  </p>
                </div>
              </div>
            </div>
            <!---
            <div class="history__item margin-0" data-scroll-section>
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">2003</p>
                  <p class="history__item-text--title">
                    Muy Respetable Gran Maestro Ángel Talavera Luna
                  </p>
                  <p class="history__item-text--text">
                    Es elegido como Muy Respetable Gran Maestro de la Gran Logia Cosmos del Estado
                    de Chihuahua el V:.H:. Ángel Talavera Luna.
                  </p>
                </div>
                <div class="history__item-aside--right bottom-10">
                  <nuxt-img
                    provider="cloudinary"
                    src="v1723657599/perseverancia/Grandes%20Maestros/Angel-Talavera-Luna.jpg"
                    alt="Ángel Talavera Luna"
                    placeholder
                    format="webp"
                    loading="lazy"
                  />
                  <span>
                    <p>Ángel Talavera Luna</p>
                  </span>
                </div>
              </div>
            </div>
            <div id="hundred" class="history__item" data-scroll-section>
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">2007</p>
                  <p class="history__item-text--title">100° Aniversario</p>
                  <p class="history__item-text--text">
                    Celebración del Centésimo aniversario de Memento Mori
                  </p>
                </div>
                <nuxt-img
                  class="history__item-image"
                  provider="cloudinary"
                  src="v1662342978/perseverancia/Grandes%20Maestros/2007.png"
                  alt="100° Aniversario"
                  placeholder
                  format="webp"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="history__item" data-scroll-section>
              <div class="history__item-wrapper space">
                <div class="history__item-text">
                  <p class="history__item-text--date">2024</p>
                  <p class="history__item-text--title">Actualidad</p>
                  <p class="history__item-text--text">
                    1° Aniversario de Memento Mori
                  </p>
                </div>
              </div>
            </div>
            -->
          </smooth-scroll>
        </div>
      </div>
      <div class="history__mobile">
        <ul>
          <li
            v-for="chap in chapters"
            :key="chap.title"
            :class="[
              'history__mobile-chapter',
              'mobile-' + chap.title,
              { active: state.currentSection === chap.title }
            ]"
            @click="slideToChapter(chap)"
          >
            <p>{{ chap.mobile }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const { $locomotiveScroll, $onScroll } = useNuxtApp()
const isActive = ref(false)
const state = reactive({
  currentSection: '#born'
})
const textContainer = ref(null)
let locomotiveScrollInstance = null
let chaptersCopy = null
let isMobile
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

const chapters = ref([
  {
    title: '#born',
    text: 'Nacimiento',
    mobile: 'I'
  },
  {
    title: '#fifty',
    text: 'Quincuagésimo Aniversario',
    mobile: 'II'
  },
  {
    title: '#hundred',
    text: 'Centésimo Aniversario',
    mobile: 'III'
  }
])

const setChapterPositions = () => {
  chapters.value.forEach((chapter) => {
    const element = textContainer.value.querySelector(chapter.title)
    chapter.leftPosition = element.offsetLeft
    chapter.topPosition = element.offsetTop
  })
  chaptersCopy = [...chapters.value].reverse()
}

const slideToChapter = (chapter) => {
  locomotiveScrollInstance.scrollTo(chapter.title, { offset: -100 })
}

const listenScroll = (instance) => {
  const currentChapter = chaptersCopy.find((chapter) =>
    isMobile
      ? chapter.topPosition <= instance.scroll.y + 100
      : chapter.leftPosition <= instance.scroll.x + 100
  )
  state.currentSection = currentChapter ? currentChapter.title : state.currentSection
}

onMounted(() => {
  useGsap.to(textContainer.value.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 1,
    ease: 'easeInOut'
  })

  locomotiveScrollInstance = $locomotiveScroll(
    textContainer.value.querySelector('[data-scroll-container]') || undefined,
    { direction: 'horizontal' }
  )
  setChapterPositions()
  $onScroll(listenScroll)
  setTimeout(() => locomotiveScrollInstance.update(), 1000)
  onUnmounted(() => {
    locomotiveScrollInstance.destroy()
  })
})
</script>

<style lang="scss" scoped>
.page-history {
  text-align: center;
  background: #f9f9f9;
  color: #000;
  @media only screen and (min-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    text-align: center;
    will-change: transform;
  }
  svg {
    position: absolute;
    pointer-events: none;
  }
  .history {
    p {
      color: #000;
    }
    .history__aside {
      position: fixed;
      width: 30vw;
      height: 100vw;
      z-index: 2;
      width: 25vw;
      transform: translateX(-80%);
      transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
      .history__aside-container {
        position: absolute;
        left: 0;
        width: 80%;
        background: #000;
        height: 100vh;
        text-align: left;
        p {
          color: #fff;
        }
        .history__aside-filter {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          .history__aside-filter--title {
            text-transform: uppercase;
            padding: 1vw 0;
            padding: 1vw 2.5vw;
          }
          ul li {
            padding: 0.3vw 2.5vw;
            position: relative;
            transition: background 0.7s cubic-bezier(0.19, 1, 0.22, 1);
            cursor: pointer;
          }
          ul li p {
            display: inline-block;
            letter-spacing: 0.3px;
            transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
            pointer-events: none;
            font-family: PTSerifPro-Book;
          }
          ul li:hover p {
            color: #b5a492;
          }
          ul li.active p {
            color: #b5a492;
          }
        }
      }
      .history__aside__trigger-wrapper {
        position: absolute;
        height: 100vh;
        width: 20%;
        padding: 0 1vw;
        background: #f9f9f9;
        right: 0px;
        top: 0;
        cursor: pointer;
        div {
          position: relative;
          top: 50%;
          transform: translateY(-26%);
          p {
            transform: rotate(0) translateX(0) translateY(0);
            transform-origin: 50% 100%;
            position: relative;
            top: 32%;
            padding: 0.4vw 0;
            color: #000;
            font-weight: 600;
          }
          .active {
            color: #b5a492;
          }
        }
        @media only screen and (max-width: 768px) {
          display: none;
        }
      }
    }
    .history__aside.active {
      transform: translateX(0);
    }
    .history__timeline {
      height: 100vh;
      width: 100%;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      margin-left: 50px;
      .history__timeline-wrapper {
        padding: 15vh 0;
        text-align: left;
        .history__item {
          .history__item-wrapper {
            margin-right: 8vw;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            height: 100%;
          }
          .space {
            margin-right: 8vw;
            -ms-flex-pack: justify;
            justify-content: space-between;
          }
          .history__item-wrapper.normal {
            -ms-flex-pack: start;
            justify-content: flex-start;
          }
          .history__item-wrapper.end {
            -ms-flex-pack: end;
            justify-content: flex-end;
          }
          .history__item-wrapper.center {
            -ms-flex-pack: center;
            justify-content: center;
          }
          .history__item-wrapper.bottom--20 {
            padding-bottom: 20%;
          }
          .history__item-wrapper.bottom--30 {
            padding-bottom: 30%;
          }
          .history__item-wrapper.bottom--40 {
            padding-bottom: 40%;
          }
          .history__item-wrapper.bottom--50 {
            padding-bottom: 50%;
          }
          .history__item-wrapper.bottom--0,
          .history__item-wrapper.bottom--20,
          .history__item-wrapper.bottom--30,
          .history__item-wrapper.bottom--40,
          .history__item-wrapper.bottom--50 {
            -ms-flex-pack: end;
            justify-content: flex-end;
            @media only screen and (max-width: 768px) {
              padding-bottom: 0;
            }
          }
          .history__item-text--date,
          .history__item-text--text,
          .history__item-text--title {
            letter-spacing: 0;
            max-width: 25vw;
            white-space: nowrap;
            white-space: initial;
            @media only screen and (max-width: 768px) {
              max-width: 100vw;
            }
          }
          .history__item-text--date {
            font-size: 2.3vw;
            font-family: NewBaskervilleC;
            padding-bottom: 2.8vw;
            transition: color 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            color: #978268;
            @media only screen and (max-width: 768px) {
              font-size: 8vw;
              padding-bottom: 7vw;
            }
          }
          .history__item-text--title {
            letter-spacing: 0;
            font-size: 1.2vw;
            font-style: italic;
            font-family: 'Playfair Display';
            @media only screen and (max-width: 768px) {
              font-size: 4vw;
              width: 100% !important;
            }
          }
          .history__item-text--text {
            letter-spacing: 0;
            line-height: 1.5;
            padding: 1vw 0;
            font-family: PTSerifPro-Book;
            @media only screen and (max-width: 768px) {
              padding-bottom: 5vw;
            }
          }
          .history__item-image {
            width: 100%;
            object-fit: contain;
            max-height: 40vh;
            object-position: 0 0;
          }
          .history__item-image.modified {
            @media only screen and (max-width: 768px) {
              width: 100% !important;
              height: auto !important;
            }
          }
          .history__item-image--small {
            img {
              width: 18vh;
            }
            p {
              letter-spacing: 0;
              line-height: 1.3 !important;
              &:first-of-type {
                color: #b09e89;
              }
              &p:last-of-type {
                line-height: 0;
              }
            }
          }
          .history__item-image--small.left {
            padding-left: 37%;
            @media only screen and (max-width: 768px) {
              padding-left: 50%;
            }
          }
          .history__item-aside--bottom,
          .history__item-aside--left,
          .history__item-aside--right {
            img {
              @media only screen and (max-width: 768px) {
                height: 50vw !important;
              }
            }
            p {
              &:first-of-type {
                color: #b09e89;
              }
            }
          }
          .history__item-aside--left {
            span {
              float: left;
              text-align: right;
              padding-right: 1vw;
              @media only screen and (max-width: 768px) {
                padding-right: 6vw;
              }
              p {
                letter-spacing: 0;
                line-height: 1.3 !important;
                @media only screen and (max-width: 768px) {
                  text-align: left;
                }
              }
            }
          }
          .history__item-aside--right {
            span {
              position: relative;
              left: 1vw;
              @media only screen and (max-width: 768px) {
                left: 6vw;
              }
              p {
                letter-spacing: 0;
                &:first-of-type {
                  overflow: hidden;
                  white-space: initial;
                  line-height: 1.3;
                }
                &:last-of-type {
                  line-height: 1.6;
                }
              }
            }
            img {
              height: 24vw;
              float: left;
            }
          }
          .history__item-aside--right.bottom-10 {
            span {
              top: 19vw;
            }
          }
          .history__item-aside--right {
            span {
              p {
                letter-spacing: 0;
                line-height: 1.3 !important;
              }
            }
          }
          .history__item-misc {
            p {
              letter-spacing: 0;
              line-height: 2;
            }
          }
          a {
            &:hover {
              color: #978268;
            }
          }
          &:last-of-type {
            padding-right: 16vw;
          }
          @media only screen and (max-width: 768px) {
            width: 100%;
            display: block;
            height: auto;
            padding-bottom: 15vw;
            margin-right: 0;
          }
        }
        .history__item.margin-0 {
          margin-right: 0;
        }
        @media only screen and (max-width: 768px) {
          white-space: normal;
        }
      }
      @media only screen and (max-width: 768px) {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        left: 0;
        right: 0;
        transform: translateX(0) !important;
      }
    }
    .history__mobile {
      position: fixed;
      bottom: 0;
      width: 100vw;
      background: #f9f9f9;
      height: auto;
      z-index: 1;
      display: none;
      @media only screen and (max-width: 768px) {
        display: block;
      }
      ul {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        .history__mobile-chapter {
          display: inline-block;
          padding: 6vw 0;
          width: 100%;
          position: relative;
          transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
          &:before {
            content: '';
            background: #cec4bb;
            position: absolute;
            top: 0;
            height: 1.4vw;
            left: 0;
            width: 100%;
            display: block;
            opacity: 0;
          }
        }
        .active {
          background: #fff;
          &:before {
            opacity: 1;
          }
        }
      }
      p {
        color: #3f3f3f;
        font-size: 4.5vw;
        pointer-events: none;
      }
    }
  }
}
</style>
