# moment-parser
Natural language time parser for moment.js strings

[![Build Status](https://travis-ci.org/juttle/moment-parser.svg)](https://travis-ci.org/juttle/moment-parser)

### Quick start

```npm install moment-parser```

```js
var MomentParser = require('moment-parser');
var parser = new MomentParser();

// durations
console.log(parser.parse('1 hour')); //{ type: 'MomentDuration', value: 1, unit: 'hour' }
console.log(parser.parseDuration('2 months and 1 day')); // a momentjs duration of { days: 1, months: 2 }

// moments
console.log(parser.parse('2015-01-01')); //{ type: 'ISODateLiteral', value: '2015-01-01T00:00:00' }
console.log(parser.parseMoment('day 5 of next month')); // a momentjs moment at the start of next month plus 4 days
```


[More Examples In Tests](test/)


### Running Unit Tests

```npm test```


## More examples
(proper grammar docs coming soon!)

### Absolute Moments

All times are UTC0 unless a time zone is specified by appending it to
an ISO-8601 string.  ​ ​

-  Midnight on a specific date (UTC0):
```
2014-09-21
```
​
-  An [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) date and time, UTC0:
```
2014-09-22T11:39:17.993
```
​
-  The same date and time, as Pacific Standard Time:
```
2014-09-22T03:39:17.993-08:00
```
​
### Durations
​
-  One second, minute, hour, day, week, and so on:
```
second
minute
hour
day
week
month
year
```
​
Note that `month` and `year` are special "calendar" durations that do
not have fixed length but instead advance whole months or years relative
to a fixed moment.
​
-  Abbreviations for 0 seconds, 1 minute, 2 hours, 3 days, 4 weeks, 5
months, 6 years:
```
0s
1m
2h
3d
4w
5M
6y
```
​
-  Two ways to write one hour and twenty-three minutes:
```
 1 hour and 23 minutes
 01:23:00
```
​
-  Additional examples:
```
 1 second
 20 minutes
```
​
### Relative Moments
​
-  The moment at which the program started running:
```
now
```
​
-  Midnight yesterday, today, or tomorrow:
```
yesterday
today
tomorrow
```
​
-  Seven hours after midnight on the current day:
```
07:00:00 after today
```
​
-  One minute from the start of the program's execution:
```
 1 minute from now
```
​
-  Shorter way to write `2 minutes from now`:
```
+2m
```
​
-  Shorter way to write `1 hour and 10 minutes before now`:
```
-01:10:00
```
​
-  Now minus 72 hours:
```
 3 days ago
```
​
-  Now minus 22 days:
```
 3 weeks and 1 day ago
```
​
-  Midnight of the first day of the current calendar month:
```
this month
```
​
-  Midnight of the first day of the previous calendar month:
```
last month
```
​
-  Midnight of the 20th day of the previous calendar month:
```
day 20 of last month
```
​
-  The minute in which the program began executing:
```
this minute
```
​
-  The next even hour after the start of the program's execution:
```
next hour
```
​
-  The day in which the program began executing:
```
this day
today
```
​
-  The day before the day in which the program began executing:
```
last day
yesterday
```
​
