<!-- eslint-disable vue/no-reserved-component-names -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useSeoMeta({
  ogImage: 'https://memento-mori.mx/og.png',
  twitterTitle: 'Memento Mori No.107',
  twitterDescription:
    'Respetable Logia Simbolica Memento Mori N.° 107 jurisdiccionada a la Noble Leal y Centenaria Muy Respetable Gran Logia Cosmos del estado de Chihuahua',
  twitterImage: 'https://memento-mori.mx/og.png',
  twitterCard: 'summary_large_image'
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
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
