// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  site: {
    url: 'https://memento-mori.mx',
    name: 'Memento Mori No.107',
    description:
      'Respetable Logia Simbólica Memento Mori N.° 107 en la ciudad de Chihuahua, Chih. Jurisdiccionada a la Noble, Leal y Centenaria Gran Logia Cosmos. Fraternidad masónica, valores y solicitud de ingreso para quienes desean iniciar el camino en Chihuahua.',
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
