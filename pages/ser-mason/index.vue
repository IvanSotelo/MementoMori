<template lang="pug">
main(ref="serMason")
  section#page-ser-mason.page.page-ser-mason
    .vertical-align
      .vertical-align-item
        h2.page-ser-mason__title {{ $t('ser-mason.title') }}
        p.page-ser-mason__intro {{ $t('ser-mason.intro') }}

        form.page-ser-mason__form(
          @submit.prevent="handleSubmit"
          novalidate
        )
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

        p.page-ser-mason__note {{ $t('ser-mason.note') }}
</template>

<script setup lang="ts">
const EMAIL_TO = 'secretaria@memento-mori.mx'

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

  const { t } = useI18n()
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
