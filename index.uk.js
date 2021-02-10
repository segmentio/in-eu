var jstz = require('jstz')

/*
  Loosely checks if someone's in Europe based on their timezone or locale.
  This is not a perfect implementation, as it would potentially
  catch folks that aren't necessarily in the EU, but checking
  the timezone is still a lot cheaper and less invasive than
  using people's IPs to determine their location.
*/
module.exports = function isInEU() {
  return isInEUTimezone() || isEULocale()
}

module.exports.isInEUTimezone = isInEUTimezone
module.exports.isEULocale = isEULocale

/*
  Loosely checks that a given locale partially matches an EU country code.
  This won't work perfect for every language, but it should give us some
  extra signal.

  http://ec.europa.eu/eurostat/statistics-explained/index.php?title=Glossary:Country_codes
*/
function isEULocale() {
  var locale = browserLocale()
  var code = locale

  if (locale.indexOf('-') >= 0) {
    code = locale.split('-')[1]
  }

  return !!countryCodes[code.toUpperCase()]
}

function isInEUTimezone() {
  var tz = browserTimezone()
  return tz && tz.indexOf('Europe') >= 0
}

var countryCodes = {
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
  RE: 'Reunion',
  GP: 'Guadeloupe',
  MQ: 'Martinique',
  GF: 'French Guiana',
  YT: 'Mayotte',
  BL: 'Saint Barthelemy',
  MF: 'Saint Martin',
  PM: 'Saint Pierre and Miquelon',
  WF: 'Wallis and Futuna',
  PF: 'French Polynesia',
  NC: 'New Caledonia',
  HU: 'Hungary',
  SI: 'Slovenia',
  DK: 'Denmark',
  FO: 'Faroe Islands',
  GL: 'Greenland',
  HR: 'Croatia',
  MT: 'Malta',
  SK: 'Slovakia',
  DE: 'Germany',
  IT: 'Italy',
  NL: 'Netherlands',
  AW: 'Aruba',
  CW: 'Curacao',
  SX: 'Sint Maarten',
  FI: 'Finland',
  AX: 'Aland Islands',
  EE: 'Estonia',
  CY: 'Cyprus',
  AT: 'Austria',
  SE: 'Sweden',
  IE: 'Ireland',
  LV: 'Latvia',
  PL: 'Poland',
  UK: 'United Kingdom',
  GB: 'United Kingdom',
  AI: 'Anguilla',
  BM: 'Bermuda',
  IO: 'British Indian Ocean Territory',
  VG: 'British Virgin Islands',
  KY: 'Cayman Islands',
  FK: 'Falkland Islands',
  GI: 'Gibraltar',
  MS: 'Montserrat',
  PN: 'Pitcairn, Henderson, Ducie and Oeno Islands',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  TC: 'Turks and Caicos Islands',
  GG: 'Guernsey',
  JE: 'Jersey',
  IM: 'Isle of Man'
}

function browserTimezone() {
  var timezone = jstz.determine()
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
