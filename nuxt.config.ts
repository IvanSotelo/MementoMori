// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  site: {
    url: 'https://memento-mori.com',
    name: 'Memento Mori N°12',
    description:
      'Respetable Logia Simbolica Memento Mori N°12 jurisdiccionada a la Noble Leal y Centenaria Muy Respetable Gran Logia Cosmos del estado de Chihuahua',
    defaultLocale: 'es'
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@hypernym/nuxt-gsap',
    'nuxt-gtag'
  ],
  app: {
    pageTransition: {
      name: 'page'
    }
  },
  plugins: ['~/plugins/locomotiveScroll.client'],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'es',
        file: 'es.json'
      }
    ],
    lazy: true,
    defaultLocale: 'es'
  },
  gtag: {
    id: 'G-YKQFLLP785'
  },
  gsap: {
    composables: true
  },
  css: ['~/assets/css/main.scss', '~/assets/css/_fonts.scss'],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/controlla/image/upload/'
    }
  }
})
