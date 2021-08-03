import { VALUE_FIELD, _generic } from './internals'

export function Id() {}
Id.toString = () => 'Id'

Id.prototype.map = _generic.map(Id)
Id.prototype.toString = _generic.toString(Id)
Id.prototype.fold = function (f) {
  return f(this[VALUE_FIELD])
}

Id.of = _generic.of(Id)
