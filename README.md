```
  _____
 |_   _|___ ___ ___ ___ ___
   | | | .'| . | . | -_|  _|
   |_| |__,|_  |_  |___|_|
           |___|___|   version 0.2.1
```
## Tagger - Vanilla JavaScript Tag Editor

[![npm](https://img.shields.io/badge/npm-0.2.1-blue.svg)](https://www.npmjs.com/package/@jcubic/tagger)

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
* completion object `{list: string[] | function(): Promise(string[])|string[], delay: miliseconds, min_length: number}`
* link `function(name): string|false` it should return what should be in href attribute or false


## Changelog
### 0.2.1
* Fix remove_tag when links are disabled
### 0.2.0
* link option
* working completion
* allow to use querySelectorAll etc.
### 0.1.3
* fix inialization in UMD
### 0.1.2
* fix bug in adding tags
### 0.1.1
* fix initalization of tags from input
### 0.1.0
* inital version

## License

Copyright (c) 2018-2020 [Jakub T. Jankiewicz](https://jcubic.pl/me)

Released under the MIT license
