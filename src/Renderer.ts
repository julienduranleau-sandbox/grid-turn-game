import World from './World'
import Unit from './Unit'
import Tile from './Tile'

export default class Renderer {

  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  rows: number
  cols: number
  tileSize: number
  width: number
  height: number

  constructor(cols: number, rows: number, tileSize: number, container: Element) {
    this.rows = rows
    this.cols = cols
    this.tileSize = tileSize
    this.width = this.cols * this.tileSize
    this.height = this.rows * this.tileSize
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.canvas.width = this.width
    this.canvas.height = this.height
    container.append(this.canvas)
  }

  render(world: World, units: Unit[]) {
    this.drawBackground()
    this.drawWalls(world.tiles)
    this.drawUnits(units)
  }

  drawBackground() {
    this.ctx.fillStyle = "#CCCCCC"
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawWalls(tiles: Tile[]) {
    const nTiles = tiles.length

    this.ctx.fillStyle = "#444444"

    for (let i = 0; i < nTiles; i++) {
      const tile = tiles[i]
      if (tile.isWall) {
        this.ctx.fillRect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize)
      }
    }
  }

  drawUnits(units: Unit[]) {
    const nUnits = units.length

    this.ctx.fillStyle = "#FF4444"

    for (let i = 0; i < nUnits; i++) {
      const unit = units[i]
      const x = (unit.x + 0.5) * this.tileSize
      const y = (unit.y + 0.5) * this.tileSize
      const radius = this.tileSize * 0.5 * 0.7
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, 2*Math.PI)
      this.ctx.fill()
    }
  }
}
