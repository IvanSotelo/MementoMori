<template>
  <main ref="privacy">
    <smooth-scroll>
      <section id="page-privacy" class="page page-privacy" data-scroll-section>
        <div class="privacy">
          <div class="device-content">
            <template v-if="locale === 'en'">
              <h1 class="privacy__title">Privacy Notice</h1>
              <p class="privacy__updated">Last updated: April 26, 2026</p>

              <h2>Responsible party</h2>
              <p>
                Respetable Logia Simbólica Memento Mori N.° 107, affiliated with the Gran Logia
                Cosmos del Estado de Chihuahua. Contact:
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>
              </p>

              <h2>Data collected</h2>
              <p>
                Through the membership application form on
                <nuxt-link :to="localePath('ser-mason')">Becoming a Freemason</nuxt-link>, the
                following data is voluntarily submitted by the user:
              </p>
              <ul>
                <li>Full name (required)</li>
                <li>Email address (required)</li>
                <li>Phone number (optional)</li>
                <li>Message or reason for application (required)</li>
              </ul>
              <p>
                This data is transmitted directly through the user's own email client to
                secretaria@memento-mori.mx. The website does not store, process, or transmit this
                data to any server.
              </p>

              <h2>Purpose</h2>
              <p>
                The data is used solely to evaluate and respond to membership applications to the
                lodge. It is not used for marketing, shared with third parties, or transferred
                outside the lodge's administrative management.
              </p>

              <h2>Data retention</h2>
              <p>
                Data received by email is retained only for the duration necessary to process the
                application and maintain internal lodge records, in accordance with applicable
                regulations.
              </p>

              <h2>Your rights</h2>
              <p>
                You may request access to, correction, or deletion of your personal data at any time
                by writing to
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>.
              </p>

              <h2>Cookies and tracking</h2>
              <p>
                This site uses Google Analytics (GA4) to collect anonymous usage statistics (pages
                visited, session duration, device type). No personally identifiable information is
                collected through analytics. You may opt out via your browser's privacy settings or
                a browser extension such as the
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Google Analytics opt-out add-on</a
                >.
              </p>
            </template>

            <template v-else>
              <h1 class="privacy__title">Aviso de Privacidad</h1>
              <p class="privacy__updated">Última actualización: 26 de abril de 2026</p>

              <h2>Responsable</h2>
              <p>
                Respetable Logia Simbólica Memento Mori N.° 107, jurisdiccionada a la Gran Logia
                Cosmos del Estado de Chihuahua. Contacto:
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>
              </p>

              <h2>Datos recabados</h2>
              <p>
                A través del formulario de solicitud de ingreso en
                <nuxt-link :to="localePath('ser-mason')">Ser Masón</nuxt-link>, el usuario
                proporciona voluntariamente los siguientes datos personales:
              </p>
              <ul>
                <li>Nombre completo (obligatorio)</li>
                <li>Correo electrónico (obligatorio)</li>
                <li>Teléfono (opcional)</li>
                <li>Mensaje o motivo de la solicitud (obligatorio)</li>
              </ul>
              <p>
                Estos datos se transmiten directamente desde el cliente de correo del usuario a
                secretaria@memento-mori.mx. El sitio web no almacena, procesa ni transmite esta
                información a ningún servidor propio.
              </p>

              <h2>Finalidad</h2>
              <p>
                Los datos se utilizan exclusivamente para evaluar y dar respuesta a solicitudes de
                ingreso a la logia. No se emplean con fines de mercadotecnia, ni se comparten con
                terceros ni se transfieren fuera de la gestión administrativa de la logia.
              </p>

              <h2>Conservación</h2>
              <p>
                Los datos recibidos por correo electrónico se conservan únicamente durante el tiempo
                necesario para atender la solicitud y mantener los registros internos de la logia,
                conforme a la normativa aplicable.
              </p>

              <h2>Derechos ARCO</h2>
              <p>
                Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares (LFPDPPP), usted puede ejercer sus derechos de Acceso, Rectificación,
                Cancelación u Oposición escribiendo a
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>.
              </p>

              <h2>Cookies y analítica</h2>
              <p>
                Este sitio utiliza Google Analytics (GA4) para recopilar estadísticas anónimas de
                uso (páginas visitadas, duración de sesión, tipo de dispositivo). No se recopila
                información de identificación personal a través de analítica. Puede desactivarla
                desde la configuración de privacidad de su navegador o mediante el
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  >complemento de inhabilitación de Google Analytics</a
                >.
              </p>
            </template>
          </div>
        </div>
      </section>
    </smooth-scroll>
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

const privacyTitle = computed(() =>
  locale.value === 'en'
    ? 'Privacy Notice | Memento Mori No. 107'
    : 'Aviso de Privacidad | Memento Mori N.° 107'
)
const privacyDescription = computed(() =>
  locale.value === 'en'
    ? 'Privacy notice for memento-mori.mx — how we handle personal data submitted through the membership application form.'
    : 'Aviso de privacidad de memento-mori.mx — cómo tratamos los datos personales enviados a través del formulario de solicitud de ingreso.'
)
useSeoMeta({
  title: privacyTitle,
  description: privacyDescription,
  ogTitle: privacyTitle,
  ogDescription: privacyDescription,
  robots: 'noindex, follow'
})

const privacyBreadcrumb = computed(() =>
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
        name: locale.value === 'en' ? 'Privacy Notice' : 'Aviso de Privacidad',
        item:
          locale.value === 'en'
            ? 'https://memento-mori.mx/en/privacidad'
            : 'https://memento-mori.mx/privacidad'
      }
    ]
  })
)
useHead({ script: [{ type: 'application/ld+json', children: privacyBreadcrumb }] })

const privacy = ref<HTMLElement | null>(null)
const { $locomotiveScroll } = useNuxtApp()

onMounted(() => {
  const scroll = $locomotiveScroll(
    privacy.value?.querySelector('[data-scroll-container]') || undefined
  )
  useGsap.to(privacy.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 0.5,
    ease: 'easeInOut'
  })
  onUnmounted(() => {
    scroll.destroy()
  })
})
</script>

<style lang="scss" scoped>
.privacy {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 12vh 0 8vh;

  .device-content {
    width: 60%;
    max-width: 720px;

    @media only screen and (max-width: 768px) {
      width: 85%;
    }
  }

  .privacy__title {
    font-family: 'Playfair Display';
    font-size: 2vw;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: #fff;
    margin-bottom: 0.3em;

    @media only screen and (max-width: 768px) {
      font-size: 6vw;
    }
  }

  .privacy__updated {
    font-family: PTSerifPro-Book;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 3em;
    letter-spacing: 0;
  }

  h2 {
    font-family: 'Playfair Display';
    font-style: italic;
    font-size: 1.1vw;
    color: #978268;
    margin-top: 2.5em;
    margin-bottom: 0.6em;
    letter-spacing: 0;

    @media only screen and (max-width: 768px) {
      font-size: 4vw;
    }
  }

  p,
  li {
    font-family: PTSerifPro-Book;
    font-size: 0.875rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.75);
    letter-spacing: 0;
    margin-bottom: 0.8em;
  }

  ul {
    padding-left: 1.5em;
    margin-bottom: 0.8em;
  }

  a {
    color: #978268;
    transition: color 0.5s ease;

    &:hover {
      color: #fff;
    }
  }
}
</style>
