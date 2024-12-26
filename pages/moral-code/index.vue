<template lang="pug">
main(ref="moral")
  smooth-scroll
    section#page-moral-code.page.page-moral-code(data-scroll-section)
      .moral-code
        ul.js-moral-code
          li.js-moral-code-list(v-for="(n, i) in 18")
            p {{n}}
            p {{ $t("moral-code["+i+"]") }}
</template>

<script setup lang="ts">
const moral = ref<HTMLElement | null>(null)
const { $locomotiveScroll } = useNuxtApp()

onMounted(() => {
  const scroll = $locomotiveScroll(
    moral.value?.querySelector('[data-scroll-container]') || undefined
  )

  useGsap.to(moral.value?.querySelector('.page'), {
    autoAlpha: 1,
    duration: 1,
    delay: 1,
    ease: 'easeInOut'
  })
  useGsap.to(moral.value?.querySelectorAll('.js-moral-code-list'), 1, {
    y: 0,
    autoAlpha: 1,
    stagger: 0.1
  })

  onUnmounted(() => {
    scroll.destroy()
  })
})
</script>

<style lang="scss" scoped>
.page-moral-code {
  .moral-code {
    text-align: left;
    width: 60%;
    margin: 0 auto;
    left: 0;
    right: 0;
    ul {
      padding-top: 5.5rem;
      padding-bottom: 10%;
      li {
        transform: translateY(100%);
        opacity: 0;
        display: -ms-flexbox;
        display: flex;
        p {
          display: inline-block;
          letter-spacing: 0;
          &:first-of-type {
            font-size: 1rem;
            padding-right: 5vw;
            font-family: 'Playfair Display';
            font-style: italic;
          }
          &:last-of-type {
            font-size: 0.8rem;
            font-family: PTSerifPro-Book;
          }
        }
      }
      @media only screen and (max-width: 768px) {
        padding-bottom: 35%;
      }
    }
  }
}
</style>
