import Unit from './Unit'
import World from './World'

export default class UnitManager {

  world: World
  units: Unit[]

  constructor(world: World) {
    this.world = world
    this.units = []

    this.units.push(new Unit(this.world.tiles[0]))
    this.units.push(new Unit(this.world.tiles[674]))
  }

}
