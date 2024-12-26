import { defineNuxtPlugin } from '#app'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import type { InstanceOptions } from 'locomotive-scroll'

export default defineNuxtPlugin((nuxtApp) => {
  let scroll: LocomotiveScroll | null = null
  nuxtApp.provide('locomotiveScroll', (el: HTMLElement, options: InstanceOptions) => {
    scroll = new LocomotiveScroll({
      el: el,
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
  })

  nuxtApp.provide('onScroll', (callback: (event: LocomotiveScroll.OnScrollEvent) => void) => {
    if (scroll) {
      scroll.on('scroll', callback)
    }
  })
})

declare module '#app' {
  interface NuxtApp {
    $locomotiveScroll(el: HTMLElement | undefined, options?: InstanceOptions): LocomotiveScroll
    $onScroll(callback: (event: LocomotiveScroll.OnScrollEvent) => void): void
  }
}
