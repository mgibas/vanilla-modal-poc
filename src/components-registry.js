export default {
  define: (tagName, constructor) => {
    window.__vanillaRegistry = window.__vanillaRegistry || {}
    if (__vanillaRegistry[tagName]) {
      console.warn(`Component '${tagName}' is already defined - skipping.`)
      return
    }

    __vanillaRegistry[tagName] = {
      observer: new window.MutationObserver((mutations) => {
        let newComponents = mutations
          .filter((m) => m.type === 'childList')
          .filter((m) => m.addedNodes.length > 0)
          .reduce((addedNodes, m) => addedNodes.concat.apply([], m.addedNodes), [])
          .filter((n) => n.querySelectorAll)
          .reduce((components, node) => components.concat.apply([], node.querySelectorAll(tagName)), [])

        for (let i = 0; i < newComponents.length; i++) {
          new constructor(newComponents[i])
        }
      })
    }
    __vanillaRegistry[tagName].observer.observe(document, { childList: true, subtree: true })
    let elements = document.querySelectorAll(tagName)

    for (let i = 0; i < elements.length; i++) {
      new constructor(elements[i])
    }
  }
}
