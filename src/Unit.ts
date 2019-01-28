import Tile from './Tile'

export default class Unit {

  tile: Tile

  constructor(tile: Tile) {
    this.tile = tile

    if (this.tile.unit === null) {
      this.tile.unit = this
    } else {
      throw "Trying to move unit on full tile"
    }
  }

}
