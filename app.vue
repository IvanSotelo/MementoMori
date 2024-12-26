<!-- eslint-disable vue/no-reserved-component-names -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useSeoMeta({
  ogImage:
    'https://res.cloudinary.com/controlla/image/upload/v1674860740/perseverancia/Perseverancia_share.png',
  twitterTitle: 'Memento Mori N° 12',
  twitterDescription:
    'Respetable Logia Simbolica Memento Mori N°12 jurisdiccionada a la Noble Leal y Centenaria Muy Respetable Gran Logia Cosmos del estado de Chihuahua',
  twitterImage:
    'https://res.cloudinary.com/controlla/image/upload/v1674860740/perseverancia/Perseverancia_share.png',
  twitterCard: 'summary'
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
