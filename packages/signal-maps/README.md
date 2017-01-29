# SIGNAL MAPS

Signal Maps are dispatching signals whenever any item is added, removed or deleted.
Have a look at https://www.npmjs.com/package/min-signal to learn more about the used signal library.

## Usage
They can be seen as an extensions to the Maps of JavaScript and also be used like them.

### SignalMap

```js
//
// SignalMap Usage Example
//

import SignalMap from "signal-maps";

let sMap = new SignalMap();

sMap.added.add((value, key, map) => {
  console.log("added", value, key, map);
});

sMap.deleted.add((value, key, map) => {
  console.log("deleted", value, key, map);
});

sMap.cleared.add((map) => {
  console.log("cleared", map);
});

sMap.set("foo", "bar");
sMap.delete("foo");
sMap.clear();

```

### SignalWeakMap

```js
//
// SignalWeakMap Usage Example
//

import SignalWeakMap from "signal-maps";

let sMap = new SignalWeakMap();

sMap.added.add((value, key, map) => {
  console.log("added", value, key, map);
});

sMap.deleted.add((value, key, map) => {
  console.log("deleted", value, key, map);
});

sMap.cleared.add((map) => {
  console.log("cleared", map);
});

sMap.set("foo", "bar");
sMap.delete("bar");

```


# LICENSE

Copyright 2017 Martin Emmert

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
