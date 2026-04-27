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
                <!-- TODO: agregar dirección física del salón de sesiones -->
                <p>Chihuahua, Chihuahua, México</p>
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
    ? 'Contact Respectable Symbolic Lodge Memento Mori No. 107 in Chihuahua, Mexico. Write to us at secretaria@memento-mori.mx or submit a membership application.'
    : 'Contacta a la Respetable Logia Simbólica Memento Mori N.° 107 en Chihuahua, México. Escríbenos a secretaria@memento-mori.mx o envía una solicitud de ingreso.'
)
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
  align-items: center;
  height: 100vh;
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
  @media only screen and (max-width: 768px) {
    height: 90vh;
  }
}
</style>
