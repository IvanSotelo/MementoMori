<template lang="pug">
main(ref="guideRoot")
  smooth-scroll
    section#page-informacion-ingreso.page.page-membership-guide(data-scroll-section)
      .vertical-align
        .vertical-align-item
          h2.page-membership-guide__title {{ $t('membership-guide.title') }}

          article.page-membership-guide__article
            p.page-membership-guide__lead {{ $t('membership-guide.lead') }}

            section.page-membership-guide__block(
              v-for="(block, idx) in contentSections"
              :key="'sec-' + idx"
            )
              h3.page-membership-guide__block-heading {{ block.heading }}
              p.page-membership-guide__block-body {{ block.body }}

            section.page-membership-guide__block
              h3.page-membership-guide__block-heading {{ $t('membership-guide.requirements-heading') }}
              p.page-membership-guide__block-body {{ $t('membership-guide.requirements-intro') }}
              ul.page-membership-guide__list
                li(v-for="(item, idx) in requirementItems" :key="'req-' + idx") {{ item }}

            section.page-membership-guide__block
              h3.page-membership-guide__block-heading {{ $t('membership-guide.process-heading') }}
              ol.page-membership-guide__list.page-membership-guide__list--numbered
                li(v-for="(step, idx) in processSteps" :key="'step-' + idx") {{ step }}

            p.page-membership-guide__closing {{ $t('membership-guide.closing') }}

            section.page-membership-guide__faq(v-if="faqItems.length")
              h3.page-membership-guide__block-heading {{ $t('membership-guide.faq-heading') }}
              details.page-membership-guide__faq-item(v-for="(item, idx) in faqItems" :key="'faq-' + idx")
                summary.page-membership-guide__faq-q {{ item.question }}
                p.page-membership-guide__faq-a {{ item.answer }}

          p.page-membership-guide__back
            nuxt-link.page-membership-guide__back-link(:to="localePath('ser-mason')") {{ $t('membership-guide.back-to-form') }}
</template>

<script setup lang="ts">
import type LocomotiveScroll from 'locomotive-scroll'

const { locale, tm } = useI18n()
const localePath = useLocalePath()

type SectionBlock = { heading: string; body: string }
type FaqItem = { question: string; answer: string }

const contentSections = computed(() => tm('membership-guide.content-sections') as SectionBlock[])
const requirementItems = computed(() => tm('membership-guide.requirements-items') as string[])
const processSteps = computed(() => tm('membership-guide.process-steps') as string[])
const faqItems = computed(() => tm('membership-guide.faq') as FaqItem[])

const pageTitle = computed(() =>
  locale.value === 'en'
    ? 'Membership information — Memento Mori No. 107, Chihuahua'
    : 'Información de ingreso — Memento Mori N.° 107, Chihuahua'
)

const pageOgTitle = computed(() =>
  locale.value === 'en'
    ? 'Membership information | Memento Mori No. 107 — Chihuahua'
    : 'Información de ingreso | Memento Mori N.° 107 — Chihuahua'
)

const pageDescription = computed(() =>
  locale.value === 'en'
    ? 'What Respectable Symbolic Lodge Memento Mori No. 107 does in Chihuahua (Grand Lodge Cosmos), typical membership requirements, admission process and FAQ. Application form on the Becoming a Freemason page.'
    : 'Qué hace la Respetable Logia Simbólica Memento Mori N.° 107 en Chihuahua (Gran Logia Cosmos), requisitos orientativos, proceso de ingreso y preguntas frecuentes. El formulario está en Ser Masón.'
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

const guideBaseUrl = computed(() =>
  locale.value === 'en'
    ? 'https://memento-mori.mx/en/informacion-ingreso'
    : 'https://memento-mori.mx/informacion-ingreso'
)

const guideBreadcrumb = computed(() =>
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
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: locale.value === 'en' ? 'Membership information' : 'Información de ingreso',
        item: guideBaseUrl.value
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
      key: 'jsonld-guide-breadcrumb',
      type: 'application/ld+json',
      children: guideBreadcrumb.value
    },
    {
      key: 'jsonld-guide-faq',
      type: 'application/ld+json',
      children: JSON.stringify(faqJsonLd.value)
    }
  ])
})

const guideRoot = ref<HTMLElement | null>(null)
const { $locomotiveScroll } = useNuxtApp()

let locomotiveScrollInstance: LocomotiveScroll | null = null

function bumpLocomotive() {
  locomotiveScrollInstance?.update()
}

onMounted(() => {
  const scrollRoot = guideRoot.value?.querySelector('[data-scroll-container]') as HTMLElement | null
  locomotiveScrollInstance = scrollRoot ? $locomotiveScroll(scrollRoot) : null
  useGsap.to(guideRoot.value?.querySelector('.page'), {
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
.page-membership-guide {
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

  &__back {
    margin-top: 2rem;
    text-align: center;
  }

  &__back-link {
    color: #978268;
    font-size: 0.9rem;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s ease;

    &:hover {
      color: #fff;
    }
  }
}
</style>
