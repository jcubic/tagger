```
  _____
 |_   _|___ ___ ___ ___ ___
   | | | .'| . | . | -_|  _|
   |_| |__,|_  |_  |___|_|
           |___|___|   version 0.6.0
```
# [Tagger: Zero dependency, Vanilla JavaScript Tag Editor](https://github.com/jcubic/tagger)

[![npm](https://img.shields.io/badge/npm-0.6.0-blue.svg)](https://www.npmjs.com/package/@jcubic/tagger)

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

Multiple inputs can be created by passing a NodeList or array of elements (eg. document.querySelectorAll()). If only one element is contained in the list then tagger will return the tagger instance, an array of tagger instances will be returned if the number of elements is greater than 1.

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

* **wrap** (default false) allow tags to wrap onto new lines instead of overflow scroll
* **allow_duplicates** (default false)
* **allow_spaces** (default true)
* **add_on_blur** (default false)
* **completion** `{list: string[] | function(): Promise(string[])|string[], delay: miliseconds, min_length: number}`
* **link** `function(name): string|false` it should return what should be in href attribute or false
* **tag_limit** `number` (default -1) limit number of tags, when set to -1 there are no limits
* **placeholder** `string` (default unset) If set in options or on the initial input, this placeholder value will be shown in the tag entry input
* **filter** `function(name): string` it should return the tag name after applying any filters (eg String.toUpperCase()), empty string to filter out tag and prevent creation.

**NOTE:** if you're familiar with TypeScript you can check the API by looking at
TypeScript definition file:

[tagger.d.ts](https://github.com/jcubic/tagger/blob/master/tagger.d.ts)

## License

Copyright (c) 2018-2023 [Jakub T. Jankiewicz](https://jcubic.pl/me)<br/>
Released under the MIT license
