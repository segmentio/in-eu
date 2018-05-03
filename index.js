const jstz = require('jstz')

/*
  Loosely checks if someone's in Europe based on their timezone or locale.
  This is not a perfect implementation, as it would potentially
  catch folks that aren't necessarily in the EU, but checking
  the timezone is still a lot cheaper and less invasive than
  using people's IPs to determine their location.
*/
module.exports = function isInEU() {
  const tz = browserTimezone()
  const locale = browserLocale()
  return (tz && isInEUTimezone(tz)) || (locale && isEULocale(locale))
}

const countryCodes = {
  BE: 'Belgium',
  EL: 'Greece',
  LT: 'Lithuania',
  PT: 'Portugal',
  BG: 'Bulgaria',
  ES: 'Spain',
  LU: 'Luxembourg',
  RO: 'Romania',
  CZ: 'Czech Republic',
  FR: 'France',
  HU: 'Hungary',
  SI: 'Slovenia',
  DK: 'Denmark',
  HR: 'Croatia',
  MT: 'Malta',
  SK: 'Slovakia',
  DE: 'Germany',
  IT: 'Italy',
  NL: 'Netherlands',
  FI: 'Finland',
  EE: 'Estonia',
  CY: 'Cyprus',
  AT: 'Austria',
  SE: 'Sweden',
  IE: 'Ireland',
  LV: 'Latvia',
  PL: 'Poland',
  UK: 'United Kingdom',
  GB: 'United Kingdom'
}

/*
  Loosely checks that a given locale partially matches an EU country code.
  This won't work perfect for every language, but it should give us some
  extra signal.

  http://ec.europa.eu/eurostat/statistics-explained/index.php?title=Glossary:Country_codes
*/
function isEULocale(locale) {
  let code = locale
  if (locale.includes('-')) {
    code = locale.split('-')[1]
  }

  return !!countryCodes[code.toUpperCase()]
}

function isInEUTimezone(tz) {
  return tz.indexOf('Europe') > 0
}

function browserTimezone() {
  const timezone = jstz.determine()
  return timezone.name()
}

function browserLocale() {
  if (window.navigator.languages && window.navigator.languages.length > 0) {
    // Latest versions of Chrome and Firefox set this correctly
    return navigator.languages[0]
  }

  if (navigator.userLanguage) {
    // IE only
    return navigator.userLanguage
  }

  return navigator.language
}
