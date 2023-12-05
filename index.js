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
/*
List includes all EU and EEA countries
*/
var countryCodes = {
  AT: 'Austria',
  BE: 'Belgium',
  BG: 'Bulgaria',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DE: 'Germany',
  DK: 'Denmark',
  EE: 'Estonia',
  EL: 'Greece',
  ES: 'Spain',
  FI: 'Finland',
  FR: 'France',
  HR: 'Croatia',
  HU: 'Hungary',
  IE: 'Ireland',
  IT: 'Italy',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  LV: 'Latvia',
  MT: 'Malta',
  NL: 'Netherlands',
  PL: 'Poland',
  PT: 'Portugal',
  RO: 'Romania',
  SE: 'Sweden',
  SI: 'Slovenia',
  SK: 'Slovakia',
  IS: 'Iceland',
  LI: 'Liechtenstein',
  NO: 'Norway',
  CH: 'Switzerland', // Added Switzerland

  // Additional regions associated with EU countries
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
  AX: 'Aland Islands',
  // UK territories
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
  IM: 'Isle of Man',
  GB: 'United Kingdom',
  UK: 'United Kingdom' 
};


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
