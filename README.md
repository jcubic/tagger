```
  _____
 |_   _|___ ___ ___ ___ ___
   | | | .'| . | . | -_|  _|
   |_| |__,|_  |_  |___|_|
           |___|___|   version 0.4.3
```
# [Tagger: Zero dependency, Vanilla JavaScript Tag Editor](https://github.com/jcubic/tagger)

[![npm](https://img.shields.io/badge/npm-0.4.3-blue.svg)](https://www.npmjs.com/package/@jcubic/tagger)

![Tag Editor widget in JavaScript](https://raw.githubusercontent.com/jcubic/tagger/master/screenshot.png)

[Online Demo](https://codepen.io/jcubic/pen/YbYpqO)

## Installation

```
npm install @jcubic/tagger
```

or

```
yarn add @jcubic/tagger
```

## Usage

```
tagger(document.querySelector('[name="tags"]'), {allow_spaces: false});
```

## Usage with React

Tagger can easily be used with ReactJS.

```javascript
import { useRef, useState, useEffect } from 'react'
import tagger from '@jcubic/tagger'

function App() {
  const [tags, setTags] = useState(null)
  const inputRef = useRef(null)

  // Get current tags
  const getTags = () => {
    setTags(inputRef.current.value)
  }

  // Write the Tagger code inside a useEffect hook
  // It will run when the component is initially rendered
  useEffect(() => {
    // Define the Tagger options
    const taggerOptions = {
      allow_spaces: true,
    }

    // Initialize Tagger
    tagger(inputRef.current, taggerOptions)
  }, [])

  return (
    <div className='app'>
      <input type='text' defaultValue='charles, louis, michel' ref={inputRef} />
      <button onClick={getTags}>Get tags</button>

      {tags && <pre>{tags}</pre>}
    </div>
  )
}

export default App
```

## API

### methods:

* `add_tag(string): boolean`
* `remove_tag(string): booelan`
* `complete(string): void`

### Options:

* **wrap** (default false)
* **allow_duplicates** (default false)
* **allow_spaces** (default true)
* **add_on_blur** (default false)
* **completion** `{list: string[] | function(): Promise(string[])|string[], delay: miliseconds, min_length: number}`
* **link** `function(name): string|false` it should return what should be in href attribute or false
* **tag_limit** (default -1)

**NOTE:** if you're familiar with TypeScript you can check the API by looking at
TypeScript definition file:

[tagger.d.ts](tagger.d.ts)

## Changelog
### 0.4.3
* Fix completion on Safari [#7](https://github.com/jcubic/tagger/issues/7)
### 0.4.2
* Fix autocomplete [#22](https://github.com/jcubic/tagger/pull/22)
### 0.4.1
* fix typescript definition for completion
### 0.4.0
* [Breaking] value in input no longer have space after comma
* fix updating input when deleting tag using backspace
* add option `add_on_blur`
* add option `tag_limit`
### 0.3.1
* fix npm package
### 0.3.0
* add wrap option
* fix remove_tag API
* make settings optional
* add typescript types
### 0.2.3
* fix ambiguous tags
### 0.2.2
* reject empty tags
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
* initial version

## License

Copyright (c) 2018-2022 [Jakub T. Jankiewicz](https://jcubic.pl/me)<br/>
Released under the MIT license
