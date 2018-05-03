import inEU from './index'
import assert from 'assert'

describe('inEU', () => {
  it('works', () => {
    console.log('hhii', inEU())
    assert(!inEU())
  })
})
