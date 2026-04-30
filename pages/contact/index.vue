<template>
  <main ref="contact">
    <smooth-scroll>
      <section id="page-contact" class="page page-contact" data-scroll-section>
        <div class="contact">
          <div class="device-content">
            <div class="row">
              <div class="col-6">
                <p>{{ $t('contact-page.lodge') }}</p>
              </div>
              <div class="col-6">
                <p>Respetable Logia Simbólica Memento Mori N.° 107</p>
                <p>{{ $t('contact-page.grand-lodge') }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('contact-page.location') }}</p>
              </div>
              <div class="col-6">
                <p>{{ $t('contact-page.address-line1') }}</p>
                <p>{{ $t('contact-page.address-line2') }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('contact-page.phone-label') }}</p>
              </div>
              <div class="col-6">
                <p>
                  <a :href="'tel:' + $t('contact-page.phone-uri')">{{
                    $t('contact-page.phone-display')
                  }}</a>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('contact-page.email') }}</p>
              </div>
              <div class="col-6">
                <p>
                  <a href="mailto:secretaria@memento-mori.mx"> secretaria@memento-mori.mx </a>
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('contact-page.membership') }}</p>
              </div>
              <div class="col-6">
                <nuxt-link :to="localePath('ser-mason')">
                  {{ $t('contact-page.membership-link') }}
                </nuxt-link>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>{{ $t('contact-page.hours-label') }}</p>
              </div>
              <div class="col-6 contact__hours-body">
                <p>{{ $t('contact-page.hours-body') }}</p>
              </div>
            </div>
            <div class="contact__map row">
              <div class="contact__map-inner">
                <p class="contact__map-heading">{{ $t('contact-page.map-title') }}</p>
                <div class="contact__map-frame">
                  <iframe
                    :title="$t('contact-page.map-title')"
                    :src="mapEmbedSrc"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </smooth-scroll>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const contactTitle = computed(() =>
  locale.value === 'en' ? 'Contact | Memento Mori No. 107' : 'Contacto | Memento Mori N.° 107'
)
const contactDescription = computed(() =>
  locale.value === 'en'
    ? 'Contact Respectable Symbolic Lodge Memento Mori No. 107 in Chihuahua, Mexico: Calle Libertad address, Tuesdays 8 p.m. meetings (tenidas), phone, email, map and membership.'
    : 'Contacto Respetable Logia Simbólica Memento Mori N.° 107 en Chihuahua: domicilio en Calle Libertad, tenidas martes 20:00 h, teléfono, correo, mapa y solicitud de ingreso.'
)

const mapEmbedSrc = computed(() => {
  const addr =
    locale.value === 'en'
      ? 'Calle Libertad 1004, Zona Centro, 31000 Chihuahua, Chihuahua, Mexico'
      : 'Calle Libertad 1004, Zona Centro, 31000 Chihuahua, Chihuahua, México'
  const hl = locale.value === 'en' ? 'en' : 'es'
  return `https://maps.google.com/maps?q=${encodeURIComponent(addr)}&hl=${hl}&z=17&output=embed`
})
useSeoMeta({
  title: contactTitle,
  description: contactDescription,
  ogTitle: contactTitle,
  ogDescription: contactDescription
})

const contactBreadcrumb = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale.value === 'en' ? 'Home' : 'Inicio',
        item: locale.value === 'en' ? 'https://memento-mori.mx/en' : 'https://memento-mori.mx/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale.value === 'en' ? 'Contact' : 'Contacto',
        item:
          locale.value === 'en'
            ? 'https://memento-mori.mx/en/contact'
            : 'https://memento-mori.mx/contact'
      }
    ]
  })
)
useHead({ script: [{ type: 'application/ld+json', children: contactBreadcrumb }] })

const contact = ref<HTMLElement | null>(null)
const { $locomotiveScroll } = useNuxtApp()

onMounted(() => {
  const scroll = $locomotiveScroll(
    contact.value?.querySelector('[data-scroll-container]') || undefined
  )
  useGsap.to(contact.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 1,
    ease: 'easeInOut'
  })
  useGsap.to(contact.value?.querySelectorAll('.row'), 1.5, {
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
.contact {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 6vh 0 10vh;
  box-sizing: border-box;

  .row .col-6.contact__hours-body p {
    line-height: 1.55;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.88);

    @media only screen and (max-width: 768px) {
      font-size: 3.6vw;
    }
  }

  &__map {
    width: 80%;
    margin: 1.5rem auto 0;
    padding-top: 0.75rem;
    display: block;

    @media only screen and (max-width: 768px) {
      width: 90%;
      margin-top: 2rem;
    }

    &-inner {
      width: 100%;
    }

    &-heading {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 1vw;
      color: rgba(255, 255, 255, 0.72);
      margin-bottom: 0.65rem;
      text-align: center;

      @media only screen and (max-width: 768px) {
        font-size: 4vw;
      }
    }

    &-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      max-height: 340px;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(0, 0, 0, 0.2);

      iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
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
      a {
        transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
        &:hover {
          color: #978268;
        }
      }
      @media only screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }
}
</style>
