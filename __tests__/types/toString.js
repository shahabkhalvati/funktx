import { Just, Nothing } from '../../src/types/maybe'
import { Left, Right } from '../../src/types/either'
import { Id } from '../../src/types/id'
import { verify } from '../../src/test-utils'

test('toString', () => {
  verify(Id.of(5).toString()).is('Id(5)')
  verify(Just.of(5).toString()).is('Just(5)')
  verify(Nothing.of().toString()).is('Nothing()')
  verify(Right.of(5).toString()).is('Right(5)')
  verify(Left.of(5).toString()).is('Left(5)')
  verify(Left.of(null).toString()).is('Left(null)')
})
