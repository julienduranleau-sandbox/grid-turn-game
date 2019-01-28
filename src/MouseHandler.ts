import Point from './Point'

export default class MouseHandler {

  pos: Point
  events: { [e: string]: Function[] }

  constructor(container: EventTarget) {
    container.addEventListener('mousemove', (e: Event) => this.moveHandler(e as MouseEvent), false)
    container.addEventListener('mousedown', (e: Event) => this.downHandler(e as MouseEvent), false)
    container.addEventListener('mouseup', (e:Event) => this.upHandler(e as MouseEvent), false)

    this.events = {
      down: [],
      up: [],
      move: [],
    }

    this.pos = {
      x: 0,
      y: 0,
    }

    this.on('move', this.updatePos.bind(this))
  }

  moveHandler(e: MouseEvent) {
    this.callEvent('move', e)
  }

  downHandler(e: MouseEvent) {
    this.callEvent('down', e)
  }

  upHandler(e: MouseEvent) {
    this.callEvent('up', e)
  }

  on(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      throw `Invalid event name ${eventName}`
    }

    this.events[eventName].push(callback)
  }

  callEvent(eventName: string, data: MouseEvent) {
    for (let i = 0, len = this.events[eventName].length; i < len; i++) {
      this.events[eventName][i](data)
    }
  }

  updatePos(e: MouseEvent) {
    this.pos.x = e.offsetX
    this.pos.y = e.offsetY
  }

}
