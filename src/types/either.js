import { Just, Nothing } from './maybe'
import { VALUE_FIELD, _generic } from './internals'

export function Either() {}
// istanbul ignore next
Either.toString = () => 'Either'
Either.Left = Left
Either.Right = Right

Either.prototype.fold = function (onLeft) {
  const self = this

  return function (onRight) {
    return (self instanceof Left ? onLeft : onRight)(self[VALUE_FIELD])
  }
}

Either.prototype.toMaybe = function () {
  return this instanceof Right ? Just.of(this[VALUE_FIELD]) : Nothing.of()
}

Either.fromMaybe = function (maybe, def) {
  return maybe.toEither(def)
}

export function Right() {
  Either.call(this)
}
// istanbul ignore next
Right.toString = () => 'Right'

Right.prototype = Object.create(Either.prototype)
Right.prototype.constructor = Right

Right.prototype.map = _generic.map(Right)
Right.prototype.toString = _generic.toString(Right)

Right.of = _generic.of(Right)

export function Left() {
  Either.call(this)
}
// istanbul ignore next
Left.toString = () => 'Left'

Left.prototype = Object.create(Either.prototype)
Left.prototype.constructor = Left

Left.prototype.map = function () {
  return Left.of(this[VALUE_FIELD])
}
Left.prototype.toString = _generic.toString(Left)

Left.of = _generic.of(Left)
