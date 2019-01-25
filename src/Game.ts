import World from './World'
import Renderer from './Renderer'
import UnitManager from './UnitManager'
import MouseHandler from './MouseHandler'
import KeyboardHandler from './KeyboardHandler'

export default class Game {

  world: World
  renderer: Renderer
  unitManager: UnitManager
  mouse: MouseHandler
  keyboard: KeyboardHandler

  constructor() {
    this.world = new World(40, 30)
    this.renderer = new Renderer(40, 30, 15, document.body)
    this.unitManager = new UnitManager()
    this.mouse = new MouseHandler(window)
    this.keyboard = new KeyboardHandler(window)
    this.tick()
  }

  tick() {
    this.renderer.render(this.world, this.unitManager.units) 
  }
}
