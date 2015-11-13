# moment-parser
Natural language time parser for moment.js strings


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
