// https://nuxt.com/docs/api/configuration/nuxt-config
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const siteUrl = 'https://memento-mori.mx'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-28',
  nitro: {
    alias: {
      // Netlify's Node adapter still creates h3 v1 events. Pin server helpers
      // to h3@1.15 so they don't call Web Request APIs (headers.get, new URL(path)).
      h3: require.resolve('h3')
    }
  },
  devtools: { enabled: true },
  site: {
    url: siteUrl,
    name: 'Memento Mori N.° 107',
    description:
      'Respetable Logia Simbólica Memento Mori N.° 107 en la ciudad de Chihuahua, Chih. Jurisdiccionada a la Noble, Leal y Centenaria Gran Logia Cosmos. Fraternidad masónica, valores y solicitud de ingreso para quienes desean iniciar el camino en Chihuahua.',
    defaultLocale: 'es'
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
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
    baseUrl: siteUrl,
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en.json'
      },
      {
        code: 'es',
        language: 'es-MX',
        file: 'es.json'
      }
    ],
    defaultLocale: 'es',
    experimental: { strictSeo: true },
    compilation: { strictMessage: false },
    pages: {
      'contact/index': {
        es: '/contacto',
        en: '/contact'
      }
    }
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
