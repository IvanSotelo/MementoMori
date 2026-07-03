import { defineNuxtPlugin } from '#app'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import type { InstanceOptions } from 'locomotive-scroll'

export default defineNuxtPlugin(() => {
  let scroll: LocomotiveScroll | null = null

  const locomotiveScroll = (
    el: HTMLElement | undefined,
    options?: InstanceOptions
  ): LocomotiveScroll | null => {
    if (!el) {
      return null
    }

    scroll = new LocomotiveScroll({
      el,
      direction: 'vertical',
      getDirection: true,
      smooth: true,
      smartphone: {
        smooth: true,
        direction: 'vertical'
      },
      tablet: {
        breakpoint: 0,
        smooth: true,
        direction: 'vertical'
      },
      ...options
    })

    scroll.on('scroll', (instance: LocomotiveScroll.OnScrollEvent) => {
      if (instance.scroll.y > 30) {
        document.documentElement.classList.add('is-scrolled')
      } else {
        document.documentElement.classList.remove('is-scrolled')
      }
    })

    return scroll
  }

  const onScroll = (callback: (event: LocomotiveScroll.OnScrollEvent) => void): void => {
    if (scroll) {
      scroll.on('scroll', callback)
    }
  }

  return {
    provide: {
      locomotiveScroll,
      onScroll
    }
  }
})
