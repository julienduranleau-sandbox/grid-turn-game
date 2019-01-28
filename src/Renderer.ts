import World from './World'
import Unit from './Unit'
import Tile from './Tile'
import Point from './Point'

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

  render(world: World, units: Unit[], cursorPos: Point, selectedTile: Tile|null, activeAction: string|null) {
    this.drawBackground()
    this.drawUnits(units)
    
    if (selectedTile) { this.drawSelectedTile(selectedTile) }

    if (activeAction) this.drawActiveAction(activeAction, cursorPos, selectedTile)

    this.drawWalls(world.tiles)
    this.drawCursor(cursorPos)
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
      const x = (unit.tile.x + 0.5) * this.tileSize
      const y = (unit.tile.y + 0.5) * this.tileSize
      const radius = this.tileSize * 0.5 * 0.7
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, 2*Math.PI)
      this.ctx.fill()
    }
  }

  drawCursor(cursorPos: Point) {
    const x = cursorPos.x - (cursorPos.x % this.tileSize)
    const y = cursorPos.y - (cursorPos.y % this.tileSize)
    this.ctx.fillStyle = "#FFFFFF55"
    this.ctx.fillRect(x, y, this.tileSize, this.tileSize)
  }

  drawSelectedTile(tile: Tile) {
    const x = tile.x * this.tileSize 
    const y = tile.y * this.tileSize 
    this.ctx.fillStyle = "#00FF0055"
    this.ctx.fillRect(x, y, this.tileSize, this.tileSize)
  }

  drawUnitMoveRange(unit: Unit) {
    const maxRange = 5 + 1

    this.ctx.fillStyle = "#00CCFF55"

    for (let yOffset = -maxRange; yOffset <= maxRange; yOffset++) {
      for (let xOffset = -maxRange; xOffset <= maxRange; xOffset++) {
        const x = unit.tile.x + xOffset
        const y = unit.tile.y + yOffset

        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
          if (maxRange * maxRange > (x - unit.tile.x) * (x - unit.tile.x) + (y - unit.tile.y) * (y - unit.tile.y)) {
            this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize)
          }
        }
      }
    }
  }

  drawRangeAround(unit: Unit, range: number = 2) {
    this.ctx.fillStyle = "#FF000055"

    const rects = [{
      x: unit.tile.x - range,
      y: unit.tile.y - range,
      w: 1 + range * 2,
      h: range,
    }, {
      x: unit.tile.x - range,
      y: unit.tile.y + 1,
      w: 1 + range * 2,
      h: range,
    }, {
      x: unit.tile.x - range,
      y: unit.tile.y,
      w: range,
      h: 1,
    }, {
      x: unit.tile.x + 1,
      y: unit.tile.y,
      w: range,
      h: 1,
    }]
    for (const rect of rects) {
      this.ctx.fillRect(rect.x * this.tileSize, rect.y * this.tileSize, rect.w * this.tileSize, rect.h * this.tileSize)
    }
  }

  drawActiveAction(action: string, cursorPos: Point, selectedTile: Tile|null) {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "#000000FF"
    this.ctx.fillText(action, 10, 30); 

    if (selectedTile && selectedTile.unit) {
      if (action === 'q') {
        this.drawUnitMoveRange(selectedTile.unit)
      } else if (action === 'w') {
        this.drawRangeAround(selectedTile.unit)
      }
    }
  }
}
