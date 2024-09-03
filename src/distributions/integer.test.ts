import seedrandom from 'seedrandom'
import { assert, test } from 'vitest'

import random from '../random'

test('random.int() produces numbers in [0,1]', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10_000; ++i) {
    const v = r.int()
    assert.isTrue(v >= 0)
    assert.isTrue(v <= 1)
  }
})

test('random.int() with max produces numbers in [0, max]', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10_000; ++i) {
    const v = r.int(100)
    assert.isTrue(v >= 0)
    assert.isTrue(v <= 100)
  }
})

test('random.int() with min max produces numbers in [min, max]', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10_000; ++i) {
    const v = r.int(10, 100)
    assert.isTrue(v >= 10)
    assert.isTrue(v <= 100)
  }
})

test('random.int() has a mean of 0.5', () => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const n = 10_000
  let sum = 0
  for (let i = 0; i < n; ++i) {
    const v = r.int()
    sum += v
  }
  const mean = sum / n
  assert.closeTo(mean, 0.5, 0.05)
})
