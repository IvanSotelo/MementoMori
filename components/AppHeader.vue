<template>
  <header ref="header" :class="routeClass">
    <nav class="nav" role="navigation">
      <div class="device-content">
        <div class="nav__menu">
          <p class="nav__menu--open" @click="menuStore.toggleMenu">Menu</p>
        </div>
        <div class="nav__pagination" itemprop="breadcrumb">
          <nuxt-link :to="localePath('/')">{{ $t('navigation.home') }}</nuxt-link>
          <p class="nav__pagination--crumb">&nbsp;•&nbsp;{{ $t(routeName) }}</p>
        </div>
        <div class="nav__options">
          <div class="nav__options_sound">
            <p @click="togglePlayAudio">
              {{ $t('navigation.sound') }} • {{ playAudio ? 'ON' : 'OFF' }}
            </p>
          </div>
          <div class="nav__options_language">
            <nuxt-link :to="switchLocalePath('es')">ES</nuxt-link>
            <nuxt-link :to="switchLocalePath('en')">EN</nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/audio'
import { useMenuStore } from '@/stores/menu'

const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const { currentRoute } = useRouter()
const routeName = computed(() => `route.${String(currentRoute.value.name)}`)
const routeClass = computed(() => `is-${String(currentRoute.value.name)}`)

const menuStore = useMenuStore()
const audioStore = useAudioStore()

const header = ref<HTMLElement | null>(null)

const playAudio = computed(() => audioStore.playAudio)

const togglePlayAudio = () => {
  audioStore.togglePlayAudio()
}

onMounted(() => {
  useGsap.to(header.value?.querySelector('.nav'), 2, {
    autoAlpha: 1,
    delay: 2
  })
  audioStore.initializeSound(
    'https://res.cloudinary.com/controlla/video/upload/v1662314937/perseverancia/McCanick_320kbps_qtukua.mp3'
  )
})
</script>

<style lang="scss" scoped>
.is-loaded {
  nav {
    opacity: 1;
  }
}
.is-home,
.is-loading {
  .nav__pagination {
    opacity: 0;
  }
}
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
}
.nav {
  padding: 2vw 0;
  position: relative;
  z-index: 2;
  opacity: 0;
  transition: opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media only screen and (max-width: 768px) {
    padding: 6vw 0;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .device-content {
    display: block;
    .nav__menu,
    .nav__options {
      position: relative;
      z-index: 1;
    }
    .nav__menu--open {
      cursor: pointer;
      @media only screen and (max-width: 768px) {
        padding: 3vw;
        position: absolute;
        left: -2.6vw;
        top: -6.4vw;
        &:active {
          background: rgba(0, 0, 0, 0.37);
        }
      }
    }
    .nav__options {
      float: right;
      .nav__options_effect {
        transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
        visibility: hidden;
        &:not(.is-home) {
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        @media only screen and (max-width: 768px) {
          display: none !important;
        }
      }
      .nav__options_sound {
        padding-left: 2vw;
        p {
          cursor: pointer;
          font-style: italic;
        }
        @media only screen and (max-width: 768px) {
          display: none !important;
        }
      }
      .nav__options_language {
        padding-left: 1vw;
        a {
          cursor: pointer;
          padding-left: 1vw;
          @media only screen and (max-width: 768px) {
            padding-left: 7vw;
          }
        }
        .router-link-exact-active {
          color: #978268;
          pointer-events: none;
        }
      }
    }
    .nav__pagination {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      text-align: center;
      z-index: 0;
      transition: opacity 2s cubic-bezier(0.19, 1, 0.22, 1);
      a {
        transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
        &:nth-of-type(3) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 40vw;
          vertical-align: bottom;
        }
      }
      @media only screen and (max-width: 768px) {
        display: none !important;
      }
    }
    @media only screen and (max-width: 768px) {
      width: 85%;
    }
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      width: 95%;
    }
  }
  a,
  div,
  p {
    display: inline-block;
    text-transform: uppercase;
  }
  a,
  p {
    transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
    &:hover {
      color: #a1907f;
    }
  }
}
</style>
