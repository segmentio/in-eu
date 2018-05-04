import test from 'ava'
import jstz from 'jstz'
import browserEnv from 'browser-env'
import inEU, { isInEUTimezone, isEULocale } from './index'

browserEnv()

let originalTZ = jstz.determine
let originalLanguages = window.navigator.languages
let originalLanguage = navigator.language
let originalUserLanguage = navigator.userLanguage

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

function mockLanguage(language) {
  Object.defineProperty(navigator, 'language', {
    value: language,
    writable: true
  })
}

function mockeUserLanguage(language) {
  Object.defineProperty(navigator, 'userLanguage', {
    value: language,
    writable: true
  })
}

function resetMonkeyPatches() {
  jstz.determine = originalTZ

  Object.defineProperty(navigator, 'languages', {
    value: originalLanguages,
    writable: true
  })

  Object.defineProperty(navigator, 'language', {
    value: originalLanguage,
    writable: true
  })
  
  Object.defineProperty(navigator, 'userLanguage', {
    value: originalUserLanguage,
    writable: true
  })
}

test.beforeEach(() => resetMonkeyPatches())

test.serial('inEU -> verifies the visitors timezone and locale (in order)', t => {
  // American English speaker in London
  mockLanguages(['en-GB'])
  mockTZ('Europe/London')
  t.true(inEU())

  // German speaker in Germany
  mockLanguages(['de-DE'])
  mockTZ('Europe/Berlin')
  t.true(inEU())

  // American English speaker in London
  mockLanguages(['en-GB'])
  mockTZ('Europe/London')
  t.true(inEU())

  // Hungarian in Brazil
  mockLanguages(['HU'])
  mockTZ('America/Brasilia')
  t.true(inEU())

  // Brazilian in New Zeland
  mockLanguages(['pt-BR'])
  mockTZ('Pacific/Auckland')
  t.false(inEU())
})

test.serial('isInEUTimezone -> checks for timezones in Europe', t => {
  mockTZ('Europe/Barcelona')
  t.true(isInEUTimezone())

  mockTZ('America/Chicago')
  t.false(isInEUTimezone())

  mockTZ('Pacific/Auckland')
  t.false(isInEUTimezone())
})

test.serial('isEULocale -> supports `window.navigator.languages`', t => {
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

test.serial('isEULocale -> supports `navigator.userLanguage`', t => {
  mockLanguages(undefined)
  mockLanguage(undefined)

  // Spain / Spanish
  mockeUserLanguage('es-ES')
  t.true(isEULocale())

  // Hungary / Hungarian
  mockeUserLanguage('HU')
  t.true(isEULocale())

  // Brazil / Portuguese
  mockeUserLanguage('pt-BR')
  t.false(isEULocale())
})

test.serial('isEULocale -> supports `navigator.language`', t => {
  // Spain / Spanish
  mockLanguages(null)
  mockLanguage('es-ES')
  t.true(isEULocale())

  // Hungary / Hungarian
  mockLanguage('HU')
  t.true(isEULocale())

  // Brazil / Portuguese
  mockLanguage('pt-BR')
  t.false(isEULocale())
})
