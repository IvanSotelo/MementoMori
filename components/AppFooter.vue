<template>
  <footer v-if="currentRoute.name !== 'gallery-slug___es'" ref="footer" :class="routeClass">
    <div class="footer" role="contentinfo">
      <div class="vertical-align">
        <div class="vertical-align-item">
          <div class="device-content">
            <nuxt-img src="/Fundacion.svg" alt="Fundación 2025" />
            <nuxt-link class="footer__archive" :to="localePath('history')">
              {{ $t('footer.history') }}
            </nuxt-link>
            <div class="footer-nav">
              <nuxt-link :to="localePath('message')">
                {{ $t('footer.message') }}
              </nuxt-link>
              <nuxt-link :to="localePath('credits')">
                {{ $t('footer.credits') }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const { currentRoute } = useRouter()
const footer = ref<HTMLElement | null>(null)
const routeClass = computed(() => `is-${String(currentRoute.value.name)}`)

const animateIn = () => {
  if (currentRoute.value.name !== 'gallery-slug___es') {
    useGsap.to(footer.value?.querySelector('.footer'), 2, {
      autoAlpha: 1,
      delay: 2
    })
  }
}

onMounted(() => {
  animateIn()
})

onUpdated(() => animateIn())
</script>

<style lang="scss" scoped>
.is-history___es,
.is-history___en,
.is-gallery___es,
.is-gallery___en {
  a:not(.active),
  p:not(.active) {
    color: #000;
  }
  a {
    &:hover {
      color: #978268;
    }
  }
  img {
    opacity: 0;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
}
.is-contact {
  footer {
    a[href='/credits'] {
      color: #a1907f;
    }
  }
}
.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: block;
  text-align: center;
  margin-bottom: 1rem;
  z-index: 3;
  opacity: 0;
  transition: opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  img {
    width: 6.5vw;
    position: absolute;
    left: 0;
    transform: translateY(-50%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -ms-perspective: 1000;
    perspective: 1000;
    @media only screen and (max-width: 768px) {
      width: 12vw;
    }
  }
  .footer-nav,
  a,
  p {
    display: inline-block;
  }
  p {
    color: #686868;
    position: absolute;
    left: 0;
    right: 0;
    pointer-events: none;
    a {
      color: #3a3a3a;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .footer__archive {
    transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
    text-transform: uppercase;
    position: absolute;
    margin: 0 auto;
    transform: translateX(-70%);
    display: inline-block;
    transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
    &:hover {
      color: #978268;
    }
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
  .footer-nav {
    float: right;
    a {
      text-transform: uppercase;
      transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
      &:not(:last-of-type) {
        padding-right: 3vw;
      }
    }
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
  .router-link-active {
    color: #a1907f;
  }
}
</style>
