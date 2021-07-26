import { VALUE_FIELD, _generic } from './internals'
import { isUndefined } from '../core/internal/_isNil'

export function Maybe() {}
Maybe.toString = () => 'Maybe'

Maybe.isJust = (x) => x instanceof Just
Maybe.isNothing = (x) => x instanceof Nothing
Maybe.from = (x) => (isUndefined(x) ? Nothing.of() : Just.of(x))

Maybe.prototype.fold = function (onNothing) {
  const self = this

  return function (onJust) {
    if (self.isJust) return onJust(self[VALUE_FIELD])
    return onNothing()
  }
}

export function Just() {
  Maybe.call(this)

  this.isJust = true
  this.isNothing = false
}
Just.toString = () => 'Just'

Just.prototype = Object.create(Maybe.prototype)
Just.prototype.constructor = Just

Just.prototype.map = _generic.map(Just)
Just.prototype.toString = _generic.toString(Just)

Just.of = _generic.of(Just)

export function Nothing() {
  Maybe.call(this)

  this.isJust = false
  this.isNothing = true
}
Nothing.toString = () => 'Nothing'

Nothing.prototype = Object.create(Maybe.prototype)
Nothing.prototype.constructor = Nothing

Nothing.prototype.map = () => Nothing.of()
Nothing.prototype.toString = _generic.toString(Nothing)

Nothing.of = () => new Nothing()
