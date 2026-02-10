<template lang="pug">
main(ref="serMason")
  section#page-ser-mason.page.page-ser-mason
    .vertical-align
      .vertical-align-item
        h2.page-ser-mason__title {{ copy.title }}
        p.page-ser-mason__intro {{ copy.intro }}

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
    title: 'Solicitud de ingreso',
    intro:
      'Complete el formulario para enviar su solicitud a la Respetable Logia Simbólica Memento Mori N.° 107. La secretaría revisará su información y se pondrá en contacto.',
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
    title: 'Membership application',
    intro:
      'Fill out the form to submit your application to the Respetable Logia Simbólica Memento Mori N.° 107. The secretary will review your information and get in touch.',
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
    margin-bottom: 2.5rem;
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
