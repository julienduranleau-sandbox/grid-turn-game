export default class KeyboardHandler {

  events: { [e: string]: Function[] }
  downKeys: { [e: string]: boolean }

  constructor(container: EventTarget) {
    container.addEventListener('keydown', (e: Event) => this.downHandler(e as KeyboardEvent), false)
    container.addEventListener('keyup', (e: Event) => this.upHandler(e as KeyboardEvent), false)

    this.events = {
      down: [],
      up: [],
    }

    this.downKeys = {}
  }

  downHandler(e: KeyboardEvent) {
    this.callEvent('down', e)
    this.downKeys[e.key] = true
  }

  upHandler(e: KeyboardEvent) {
    this.callEvent('up', e)
    this.downKeys[e.key] = false
  }

  on(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      throw `Invalid event name ${eventName}`
    }

    this.events[eventName].push(callback)
  }

  callEvent(eventName: string, data: Event) {
    for (let i = 0, len = this.events[eventName].length; i < len; i++) {
      this.events[eventName][i](data)
    }
  }

  isDown(key: string) {
    return this.downKeys[key] === undefined ? false : this.downKeys[key]
  }

}
