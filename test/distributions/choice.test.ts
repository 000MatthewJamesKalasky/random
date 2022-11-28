import test from 'ava'
import seedrandom from 'seedrandom'

import inDelta from '../_in-delta'
import random from '../../src/index'

type DistFn = () => number
type TestFn = (sample: number) => void

/**
 * @param d Distribution function
 * @returns Mean of d
 */
export const calcMean = (d: DistFn, testFn: TestFn) => {
  const n = 10000
  let sum = 0

  for (let i = 0; i < n; ++i) {
    const v = d()
    if (testFn) testFn(v)
    sum += v
  }

  return sum / n
}

test('random.choice() with seedrandom has correct uniform mean selection', (t) => {
  const r = random.clone(seedrandom('MjEzNGFlYzBiMDFmYjNjY2NhMTY2YzEy'))
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const d = () => r.choice(a)
  const mean = calcMean(d, (v) => {
    t.true(a.includes(v))
  })
  t.true(inDelta(mean, 5.5, 0.05))
})

test('random.choice() produces valid output for mixed arrays', (t) => {
  const r = random.clone(seedrandom('NWNmMmU2MzVmNWY5MzQ1MzdhZjc0M2Zm'))
  const a = [13, 'foo', { example: true }, false, null, 14.152]
  for (let i = 0; i < 1000000; ++i) {
    const s = r.choice(a)
    t.true(a.includes(s))
  }
})

test('random.choice() produces undefined for empty arrays', (t) => {
  const r = random.clone(seedrandom('MzdkYTRkNTE4YWVjYThiNzkwMGI5YzA4'))
  const a = []
  for (let i = 0; i < 1000; ++i) {
    const s = r.choice(a)
    t.is(s, undefined)
  }
})

test('random.choice() with invalid input', (t) => {
  const r = random.clone(seedrandom('ZDJjM2IyNmFlNmVjNWQwMGZkMmY1Y2Nk'))
  const error1 = t.throws(
    () => {
      r.choice(5 as any)
    },
    { instanceOf: Error }
  )
  t.is(
    error1?.message,
    'Random.choice expected input to be an array, got number'
  )

  const error2 = t.throws(
    () => {
      r.choice({ foo: true } as any)
    },
    { instanceOf: Error }
  )
  t.is(
    error2?.message,
    'Random.choice expected input to be an array, got object'
  )
})
