<template>
  <main ref="privacy">
    <smooth-scroll>
      <section id="page-privacy" class="page page-privacy" data-scroll-section>
        <div class="privacy">
          <div class="device-content">
            <template v-if="locale === 'en'">
              <h1 class="privacy__title">Privacy Notice</h1>
              <p class="privacy__updated">Last updated: April 27, 2026</p>

              <h2>Responsible party</h2>
              <p>
                Respetable Logia Simbólica Memento Mori N.° 107, affiliated with the Gran Logia
                Cosmos del Estado de Chihuahua. Postal address: Calle Libertad 1004, Zona Centro,
                31000 Chihuahua, Chih., Mexico. Contact:
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>
                — Phone:
                <a href="tel:+526366976926">+52 636 697 6926</a>
              </p>

              <h2>Scope</h2>
              <p>
                This notice applies only to the website memento-mori.mx and any subdomains we may
                operate.
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

              <h2>Consent and legal basis</h2>
              <p>
                Processing of the personal data you provide is based on your consent when you
                voluntarily submit a membership inquiry using your own email client after using the
                application form on this site.
              </p>

              <h2>Data retention</h2>
              <p>
                Data received by email is retained only for the duration necessary to process the
                application and maintain internal lodge records, in accordance with applicable
                regulations.
              </p>

              <h2>Your rights</h2>
              <p>
                You may request access, rectification, cancellation, or object to processing (ARCO
                rights under Mexican law where applicable) by writing to
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>. Where
                possible, use the same email address you provided in your application and describe
                your request clearly; we may ask for reasonable identification.
              </p>
              <p>
                We will respond within the time limits set by applicable Mexican law (ordinarily up
                to 20 business days, with one possible extension of the same length when justified).
              </p>
              <p>
                If you reside in Mexico and consider that your rights have been infringed, you may
                file a complaint with the National Institute of Transparency, Access to Information
                and Protection of Personal Data (INAI):
                <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer"
                  >inai.org.mx</a
                >.
              </p>

              <h2>International transfers</h2>
              <p>
                We do not sell or rent your personal data. Membership application data is not
                internationally transferred by the lodge through this website; it is delivered only
                to the secretary's mailbox via the email path chosen on your device.
              </p>

              <h2>Security</h2>
              <p>
                The site is served over HTTPS. Application content leaves your device through your
                own mail program; we recommend a secure connection and keeping your software
                updated.
              </p>

              <h2>Minors</h2>
              <p>
                This site is not aimed at children under 18. Membership procedures assume adult
                eligibility; do not submit minors' data unless you have lawful authority to do so.
              </p>

              <h2>Service providers</h2>
              <p>
                Google Analytics (Google LLC) processes aggregated usage statistics under its own
                policies. Further information:
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Google Privacy Policy</a
                >.
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

              <h2>Changes to this notice</h2>
              <p>
                We may update this notice for legal or operational reasons. The date at the top
                reflects the latest version.
              </p>
            </template>

            <template v-else>
              <h1 class="privacy__title">Aviso de Privacidad</h1>
              <p class="privacy__updated">Última actualización: 27 de abril de 2026</p>

              <h2>Responsable</h2>
              <p>
                Respetable Logia Simbólica Memento Mori N.° 107, jurisdiccionada a la Gran Logia
                Cosmos del Estado de Chihuahua. Domicilio: C. Libertad 1004, Zona Centro, 31000
                Chihuahua, Chih., México. Contacto:
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>
                — Teléfono:
                <a href="tel:+526366976926">+52 636 697 6926</a>
              </p>

              <h2>Alcance</h2>
              <p>
                Este aviso aplica únicamente al sitio web memento-mori.mx y a los subdominios que,
                en su caso, operemos.
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

              <h2>Consentimiento y base jurídica</h2>
              <p>
                El tratamiento de los datos personales se fundamenta en el consentimiento que usted
                otorga al enviar voluntariamente la solicitud mediante su propio cliente de correo,
                después de utilizar el formulario de ingreso en este sitio.
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
                Particulares (LFPDPPP), usted puede ejercer los derechos de Acceso, Rectificación,
                Cancelación y Oposición escribiendo a
                <a href="mailto:secretaria@memento-mori.mx">secretaria@memento-mori.mx</a>. De ser
                posible, use el mismo correo con el que envió su solicitud y describa con claridad
                su petición; podremos solicitar identificación razonable.
              </p>
              <p>
                Daremos respuesta en los plazos que establece la normativa aplicable (ordinariamente
                hasta 20 días hábiles, prorrogables una sola vez por un periodo igual cuando resulte
                justificado).
              </p>
              <p>
                Si considera que sus derechos han sido vulnerados, puede presentar una denuncia ante
                el Instituto Nacional de Transparencia, Acceso a la Información y Protección de
                Datos Personales (INAI):
                <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer"
                  >inai.org.mx</a
                >.
              </p>

              <h2>Transferencias internacionales</h2>
              <p>
                No vendemos ni arrendamos sus datos personales. La información de la solicitud de
                ingreso no es transferida internacionalmente por la logia a través de este sitio;
                únicamente se envía al buzón de la secretaría por la ruta de correo que usted
                utilice en su equipo.
              </p>

              <h2>Medidas de seguridad</h2>
              <p>
                El sitio se publica mediante HTTPS. Los datos de la solicitud salen de su
                dispositivo a través de su propia aplicación de correo; recomendamos usar una
                conexión segura y mantener sus programas y equipo actualizados.
              </p>

              <h2>Menores de edad</h2>
              <p>
                Este sitio no está dirigido a menores de 18 años. Los trámites de ingreso suponen
                elegibilidad de personas adultas; no proporcione datos de menores salvo que cuente
                con la representación legal correspondiente.
              </p>

              <h2>Encargados y proveedores</h2>
              <p>
                Google Analytics (Google LLC) trata estadísticas agregadas de uso conforme a sus
                propias políticas. Más información en la
                <a
                  href="https://policies.google.com/privacy?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Política de Privacidad de Google</a
                >.
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

              <h2>Modificaciones al aviso</h2>
              <p>
                Podemos actualizar este aviso por cambios legales u operativos. La fecha indicada al
                inicio corresponde a la versión más reciente.
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
