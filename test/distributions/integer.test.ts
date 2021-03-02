import test from 'ava'
import seedrandom from 'seedrandom'
import random from '../../src/random'
import inDelta from '../_in-delta'

test('random.int() produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int()
    t.is(typeof v, 'number')
  }
})

test('random.int() with max produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int(100)
    t.is(typeof v, 'number')
  }
})

test('random.int() with min max produces numbers', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  for (let i = 0; i < 10000; ++i) {
    const v = r.int(10, 100)
    t.is(typeof v, 'number')
  }
})

test('random.int() has a mean of 0.5', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const n = 10000
  let sum = 0
  for (let i = 0; i < n; ++i) {
    const v = r.int()
    sum += v
  }
  const mean = sum / n
  t.true(inDelta(mean, 0.5, 0.05))
})
