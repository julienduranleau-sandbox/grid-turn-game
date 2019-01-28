import Tile from './Tile'
import Point from './Point'

export default class World {

  tiles: Tile[]
  nTiles: number
  tileSize: number
  cols: number
  rows: number

  constructor(cols: number, rows: number, tileSize: number) {
    this.cols = cols
    this.rows = rows
    this.tileSize = tileSize
    this.tiles = this.generateTiles(cols, rows)
    this.nTiles = this.tiles.length
    this.applyTileNeighbours()
    this.loadNewMap()
  }

  generateTiles(cols: number, rows: number): Tile[] {
    let tiles: Tile[] = []

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        tiles.push(new Tile(x, y))
      }
    }

    return tiles
  }

  applyTileNeighbours() {
    for (let i = 0; i < this.nTiles; i++) {
      const tile = this.tiles[i]

      const topIndex = i - this.cols
      const rightIndex = i + 1 
      const bottomIndex = i + this.cols
      const leftIndex = i - 1 

      const toprightIndex = topIndex + 1
      const bottomrightIndex = bottomIndex + 1
      const bottomleftIndex = bottomIndex - 1
      const topleftIndex = topIndex - 1

      if (topIndex >= 0 && topIndex < this.nTiles) {
        tile.neighbours.top = this.tiles[topIndex]
        tile.neighbours.all4.push(this.tiles[topIndex])
        tile.neighbours.all8.push(this.tiles[topIndex])
      }
      if (rightIndex >= 0 && rightIndex < this.nTiles) {
        tile.neighbours.right = this.tiles[rightIndex]
        tile.neighbours.all4.push(this.tiles[rightIndex])
        tile.neighbours.all8.push(this.tiles[rightIndex])
      }
      if (bottomIndex >= 0 && bottomIndex < this.nTiles) {
        tile.neighbours.bottom = this.tiles[bottomIndex]
        tile.neighbours.all4.push(this.tiles[bottomIndex])
        tile.neighbours.all8.push(this.tiles[bottomIndex])
      }
      if (leftIndex >= 0 && leftIndex < this.nTiles) {
        tile.neighbours.left = this.tiles[leftIndex]
        tile.neighbours.all4.push(this.tiles[leftIndex])
        tile.neighbours.all8.push(this.tiles[leftIndex])
      }

      if (toprightIndex >= 0 && toprightIndex < this.nTiles) {
        tile.neighbours.topright = this.tiles[toprightIndex]
        tile.neighbours.all8.push(this.tiles[toprightIndex])
      }
      if (bottomrightIndex >= 0 && bottomrightIndex < this.nTiles) {
        tile.neighbours.bottomright = this.tiles[bottomrightIndex]
        tile.neighbours.all8.push(this.tiles[bottomrightIndex])
      }
      if (bottomleftIndex >= 0 && bottomleftIndex < this.nTiles) {
        tile.neighbours.bottomleft = this.tiles[bottomleftIndex]
        tile.neighbours.all8.push(this.tiles[bottomleftIndex])
      }
      if (topleftIndex >= 0 && topleftIndex < this.nTiles) {
        tile.neighbours.topleft = this.tiles[topleftIndex]
        tile.neighbours.all8.push(this.tiles[topleftIndex])
      }
    }
  }

  loadNewMap() {
    for (let i = 0; i < this.tiles.length; i++) {
      const tile = this.tiles[i]

      tile.reset()

      let rndIsWall = Math.random()

      const hasNeighbourWall = tile.neighbours.all8.filter(otherTile => otherTile.isWall).length > 0
      if (hasNeighbourWall) {
        rndIsWall += 0.45
      }

      if (rndIsWall > 0.99) {
        tile.isWall = true
      }
    }
  }

  getTileContainingPixel(pos: Point): Tile {
    const x = Math.floor(pos.x / this.tileSize)
    const y = Math.floor(pos.y / this.tileSize)

    return this.tiles[x + y * this.cols]
  }
}
