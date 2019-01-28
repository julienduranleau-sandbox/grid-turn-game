import World from './World'
import Renderer from './Renderer'
import UnitManager from './UnitManager'
import MouseHandler from './MouseHandler'
import KeyboardHandler from './KeyboardHandler'
import Tile from './Tile'

export default class Game {

  world: World
  renderer: Renderer
  unitManager: UnitManager
  mouse: MouseHandler
  keyboard: KeyboardHandler
  selectedTile: Tile|null
  activeAction: string|null

  constructor() {
    this.world = new World(40, 30, 15)
    this.renderer = new Renderer(40, 30, 15, document.body)
    this.unitManager = new UnitManager(this.world)
    this.mouse = new MouseHandler(this.renderer.canvas)
    this.keyboard = new KeyboardHandler(window)
    this.selectedTile = null
    this.activeAction = null
    this.tick()

    this.mouse.on('down', this.mouseSelectHandler.bind(this))
    this.keyboard.on('down', this.changeActiveAction.bind(this))
  }

  tick() {
    this.renderer.render(this.world, this.unitManager.units, this.mouse.pos, this.selectedTile, this.activeAction) 
    window.requestAnimationFrame(this.tick.bind(this))
  }

  mouseSelectHandler(e:MouseEvent) {
    const tile = this.world.getTileContainingPixel({
      x: e.offsetX,
      y: e.offsetY,
    })

    if (tile.isWall === false) {
      this.selectedTile = tile
    }
  }


  changeActiveAction(e:KeyboardEvent) {
    switch (e.key) {
      case 'q':
      case 'w':
      case 'e':
      case 'r':
        this.activeAction = e.key
        break
      case ' ':
        this.activeAction = null
        break
    }
  }
}
