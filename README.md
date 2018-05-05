# 🇪🇺 in-eu
> Privacy conscious EU detection browser library

`in-eu` is a library for roughly detecting whether a website user is in the EU, without requiring a roundtrip to your server or a lookup against a GeoIP database. 

It uses the browser's timezone (via the brilliant [jstz](https://github.com/iansinnott/jstz) and locale (`navigator.languages`) to infer whether someone is in the EU. It trades absolute accuracy for a cautious approach that's more lightweight and respectful of end-user privacy.

## Usage

```bash
$ npm install @segment/in-eu
```

```javascript
import inEU, { isInEUTimezone, isEULocale } from '@segment/in-eu'

inEU() // same as (isInEUTimezone() || isEULocale())

// or
isInEUTimezone()
isEULocale()
```

## License
in-eu is released under the MIT license.