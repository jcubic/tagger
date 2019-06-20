```
  _____
 |_   _|___ ___ ___ ___ ___
   | | | .'| . | . | -_|  _|
   |_| |__,|_  |_  |___|_|
           |___|___|   version 0.1.3
```
## Tagger - Vanilla JavaScript Tag Editor

[![npm](https://img.shields.io/badge/npm-0.1.3-blue.svg)](https://www.npmjs.com/package/@jcubic/tagger)

Usage:

```
tagger(document.querySelector('[name="tags"]'), {allow_spaces: false});
```

[Demo](https://codepen.io/jcubic/pen/YbYpqO)

## API

### methods:

* add_tag(string)
* remove_tag(string)
* complete(string)

### Options
* allow_duplicates (default fasle)
* allow_spaces (default true)
* completion object `{list: string[], delay: miliseconds, min_length: number}`

## License

Copyright (c) 2018-2019 [Jakub T. Jankiewicz](https://jcubic.pl/me)

Released under the MIT license
