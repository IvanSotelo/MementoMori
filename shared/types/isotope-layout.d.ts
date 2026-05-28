declare module 'isotope-layout' {
  interface IsotopeOptions {
    itemSelector?: string
    percentPosition?: boolean
    layoutMode?: string
    hiddenStyle?: Record<string, unknown>
    visibleStyle?: Record<string, unknown>
    masonry?: Record<string, unknown>
  }

  export default class Isotope {
    constructor(element: HTMLElement | null, options?: IsotopeOptions)
    arrange(options?: { filter?: string }): void
    on(event: string, callback: () => void): void
  }
}
