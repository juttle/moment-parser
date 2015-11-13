# moment-parser
Natural language time parser for moment.js strings

[![Build Status](https://magnum.travis-ci.com/juttle/moment-parser.svg?token=y7186y8XHjB7CcxwUcoX)](https://magnum.travis-ci.com/juttle/moment-parser)

### Quick start

```npm install moment-parser```

```js
var MomentParser = require('moment-parser');
var parser = new MomentParser();

console.log(parser.parse('1 hour')); //{ type: 'MomentDuration', value: 1, unit: 'hour' }
```

[More Examples In Tests](test/literal-durations.spec.js)


### Running Unit Tests

```npm test```
