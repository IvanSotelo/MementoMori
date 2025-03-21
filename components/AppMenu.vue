<template>
  <aside ref="menuRef" class="site-menu" role="list" :class="{ active: menuStore.isMenuOpen }">
    <p class="site-menu--close _close" @click="menuStore.toggleMenu">
      {{ $t('site-menu.close') }}
    </p>
    <div class="_col site-menu__item" role="listitem" @click="menuStore.toggleMenu">
      <nuxt-link :to="localePath('history')">
        <p class="site-menu__item--title">{{ $t('site-menu.item-history') }}</p>
        <div class="site-menu__item--bg" style="background-image: url('/1.jpeg')" />
      </nuxt-link>
    </div>
    <div class="_col site-menu__item" role="listitem" @click="menuStore.toggleMenu">
      <nuxt-link :to="localePath('message')">
        <p class="site-menu__item--title">{{ $t('site-menu.item-message') }}</p>
        <div class="site-menu__item--bg" style="background-image: url('/2.jpeg')" />
      </nuxt-link>
    </div>
    <div class="_col site-menu__item" role="listitem" @click="menuStore.toggleMenu">
      <nuxt-link :to="localePath('moral-code')">
        <p class="site-menu__item--title">
          {{ $t('site-menu.item-moral-code') }}
        </p>
        <div class="site-menu__item--bg" style="background-image: url('/3.jpeg')" />
      </nuxt-link>
    </div>
    <div class="_col site-menu__item" role="listitem" @click="menuStore.toggleMenu">
      <nuxt-link :to="localePath('/')">
        <p class="site-menu__item--title">
          {{ $t('site-menu.item-becoming-freemason') }}
        </p>
        <div class="site-menu__item--bg" style="background-image: url('/4.jpeg')" />
      </nuxt-link>
    </div>
    <div class="_col site-menu__item" role="listitem" @click="menuStore.toggleMenu">
      <nuxt-link :to="localePath('gallery')">
        <p class="site-menu__item--title">{{ $t('site-menu.item-galery') }}</p>
        <div class="site-menu__item--bg" style="background-image: url('/5.jpeg')" />
      </nuxt-link>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const localePath = useLocalePath()
const menuStore = useMenuStore()
const menuRef = ref<HTMLElement | null>(null)
const menuItems = ref<NodeListOf<HTMLElement> | null>(null)

const animateMenuIn = () => {
  menuItems.value?.forEach((item) => {
    item.style.pointerEvents = 'auto'
  })
  useGsap.to(menuRef.value, {
    duration: 0.8,
    x: '0%',
    force3D: false,
    ease: 'easeInOut'
  })
  const main = menuRef.value?.parentElement?.querySelector('main')
  useGsap.to(main, {
    duration: 0.8,
    x: '25%',
    force3D: false,
    ease: 'easeInOut'
  })
}

const animateMenuOut = () => {
  menuItems.value?.forEach((item) => {
    item.style.pointerEvents = 'none'
  })
  const main = menuRef.value?.parentElement?.querySelector('main')
  useGsap.to(main, {
    duration: 0.8,
    x: '0%',
    ease: 'easeInOut',
    force3D: false
  })
  useGsap.to(menuRef.value, {
    duration: 0.8,
    x: '-100%',
    force3D: false,
    ease: 'easeInOut'
  })
}

watch(
  () => menuStore.isMenuOpen,
  (newValue) => {
    if (newValue) {
      animateMenuIn()
    } else {
      animateMenuOut()
    }
  }
)

onMounted(() => {
  menuItems.value = menuRef.value?.querySelectorAll('.site-menu__item') || null
})
</script>

<style lang="scss" scoped>
.site-menu {
  background: #282830;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 100;
  overflow: hidden;
  will-change: transform;
  transform: translate3d(-100%, 0, 0);
  @media only screen and (max-width: 768px) {
    background: #24242b;
  }
  ._close {
    text-transform: uppercase;
    left: 2.5%;
    top: 3.6%;
    position: absolute;
    z-index: 3;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -ms-perspective: 1000;
    cursor: pointer;
    perspective: 1000;
    transition: color 1s cubic-bezier(0.19, 1, 0.22, 1);
    @media only screen and (max-width: 768px) {
      left: 3.9%;
      padding: 4vw;
      top: 1.3%;
    }
    &:hover {
      color: #978268;
      @media only screen and (max-width: 768px) {
        background: rgba(0, 0, 0, 0.37);
      }
    }
  }
  ._col {
    width: 20%;
    position: absolute;
    height: 100%;
    overflow: hidden;
    &:not(:last-of-type) {
      border-right: 1px solid rgba(255, 255, 255, 0.09);
      @media only screen and (max-width: 768px) {
        border-right: 0;
      }
    }
    &:hover {
      a {
        div {
          opacity: 0.4;
          transform: translate3d(-10%, 0, 0);
          @media only screen and (max-width: 768px) {
            opacity: 0;
          }
        }
      }
    }
    a {
      display: block;
      width: 100%;
      text-align: center;
      height: 100%;
      p {
        position: relative;
        top: 50%;
        z-index: 2;
        opacity: 1;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -ms-perspective: 1000;
        perspective: 1000;
        text-transform: uppercase;
        @media only screen and (max-width: 768px) {
          left: 8vw;
          font-size: 4.5vw;
          letter-spacing: 0.7vw;
        }
      }
      div {
        width: 115%;
        height: 100%;
        background-size: cover;
        background-position: 50% 50%;
        z-index: 1;
        position: absolute;
        top: 0;
        opacity: 0;
        transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -ms-perspective: 1000;
        perspective: 1000;
        &:after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0.2;
        }
      }
      &:active {
        p {
          @media only screen and (max-width: 768px) {
            color: rgba(0, 0, 0, 0.37);
          }
        }
      }
      @media only screen and (max-width: 768px) {
        text-align: left;
      }
    }
    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4),
    &:nth-of-type(5),
    &:nth-of-type(6),
    &:nth-of-type(7) {
      @media only screen and (max-width: 768px) {
        left: 0 !important;
      }
    }
    &:nth-of-type(1) {
      @media only screen and (max-width: 768px) {
        top: 10%;
      }
    }
    &:nth-of-type(2) {
      left: 20%;
      @media only screen and (max-width: 768px) {
        top: 18%;
      }
    }
    &:nth-of-type(3) {
      left: 40%;
      @media only screen and (max-width: 768px) {
        top: 26%;
      }
    }
    &:nth-of-type(4) {
      left: 60%;
      @media only screen and (max-width: 768px) {
        top: 34%;
      }
    }
    &:nth-of-type(5) {
      left: 80%;
      @media only screen and (max-width: 768px) {
        top: 42%;
      }
    }
    &:nth-of-type(6) {
      @media only screen and (max-width: 768px) {
        top: 50%;
      }
    }
    &:nth-of-type(7) {
      @media only screen and (max-width: 768px) {
        top: 58%;
      }
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      height: 8%;
    }
  }
  nav {
    a,
    p {
      color: #fff;
    }
  }
}
</style>
