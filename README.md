# 🇪🇺 in-eu
> Privacy conscious EU detection browser library

`in-eu` is a library for roughly detecting whether a website user is in the EU, without requiring a roundtrip to your server or a lookup against a GeoIP database. 

It uses the browser's timezone (via the brilliant [jstz](https://github.com/iansinnott/jstz) and [locale](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) (`navigator.languages`) to infer whether someone is in the EU.
`in-eu` trades absolute accuracy for a cautious approach that's more lightweight and respectful of end-user privacy.

## Usage

```bash
$ npm install @segment/in-eu
```

```javascript
import inEU from '@segment/in-eu'

inEU()
// => true | false
```

or try one of the more specific helpers:

```javascript
import { isInEUTimezone } from '@segment/in-eu'

/*
 Only checks the browser timezone.
 Useful for checking if someone is physically present in the EU
*/

isInEUTimezone()
// => true | false
```

```javascript
import { isEULocale } from '@segment/in-eu'

/*
 Only uses the browser's language/locale
 Useful for checking if someone speaks an european language accounting
 for locale. e.g. pt-PT (portuguese from Portugal)
*/

isEULocale()
// => true | false
```

## License
in-eu is released under the MIT license.
