// plugins/SplitText.js
export default defineNuxtPlugin((nuxtApp) => {
  class SplitText {
    constructor(element, options = {}) {
      this.element = element
      this.options = options
      this.words = []
      this.chars = []
      this.options = {
        words: options.words || 1,
        chars: options.chars || 1,
        spacing: options.spacing || 5
      }
      this.splitText()
    }

    splitText() {
      if (!this.element.dataset.splitText) {
        const textNodes = this.searchTextNodes(this.element)
        const splitText = this.splitTextNodes(textNodes)
        this.words = splitText.words
        this.chars = splitText.chars
        this.element.dataset.splitText = 'true'
      }
    }

    searchTextNodes(element) {
      let foundTextNodes = []
      if (element == null || element == undefined) return foundTextNodes
      for (let i = 0; i <= element.childNodes.length - 1; i++) {
        let node = element.childNodes[i]
        if (node.nodeName === '#text') {
          foundTextNodes.push(node)
        } else {
          foundTextNodes = foundTextNodes.concat(this.searchTextNodes(node))
        }
      }
      return foundTextNodes
    }

    createElement(text, relatedNode, padding) {
      const node = document.createElement('div')
      const nodeText = document.createTextNode(text)
      node.nodeText = nodeText
      node.appendChild(nodeText)
      node.style.position = 'relative'
      node.style.display = 'inline-block'
      if (padding) node.style.paddingRight = `${this.options.spacing}px`
      relatedNode.parentNode.insertBefore(node, relatedNode)
      return node
    }

    splitCharacters(textNode) {
      const characters = textNode.nodeValue.toString()
      let chars = []
      if (characters.trim() !== '') {
        for (let c = 0; c <= characters.length - 1; c++) {
          const character = characters.substr(c, 1)
          const char = this.createElement(character, textNode, false)
          if (character.trim() !== '') chars.push(char)
        }
        textNode.parentNode.removeChild(textNode)
      }
      return chars
    }

    splitWords(textNode) {
      const textWords = textNode.nodeValue.toString().split(' ')
      let words = []
      for (let w = 0; w <= textWords.length - 1; w++) {
        const textWord = textWords[w]
        const word = this.createElement(textWord, textNode, true)
        if (textWord.trim() !== '') words.push(word)
      }
      textNode.parentNode.removeChild(textNode)
      return words
    }

    splitTextNodes(textNodes) {
      const splitText = { words: [], chars: [] }
      for (let i = 0; i <= textNodes.length - 1; i++) {
        const textNode = textNodes[i]
        if (this.options.words === 0) {
          splitText.chars = splitText.chars.concat(this.splitCharacters(textNode))
        } else {
          const words = this.splitWords(textNode)
          if (this.options.chars === 1) {
            for (let w = 0; w <= words.length - 1; w++) {
              const word = words[w]
              const chars = this.splitCharacters(word.nodeText)
              splitText.chars = splitText.chars.concat(chars)
              word.chars = chars
            }
          }
          splitText.words = splitText.words.concat(words)
        }
      }
      return splitText
    }
  }

  // Agrega la clase al contexto global de Nuxt para su uso en componentes
  nuxtApp.provide('splitText', SplitText)
})
