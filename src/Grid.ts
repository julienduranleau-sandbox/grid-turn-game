import Tile from './Tile'

export default class Grid {

  tiles: Tile[]

  constructor(width: number, height: number) {
    this.tiles = this.generateGrid(width, height)
  }

  generateGrid(width: number, height: number): Tile[] {
    let tiles: Tile[] = []

    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= height; x++) {
        tiles.push(new Tile(x, y))
      }
    }

    return tiles
  }
}
