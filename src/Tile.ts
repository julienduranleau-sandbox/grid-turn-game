export default class Tile {

  x: number
  y: number
  isWall!: boolean

  neighbours: {
    top: Tile|null,
    topright: Tile|null,
    right: Tile|null,
    bottomright: Tile|null,
    bottom: Tile|null,
    bottomleft: Tile|null,
    left: Tile|null,
    topleft: Tile|null,

    all4: Tile[],
    all8: Tile[],
  }


  constructor(x: number, y: number) {
    this.x = x
    this.y = y

    this.neighbours = {
      top: null,
      topright: null,
      right: null,
      bottomright: null,
      bottom: null,
      bottomleft: null,
      left: null,
      topleft: null,

      all4: [],
      all8: [],
    }

    this.reset()
  }

  reset() {
    this.isWall = false
  }

}
