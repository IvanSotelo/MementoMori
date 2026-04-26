<!-- eslint-disable vue/no-reserved-component-names -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const siteTitleFallback =
  'Memento Mori N.° 107 | Logia masónica en Chihuahua, México — Gran Logia Cosmos'

const { locale } = useI18n()
const ogLocale = computed(() => (locale.value === 'en' ? 'en_US' : 'es_MX'))

useSeoMeta({
  ogSiteName: 'Memento Mori N.° 107',
  ogImage: 'https://memento-mori.mx/og.png',
  ogLocale: ogLocale,
  twitterTitle: 'Memento Mori N.° 107 | Chihuahua',
  twitterDescription:
    'Respetable Logia Simbólica Memento Mori N.° 107 en Chihuahua. Gran Logia Cosmos. Información y solicitud de ingreso para nuevos miembros en la ciudad de Chihuahua.',
  twitterImage: 'https://memento-mori.mx/og.png',
  twitterCard: 'summary_large_image'
})

useHead({
  titleTemplate: (titleChunk?: string) =>
    titleChunk ? `${titleChunk} | Memento Mori N.° 107 · Chihuahua, México` : siteTitleFallback,
  htmlAttrs: {
    lang: locale
  },
  link: [
    { rel: 'preconnect', href: 'https://res.cloudinary.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition-timing-function: ease-in-out;
  transition: all 0.7s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
