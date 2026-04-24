<template lang="pug">
main(ref="serMason")
  section#page-ser-mason.page.page-ser-mason
    .vertical-align
      .vertical-align-item
        h2.page-ser-mason__title {{ copy.title }}
        p.page-ser-mason__intro {{ copy.intro }}

        section.page-ser-mason__faq(:aria-label="copy.faqAriaLabel")
          h3.page-ser-mason__faq-heading {{ copy.faqHeading }}
          dl.page-ser-mason__faq-list
            template(v-for="(item, i) in copy.faqItems" :key="i")
              dt.page-ser-mason__faq-q {{ item.q }}
              dd.page-ser-mason__faq-a {{ item.a }}

        form.page-ser-mason__form(
          @submit.prevent="handleSubmit"
          novalidate
        )
          .form-group
            label(for="nombre") {{ copy.fields.name }} *
            input#nombre(
              v-model="form.nombre"
              type="text"
              name="nombre"
              required
              :placeholder="copy.placeholders.name"
            )
            span.form-error(v-if="errors.nombre") {{ errors.nombre }}

          .form-group
            label(for="email") {{ copy.fields.email }} *
            input#email(
              v-model="form.email"
              type="email"
              name="email"
              required
              :placeholder="copy.placeholders.email"
            )
            span.form-error(v-if="errors.email") {{ errors.email }}

          .form-group
            label(for="telefono") {{ copy.fields.phone }}
            input#telefono(
              v-model="form.telefono"
              type="tel"
              name="telefono"
              :placeholder="copy.placeholders.phone"
            )

          .form-group
            label(for="mensaje") {{ copy.fields.message }} *
            textarea#mensaje(
              v-model="form.mensaje"
              name="mensaje"
              rows="5"
              required
              :placeholder="copy.placeholders.message"
            )
            span.form-error(v-if="errors.mensaje") {{ errors.mensaje }}

          .form-actions
            button.page-ser-mason__submit(type="submit" :disabled="sending")
              template(v-if="sending") {{ copy.sending }}
              template(v-else) {{ copy.submit }}

        p.page-ser-mason__note {{ copy.noteBefore }}@{{ copy.noteAfter }}
</template>

<script setup lang="ts">
const EMAIL_TO = 'secretaria@memento-mori.mx'

const SER_MASON_COPY = {
  es: {
    title: 'Quiero ser masón en Chihuahua — solicitud de ingreso',
    intro:
      'Muchas personas buscan “quiero ser masón en Chihuahua” o “logias masoneras en Chihuahua”: aquí puede dar el primer paso. Complete el formulario y la secretaría de la Respetable Logia Simbólica Memento Mori N.° 107 revisará su mensaje y se pondrá en contacto.',
    faqHeading: 'Sobre el trámite en Chihuahua',
    faqAriaLabel: 'Preguntas frecuentes sobre ser masón en Chihuahua',
    faqItems: [
      {
        q: 'Quiero ser masón en Chihuahua. ¿Este formulario es el canal correcto?',
        a: 'Sí. Es el medio oficial de primer contacto con la secretaría de la R∴L∴S∴ Memento Mori N.° 107. No sustituye entrevistas ni requisitos posteriores, pero permite iniciar la conversación.'
      },
      {
        q: '¿Todas las logias masónicas en Chihuahua usan el mismo proceso?',
        a: 'Las logias regulares del estado suelen depender de la Gran Logia Cosmos; cada taller puede tener matices. Esta solicitud es específica para Memento Mori N.° 107 en la ciudad de Chihuahua.'
      }
    ],
    fields: {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      message: 'Mensaje o motivo de su solicitud'
    },
    placeholders: {
      name: 'Su nombre',
      email: 'ejemplo: nombre en dominio.com',
      phone: 'Opcional',
      message: 'Escriba aquí su mensaje...'
    },
    validation: {
      nameRequired: 'El nombre es obligatorio',
      emailRequired: 'El correo es obligatorio',
      emailInvalid: 'Introduzca un correo válido',
      messageRequired: 'El mensaje es obligatorio'
    },
    submit: 'Enviar solicitud',
    sending: 'Enviando...',
    noteBefore: 'Al enviar se abrirá su cliente de correo con la dirección secretaria',
    noteAfter: 'memento-mori.mx. Envíe el mensaje para completar la solicitud.'
  },
  en: {
    title: 'I want to become a Freemason in Chihuahua — application',
    intro:
      'If you are searching for how to become a Freemason in Chihuahua or for Masonic lodges in Chihuahua, this page is your first step. Submit the form and the secretary of Respectable Symbolic Lodge Memento Mori No. 107 will review your message and follow up.',
    faqHeading: 'About the process in Chihuahua',
    faqAriaLabel: 'Frequently asked questions about becoming a Freemason in Chihuahua',
    faqItems: [
      {
        q: 'I want to become a Freemason in Chihuahua. Is this form the right first step?',
        a: 'Yes. It is the official first contact with the secretary of R∴L∴S∴ Memento Mori No. 107. It does not replace later interviews or requirements, but it starts the conversation.'
      },
      {
        q: 'Do all Masonic lodges in Chihuahua follow the same process?',
        a: 'Regular lodges in the state generally fall under the Grand Lodge Cosmos; each lodge may differ in detail. This application is specific to Memento Mori No. 107 in Chihuahua City.'
      }
    ],
    fields: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message or reason for your application'
    },
    placeholders: {
      name: 'Your name',
      email: 'e.g. name at domain.com',
      phone: 'Optional',
      message: 'Write your message here...'
    },
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      messageRequired: 'Message is required'
    },
    submit: 'Submit application',
    sending: 'Sending...',
    noteBefore: 'Submitting will open your email client with secretaria',
    noteAfter: 'memento-mori.mx. Send the message to complete your application.'
  }
} as const

const { locale } = useI18n()
const copy = computed(
  () => SER_MASON_COPY[locale.value as keyof typeof SER_MASON_COPY] ?? SER_MASON_COPY.es
)

const pageTitle = computed(() =>
  locale.value === 'en'
    ? 'Become a Freemason in Chihuahua — apply'
    : 'Quiero ser masón en Chihuahua — solicitud'
)

const pageOgTitle = computed(() =>
  locale.value === 'en'
    ? 'I want to be a Freemason in Chihuahua | Memento Mori No. 107 — application'
    : 'Quiero ser masón en Chihuahua | Memento Mori N.° 107 — solicitud de ingreso'
)

const pageDescription = computed(() =>
  locale.value === 'en'
    ? 'Official first step if you want to become a Freemason in Chihuahua: apply to Respectable Symbolic Lodge Memento Mori No. 107 (Grand Lodge Cosmos). For searches like Masonic lodges in Chihuahua or joining Freemasonry in Chihuahua City.'
    : 'Primer paso si quiere ser masón en Chihuahua: solicitud a la R∴L∴S∴ Memento Mori N.° 107 (Gran Logia Cosmos). Para búsquedas como logias masónicas en Chihuahua o logias masoneras en la capital.'
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

const serMasonGraphJsonLd = computed(() => {
  const copyVal = SER_MASON_COPY[locale.value as keyof typeof SER_MASON_COPY] ?? SER_MASON_COPY.es
  const orgDescription =
    locale.value === 'en'
      ? 'Symbolic Masonic lodge in Chihuahua City under the Grand Lodge Cosmos; membership applications for those who want to become Freemasons in Chihuahua.'
      : 'Logia masónica simbólica en Chihuahua entre las logias del estado bajo la Gran Logia Cosmos; solicitud de ingreso para quien quiere ser masón en Chihuahua.'
  const org = {
    '@type': 'Organization',
    name: 'Respetable Logia Simbólica Memento Mori N.° 107',
    alternateName: ['Memento Mori No. 107', 'R∴L∴S∴ Memento Mori 107'],
    url: 'https://memento-mori.mx',
    description: orgDescription,
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
  }
  const faq = {
    '@type': 'FAQPage',
    mainEntity: copyVal.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [org, faq]
  }
})

useHead({
  script: computed(() => [
    {
      key: 'jsonld-ser-mason-graph',
      type: 'application/ld+json',
      children: JSON.stringify(serMasonGraphJsonLd.value)
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

function validate(): boolean {
  errors.nombre = ''
  errors.email = ''
  errors.mensaje = ''

  const c = copy.value
  let valid = true

  if (!form.nombre?.trim()) {
    errors.nombre = c.validation.nameRequired
    valid = false
  }

  if (!form.email?.trim()) {
    errors.email = c.validation.emailRequired
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = c.validation.emailInvalid
    valid = false
  }

  if (!form.mensaje?.trim()) {
    errors.mensaje = c.validation.messageRequired
    valid = false
  }

  return valid
}

function buildMailtoBody(): string {
  const lines = [
    `Nombre: ${form.nombre.trim()}`,
    `Email: ${form.email.trim()}`,
    form.telefono?.trim() ? `Teléfono: ${form.telefono.trim()}` : null,
    '',
    'Mensaje:',
    form.mensaje.trim()
  ].filter(Boolean)
  return lines.join('\n')
}

function handleSubmit() {
  if (!validate()) return

  sending.value = true

  const subject = encodeURIComponent(`[Memento Mori] Solicitud de ingreso - ${form.nombre.trim()}`)
  const body = encodeURIComponent(buildMailtoBody())
  const mailto = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`

  window.location.href = mailto

  setTimeout(() => {
    sending.value = false
  }, 500)
}

onMounted(() => {
  useGsap.to(serMason.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 0.6,
    ease: 'easeInOut'
  })
})
</script>

<style lang="scss" scoped>
.page-ser-mason {
  opacity: 0;
  visibility: hidden;
  position: relative;
  z-index: 0;

  .vertical-align {
    padding: 12vh 5vw 14vh;
    max-width: 640px;
    margin: 0 auto;

    @media only screen and (max-width: 768px) {
      padding: 10vh 5vw 12vh;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    letter-spacing: 0.1em;
    color: #fff;

    @media only screen and (max-width: 768px) {
      font-size: 1.35rem;
    }
  }

  &__intro {
    text-align: center;
    color: #8e8e9e;
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.75rem;
  }

  &__faq {
    margin-bottom: 2rem;
    padding: 1.25rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__faq-heading {
    margin: 0 0 1rem;
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.06em;
    text-align: center;
    color: rgba(255, 255, 255, 0.85);
  }

  &__faq-list {
    margin: 0;
  }

  &__faq-q {
    margin: 0.85rem 0 0.35rem;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.75);
    &:first-of-type {
      margin-top: 0;
    }
  }

  &__faq-a {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.5;
    color: #8e8e9e;
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
}
</style>
