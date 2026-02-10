<template>
  <main ref="credits">
    <smooth-scroll>
      <section id="page-credits" class="page page-credits" data-scroll-section>
        <div class="credits">
          <div class="device-content">
            <div class="row">
              <div class="col-6">
                <p>{{ $t('credits.contact_us') }}</p>
              </div>
              <div class="col-6">
                <p>
                  <a href="mailto:secretaria@memento-mori.mx" target="_blank">
                    secretaria@memento-mori.mx
                  </a>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('credits.archive_materials') }}</p>
              </div>
              <div class="col-6">
                <p>Secretaria - Memento Mori No.107</p>
                <p>
                  <a href="https://granlogiacosmos.mx/" target="_blank">
                    Archivo Historico. - Noble Leal y Centenaria Muy Respetable Gran Logia Cosmos
                  </a>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('credits.music') }}</p>
              </div>
              <div class="col-6">
                <p>
                  <a href="http://www.johannjohannsson.com" target="_blank">
                    Jóhann Jóhannsson - McCanick
                  </a>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('credits.development_design') }}</p>
              </div>
              <div class="col-6">
                <p>
                  <a href="https://ivansotelo.me" target="_blank">
                    V:.H:. M:.M:. Jesús Iván Sotelo Vargas
                  </a>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-6" />
              <div class="col-6">
                <p>{{ $t('credits.warning') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </smooth-scroll>
  </main>
</template>

<script setup lang="ts">
const credits = ref<HTMLElement | null>(null)
const { $locomotiveScroll } = useNuxtApp()

onMounted(() => {
  const scroll = $locomotiveScroll(
    credits.value?.querySelector('[data-scroll-container]') || undefined
  )
  useGsap.to(credits.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 1,
    ease: 'easeInOut'
  })
  useGsap.to(credits.value?.querySelectorAll('.row'), 1.5, {
    y: -50,
    ease: 'easeInOut',
    stagger: 0.1
  })
  onUnmounted(() => {
    scroll.destroy()
  })
})
</script>

<style lang="scss" scoped>
.credits {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
  .made-with-heart {
    color: #fff;
  }
  .row {
    width: 80%;
    padding: 0.4vw 0;
    @media only screen and (max-width: 768px) {
      padding: 2vw 0;
      width: 90%;
    }
    .col-6 {
      a,
      p {
        color: #fff;
        letter-spacing: 0;
        font-family: PTSerifPro-Book;
        @media only screen and (max-width: 768px) {
          line-height: 1.4;
        }
      }
      &:first-of-type {
        font-size: 1.2vw;
        font-style: italic;
        font-family: 'Playfair Display';
        @media only screen and (max-width: 768px) {
          font-size: 5vw;
        }
      }
      a {
        transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
        &:hover {
          color: #978268;
        }
      }
      &:first-of-type {
        text-align: right;
        padding-right: 5%;
        a,
        p {
          font-size: 1.2vw;
          font-style: italic;
          font-family: 'Playfair Display';
          @media only screen and (max-width: 768px) {
            font-size: 5vw;
          }
        }
        @media only screen and (max-width: 768px) {
          text-align: left;
        }
      }
      @media only screen and (max-width: 768px) {
        width: 100%;
      }
      &:last-of-type {
        text-align: left;
        font: 0.6875rem/1.563rem NewBaskervilleExpOdC;
      }
    }
    &:first-of-type {
      a,
      p {
        font-size: 1.2vw;
        font-style: italic;
        font-family: 'Playfair Display';
        @media only screen and (max-width: 768px) {
          font-size: 5vw;
        }
      }
    }
    &:last-of-type {
      text-align: left;
      a,
      p {
        width: 80%;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.37);
        @media only screen and (max-width: 768px) {
          a,
          p {
            width: 100%;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    height: 90vh;
  }
}
</style>
