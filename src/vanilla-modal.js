import registry from './components-registry.js'
import { VanillaComponent } from './vanilla-component.js'
import template from './vanilla-modal.html'
import './vanilla-modal.scss'

class VanillaModal extends VanillaComponent{
  constructor(dom) {
    super(dom, template, 'vanilla-modal')

    this.defineProperty('noclose', {reflectToAttribute: true, onChange: this.render(this)})
    this.defineProperty('nofooter', {reflectToAttribute: true, onChange: this.render(this)})
    this.defineProperty('title', {reflectToAttribute: true, onChange: this.render(this)})

    dom.open = this.open.bind(this)
    dom.close = this.close.bind(this)
  }
  
  open() {
    this.dom.classList.add('opened')
  }
  close() {
    this.dom.classList.remove('opened')
  }
}

registry.define('vanilla-modal', VanillaModal)
