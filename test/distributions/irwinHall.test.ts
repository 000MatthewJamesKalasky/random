import test from 'ava'
import { ArgumentError } from 'ow'
import seedrandom from 'seedrandom'

import random from '../../src/random'

test('random.irwinHall() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const d = r.irwinHall()
  for (let i = 0; i < 10000; ++i) {
    const v = d()
    t.is(typeof v, 'number')
  }
})

test('random.irwinHall() invalid negative n input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error = t.throws(
    () => {
      r.irwinHall(-1)
    },
    { instanceOf: ArgumentError }
  )
  t.is(
    error.message,
    'Expected number to be greater than or equal to 0, got -1'
  )
})
