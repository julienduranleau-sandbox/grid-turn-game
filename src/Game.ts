import Grid from './Grid'
import Renderer from './Renderer'
import UnitManager from './UnitManager'
import MouseHandler from './MouseHandler'
import KeyboardHandler from './KeyboardHandler'

export default class Game {

  grid: Grid
  renderer: Renderer
  unitManager: UnitManager
  mouse: MouseHandler
  keyboard: KeyboardHandler

  constructor() {
    this.grid = new Grid(50, 50)
    this.renderer = new Renderer()
    this.unitManager = new UnitManager()
    this.mouse = new MouseHandler()
    this.keyboard = new KeyboardHandler()
  }

  tick() {
    this.renderer.render(this.grid) 
  }
}
