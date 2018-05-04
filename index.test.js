import test from 'ava'
import jstz from 'jstz'
import browserEnv from 'browser-env'
import inEU, { isInEUTimezone, isEULocale } from './index'

browserEnv()

function mockTZ(tz) {
  jstz.determine = () => ({
    name: () => tz
  })
}

function mockLanguages(languages) {
  Object.defineProperty(window.navigator, 'languages', {
    value: languages,
    writable: true
  })
}

test.serial('checks for timezones in Europe', t => {
  mockTZ('Europe/Barcelona')
  t.true(isInEUTimezone())

  mockTZ('America/Chicago')
  t.false(isInEUTimezone())

  mockTZ('Pacific/Auckland')
  t.false(isInEUTimezone())
})

test.serial('checks for locales in europe', t => {
  // Spain / Spanish
  mockLanguages(['es-ES'])
  t.true(isEULocale())

  // Hungary / Hungarian
  mockLanguages(['HU'])
  t.true(isEULocale())

  // Brazil / Portuguese
  mockLanguages(['pt-BR'])
  t.false(isEULocale())
})
