import { defineProperty, slotChildren } from './component-helpers.js'

export class VanillaComponent {
  constructor(dom, template, rootClass) {
    this.dom = dom
    this.dom.classList.add(rootClass)
    this.childrenToSlot = Array.prototype.slice.call(this.dom.children)
    this._render = template.bind(this)(dom, this) 
    slotChildren(this.childrenToSlot, this.dom)
  }
  
  render(state) {
    if(this._render) this._render(state)  
  }
  defineProperty(property, options) {
    return defineProperty(this, this.dom, property, options) 
  }
}
