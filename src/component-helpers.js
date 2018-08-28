export function defineProperty (object, dom, name, options) {
  Object.defineProperty(object, name, {
    set (val) {
      if(val === object[`__${name}`]) return
      object[`__${name}`] = val
      dom[name] = val
      if (options.reflectToAttribute && val !== dom.getAttribute(name)) {
        dom.setAttribute(name, val)
      }
      if (options.onChange) { options.onChange(val) }
    },
    get () { return object[`__${name}`] }
  })
  Object.defineProperty(dom, name, {
    set (val) {
      if (object[name] === val) return
      object[name] = val
    },
    get () { return object[`__${name}`] }
  })
  new window.MutationObserver(mutations => {
    console.log('Property mutation')
    mutations.forEach(mutation => {
      if (mutation.attributeName === name) {
        let attrValue = mutation.target.getAttribute(name)
        console.log(object[name], attrValue)
        if (object[name] !== attrValue) {
          object[name] = mutation.target.getAttribute(name)
        }
      }
    })
  }).observe(dom, { attributes: true })

  if (options.value !== undefined) object[name] = options.value
  object[name] = dom.getAttribute(name) || object[name]
}

export function slotChildren (children, dom) {
  let slots = dom.querySelectorAll('slot')
  for (let i = 0; i < slots.length; i++) {
    for (let j = 0; j < children.length; j++) {
      if(slots[i].name === children[j].slot || (!slots[i].name && !children[j].slot))
        slots[i].appendChild(children[j])
    }
  }
}
export function exposeFunction (object, dom, funcName) {
  dom[funcName] = object[funcName]
}
