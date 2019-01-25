import Unit from './Unit'

export default class UnitManager {

  units: Unit[]

  constructor() {
    this.units = []
    this.units.push(new Unit(0, 0))
    this.units.push(new Unit(25, 15))
  }

}
