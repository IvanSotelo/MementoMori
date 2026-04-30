<template lang="pug">
main(ref="serMason")
  smooth-scroll
    section#page-ser-mason.page.page-ser-mason(data-scroll-section)
      .vertical-align
        .vertical-align-item
          h2.page-ser-mason__title {{ $t('ser-mason.title') }}

          article.page-ser-mason__article
            p.page-ser-mason__lead {{ $t('ser-mason.lead') }}

            section.page-ser-mason__block(
              v-for="(block, idx) in contentSections"
              :key="'sec-' + idx"
            )
              h3.page-ser-mason__block-heading {{ block.heading }}
              p.page-ser-mason__block-body {{ block.body }}

            section.page-ser-mason__block
              h3.page-ser-mason__block-heading {{ $t('ser-mason.requirements-heading') }}
              p.page-ser-mason__block-body {{ $t('ser-mason.requirements-intro') }}
              ul.page-ser-mason__list
                li(v-for="(item, idx) in requirementItems" :key="'req-' + idx") {{ item }}

            section.page-ser-mason__block
              h3.page-ser-mason__block-heading {{ $t('ser-mason.process-heading') }}
              ol.page-ser-mason__list.page-ser-mason__list--numbered
                li(v-for="(step, idx) in processSteps" :key="'step-' + idx") {{ step }}

            p.page-ser-mason__closing {{ $t('ser-mason.closing') }}

            section.page-ser-mason__faq(v-if="faqItems.length")
              h3.page-ser-mason__block-heading {{ $t('ser-mason.faq-heading') }}
              details.page-ser-mason__faq-item(v-for="(item, idx) in faqItems" :key="'faq-' + idx")
                summary.page-ser-mason__faq-q {{ item.question }}
                p.page-ser-mason__faq-a {{ item.answer }}

          p.page-ser-mason__intro {{ $t('ser-mason.intro') }}

          p.page-ser-mason__contact-phone
            span.page-ser-mason__contact-phone-label {{ $t('contact-page.phone-label') }}:
            a.page-ser-mason__contact-phone-link(:href="'tel:' + $t('contact-page.phone-uri')") {{ $t('contact-page.phone-display') }}

          form.page-ser-mason__form(@submit.prevent="handleSubmit" novalidate)
            .form-group
              label(for="nombre") {{ $t('ser-mason.fields.name') }} *
              input#nombre(
                v-model="form.nombre"
                type="text"
                name="nombre"
                required
                :placeholder="$t('ser-mason.placeholders.name')"
              )
              span.form-error(v-if="errors.nombre") {{ errors.nombre }}

            .form-group
              label(for="email") {{ $t('ser-mason.fields.email') }} *
              input#email(
                v-model="form.email"
                type="email"
                name="email"
                required
                :placeholder="$t('ser-mason.placeholders.email')"
              )
              span.form-error(v-if="errors.email") {{ errors.email }}

            .form-group
              label(for="telefono") {{ $t('ser-mason.fields.phone') }}
              input#telefono(
                v-model="form.telefono"
                type="tel"
                name="telefono"
                :placeholder="$t('ser-mason.placeholders.phone')"
              )

            .form-group
              label(for="mensaje") {{ $t('ser-mason.fields.message') }} *
              textarea#mensaje(
                v-model="form.mensaje"
                name="mensaje"
                rows="5"
                required
                :placeholder="$t('ser-mason.placeholders.message')"
              )
              span.form-error(v-if="errors.mensaje") {{ errors.mensaje }}

            .form-actions
              button.page-ser-mason__submit(type="submit" :disabled="sending")
                template(v-if="sending") {{ $t('ser-mason.sending') }}
                template(v-else) {{ $t('ser-mason.submit') }}

          p.page-ser-mason__note {{ $t('ser-mason.noteBefore') }}@{{ $t('ser-mason.noteAfter') }}

          p.page-ser-mason__privacy
            | {{ $t('ser-mason.privacy-prefix') }}
            nuxt-link.page-ser-mason__privacy-link(:to="localePath('privacidad')") {{ $t('ser-mason.privacy-link') }}
            | {{ $t('ser-mason.privacy-suffix') }}
</template>

<script setup lang="ts">
import type LocomotiveScroll from 'locomotive-scroll'

const EMAIL_TO = 'secretaria@memento-mori.mx'

const { locale, t, tm } = useI18n()
const localePath = useLocalePath()

type SectionBlock = { heading: string; body: string }
type FaqItem = { question: string; answer: string }

const contentSections = computed(() => tm('ser-mason.content-sections') as SectionBlock[])
const requirementItems = computed(() => tm('ser-mason.requirements-items') as string[])
const processSteps = computed(() => tm('ser-mason.process-steps') as string[])
const faqItems = computed(() => tm('ser-mason.faq') as FaqItem[])

const pageTitle = computed(() =>
  locale.value === 'en'
    ? 'Join Freemasonry in Chihuahua — membership application'
    : 'Ser masón en Chihuahua — solicitud de ingreso'
)

const pageOgTitle = computed(() =>
  locale.value === 'en'
    ? 'Join Freemasonry in Chihuahua | Memento Mori No. 107 — membership'
    : 'Ser masón en Chihuahua | Memento Mori N.° 107 — solicitud de ingreso'
)

const pageDescription = computed(() =>
  locale.value === 'en'
    ? 'Requirements and admission process for Respectable Symbolic Lodge Memento Mori No. 107 in Chihuahua (Grand Lodge Cosmos): meetings on Tuesdays, FAQ, and confidential membership application to the secretary.'
    : 'Requisitos y proceso de ingreso a la Respetable Logia Simbólica Memento Mori N.° 107 en Chihuahua (Gran Logia Cosmos): tenidas, preguntas frecuentes y solicitud confidencial a la secretaría.'
)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageOgTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  twitterTitle: pageOgTitle,
  twitterDescription: pageDescription
})

const organizationJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Respetable Logia Simbólica Memento Mori N.° 107',
  alternateName: ['Memento Mori No. 107', 'R∴L∴S∴ Memento Mori 107'],
  url: 'https://memento-mori.mx',
  telephone: '+526366976926',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'https://schema.org/Tuesday',
    opens: '20:00',
    closes: '23:00'
  },
  description:
    'Logia masónica simbólica en la ciudad de Chihuahua, jurisdiccionada a la Gran Logia Cosmos del estado de Chihuahua.',
  areaServed: {
    '@type': 'Place',
    name: 'Ciudad de Chihuahua',
    description: 'Capital del estado de Chihuahua, México'
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'Gran Logia Cosmos del Estado de Chihuahua',
    url: 'https://granlogiacosmos.mx/'
  }
}))

const serMasonBreadcrumb = computed(() =>
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
        name: locale.value === 'en' ? 'Becoming a Freemason' : 'Ser Masón',
        item:
          locale.value === 'en'
            ? 'https://memento-mori.mx/en/ser-mason'
            : 'https://memento-mori.mx/ser-mason'
      }
    ]
  })
)

const faqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.value.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
}))

useHead({
  script: computed(() => [
    {
      key: 'jsonld-memento-mori-org',
      type: 'application/ld+json',
      children: JSON.stringify(organizationJsonLd.value)
    },
    {
      key: 'jsonld-breadcrumb',
      type: 'application/ld+json',
      children: serMasonBreadcrumb.value
    },
    {
      key: 'jsonld-ser-mason-faq',
      type: 'application/ld+json',
      children: JSON.stringify(faqJsonLd.value)
    }
  ])
})

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: ''
})

const errors = reactive<Record<string, string>>({
  nombre: '',
  email: '',
  mensaje: ''
})

const sending = ref(false)
const serMason = ref<HTMLElement | null>(null)
const { $locomotiveScroll } = useNuxtApp()

let locomotiveScrollInstance: LocomotiveScroll | null = null

function validate(): boolean {
  errors.nombre = ''
  errors.email = ''
  errors.mensaje = ''

  let valid = true

  if (!form.nombre?.trim()) {
    errors.nombre = t('ser-mason.validation.name-required')
    valid = false
  }

  if (!form.email?.trim()) {
    errors.email = t('ser-mason.validation.email-required')
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('ser-mason.validation.email-invalid')
    valid = false
  }

  if (!form.mensaje?.trim()) {
    errors.mensaje = t('ser-mason.validation.message-required')
    valid = false
  }

  return valid
}

function buildMailtoBody(): string {
  const lines = [
    `${t('ser-mason.mailto.name')}: ${form.nombre.trim()}`,
    `${t('ser-mason.mailto.email')}: ${form.email.trim()}`,
    form.telefono?.trim() ? `${t('ser-mason.mailto.phone')}: ${form.telefono.trim()}` : null,
    '',
    `${t('ser-mason.mailto.message')}:`,
    form.mensaje.trim()
  ].filter(Boolean)
  return lines.join('\n')
}

function handleSubmit() {
  if (!validate()) return

  sending.value = true

  const subjectLead =
    locale.value === 'en'
      ? '[Memento Mori] Membership application'
      : '[Memento Mori] Solicitud de ingreso'
  const subject = encodeURIComponent(`${subjectLead} — ${form.nombre.trim()}`)
  const body = encodeURIComponent(buildMailtoBody())
  const mailto = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`

  window.location.href = mailto

  setTimeout(() => {
    sending.value = false
  }, 500)
}

function bumpLocomotive() {
  locomotiveScrollInstance?.update()
}

onMounted(() => {
  const scrollRoot = serMason.value?.querySelector('[data-scroll-container]') as HTMLElement | null
  locomotiveScrollInstance = scrollRoot ? $locomotiveScroll(scrollRoot) : null
  useGsap.to(serMason.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 0.5,
    ease: 'easeInOut'
  })
  nextTick(() => {
    setTimeout(() => bumpLocomotive(), 400)
    setTimeout(() => bumpLocomotive(), 1200)
  })
})

onUnmounted(() => {
  locomotiveScrollInstance?.destroy()
  locomotiveScrollInstance = null
})
</script>

<style lang="scss" scoped>
.page-ser-mason {
  opacity: 0;
  visibility: hidden;
  position: relative;
  z-index: 0;

  .vertical-align {
    padding: 10vh 5vw 14vh;
    max-width: 720px;
    margin: 0 auto;

    @media only screen and (max-width: 768px) {
      padding: 9vh 5vw 12vh;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 1.25rem;
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    letter-spacing: 0.1em;
    color: #fff;

    @media only screen and (max-width: 768px) {
      font-size: 1.35rem;
    }
  }

  &__article {
    margin-bottom: 2rem;
    text-align: left;
  }

  &__lead {
    color: #c9c9d4;
    font-size: 0.95rem;
    line-height: 1.65;
    margin: 0 0 1.5rem;
  }

  &__block {
    margin-bottom: 1.35rem;

    &-heading {
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      letter-spacing: 0.06em;
      color: #ececf2;
      margin: 0 0 0.5rem;
      font-weight: 600;
    }

    &-body {
      margin: 0;
      color: #9898a8;
      font-size: 0.9rem;
      line-height: 1.65;
    }
  }

  &__list {
    margin: 0.6rem 0 0;
    padding-left: 1.15rem;
    color: #9898a8;
    font-size: 0.88rem;
    line-height: 1.6;

    li + li {
      margin-top: 0.45rem;
    }

    &--numbered {
      list-style-type: decimal;
    }
  }

  &__closing {
    margin: 1.25rem 0 0;
    color: #a8a8b6;
    font-size: 0.88rem;
    line-height: 1.65;
  }

  &__faq {
    margin-top: 1.75rem;
    padding-top: 0.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__faq-item {
    margin-top: 0.65rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    padding: 0.35rem 0.65rem;
    background: rgba(0, 0, 0, 0.15);

    &[open] {
      border-color: rgba(151, 130, 104, 0.35);
    }
  }

  &__faq-q {
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 600;
    color: #dddde6;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  &__faq-a {
    margin: 0.5rem 0 0.35rem;
    font-size: 0.82rem;
    line-height: 1.55;
    color: #9595a3;
  }

  &__intro {
    text-align: center;
    color: #8e8e9e;
    font-size: 0.95rem;
    line-height: 1.55;
    margin-bottom: 1.25rem;
  }

  &__contact-phone {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    gap: 0.35rem;
    margin: 0 0 2rem;
    text-align: center;
    font-size: 0.9rem;

    &-label {
      font-size: 0.68rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #b8b8c4;
    }

    &-link {
      color: #e8e8ee;
      letter-spacing: 0.06em;
      transition: color 0.2s;

      &:hover {
        color: #978268;
      }
    }
  }

  &__form {
    .form-group {
      margin-bottom: 1.25rem;

      label {
        display: block;
        margin-bottom: 0.35rem;
        font-size: 0.75rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #b8b8c4;
      }

      input,
      textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 2px;
        color: #fff;
        font-family: NewBaskervilleExpOdC, serif;
        font-size: 0.95rem;
        letter-spacing: 0.02em;
        transition:
          border-color 0.2s,
          background 0.2s;

        &::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        &:focus {
          outline: none;
          border-color: #978268;
          background: rgba(255, 255, 255, 0.08);
        }
      }

      textarea {
        resize: vertical;
        min-height: 120px;
      }

      .form-error {
        display: block;
        margin-top: 0.35rem;
        font-size: 0.8rem;
        color: #c75c5c;
      }
    }

    .form-actions {
      margin-top: 1.75rem;
    }
  }

  &__submit {
    padding: 0.85rem 2rem;
    background: #978268;
    border: none;
    border-radius: 2px;
    color: #fff;
    font-family: NewBaskervilleExpOdC, serif;
    font-size: 0.9rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background 0.2s,
      opacity 0.2s;

    &:hover:not(:disabled) {
      background: #a88b6d;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &__note {
    margin-top: 2rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  &__privacy {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    line-height: 1.5;
  }

  &__privacy-link {
    color: #978268;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
    }
  }
}
</style>
