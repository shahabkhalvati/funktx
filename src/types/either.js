import { VALUE_FIELD, _generic } from './internals'

export function Either() {}
Either.toString = () => 'Either'

Either.prototype.fold = function (onLeft) {
  const self = this

  return function (onRight) {
    return (self instanceof Left ? onLeft : onRight)(self[VALUE_FIELD])
  }
}

export function Right() {
  Either.call(this)
}
Right.toString = () => 'Right'

Right.prototype = Object.create(Either.prototype)
Right.prototype.constructor = Right

Right.prototype.map = _generic.map(Right)
Right.prototype.toString = _generic.toString(Right)

Right.of = _generic.of(Right)

export function Left() {
  Either.call(this)
}
Left.toString = () => 'Left'

Left.prototype = Object.create(Either.prototype)
Left.prototype.constructor = Left

Left.prototype.map = function () {
  return Left.of(this[VALUE_FIELD])
}
Left.prototype.toString = _generic.toString(Left)

Left.of = _generic.of(Left)
