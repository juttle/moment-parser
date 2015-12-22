start
     = MomentValue

// TODO: Can this be factored out of both parsers and just be included in?

SourceCharacter
  = .

_
  = WhiteSpace*

WhiteSpace "whitespace"
    = [\t\v\f \u00A0\uFEFF]

DecimalLiteral
   = parts:$(DecimalIntegerLiteral "." DecimalDigits?) {
       return parseFloat(parts);
   }
   / parts:$("." DecimalDigits)     { return parseFloat(parts); }
   / parts:$(DecimalIntegerLiteral) { return parseFloat(parts); }

DecimalIntegerLiteral
    = "0"
    / NonZeroDigit DecimalDigits?

Integer
    = digits:$DecimalDigits { return parseInt(digits); }

Integer2
    = $(DecimalDigit DecimalDigit)

Integer4
    = $(DecimalDigit DecimalDigit DecimalDigit DecimalDigit)

DecimalDigits
    = DecimalDigit+

DecimalDigit
    = [0-9]

NonZeroDigit
    = [1-9]

// ***************************    //

UnixTimeLiteral
    = s:DecimalLiteral !SourceCharacter {
        return {
            type: "UnixTimeLiteral",
            valueType: "moment",
            value: s
        }
    }

ISOTZ
    = "Z"
    / $(("+" / "-") Integer2 ":" Integer2 )
    / $(("+" / "-") Integer4 )

ISODate
    = $(Integer4 "-" Integer2 "-" Integer2)

ISOTime
    = $(Integer2 ":" Integer2 ":" Integer2 ("." DecimalDigits)?)

ISODuration
    = $("P" Integer "W")
    / $("P" (Integer "Y")? (Integer "M")? (Integer "D")? ("T" (Integer "H")? (Integer "M")? (Integer "S")?)?)

ISODateLiteral
    = d:ISODate t:$("T" ISOTime)? z:$ISOTZ? {
        return {
            type: "ISODateLiteral",
            valueType: "moment",
            value: d + (t? t : "T00:00:00") + (z ? z: "")
        }
    }

ISODurationLiteral
    = ISODuration {
        return {
            type: "ISODurationLiteral",
            valueType: "duration",
            value: text()
        }
    }

NowLiteral
    = "now" {
        return {
            type: "NowLiteral",
            valueType: "moment"
        };
    }

BeginningLiteral
    = "beginning" {
        return {
            type: "BeginningLiteral",
            valueType: "moment"
        };
    }


EndLiteral
    = "end" {
        return {
            type: "EndLiteral",
            valueType: "moment"
        };
    }

MomentString
    = NowLiteral
    / BeginningLiteral
    / EndLiteral
    / ISODateLiteral
    / UnixTimeLiteral

DurationUnit
    = string:DurationString "s" {
        return string;
    }
    / DurationString
    / DurationAbbrev

DurationString
    = "millisecond"
    / "second"
    / "minute"
    / "hour"
    / "day"
    / "week"

DurationAbbrev
    = "ms"
    / "s"
    / "m"
    / "h"
    / "d"
    / "w"

CalendarUnit
    = string:CalendarString "s" {
        return string;
    }
    / CalendarString
    / CalendarAbbrev

CalendarString
    = "day"
    / "week"
    / "month"
    / "year"

CalendarAbbrev
    = "d"
    / "w"
    / "M"
    / "y"

HumanDuration
    = num:Integer? _ unit:CalendarUnit {
        return {
            type: "MomentDuration",
            valueType: "duration",
            value: (num === null) ? 1 : num,
            unit: unit
        };
    }
    / num:DecimalLiteral? _ unit: DurationUnit {
        num = (num === null) ? 1 : num;

        return {
            type: "MomentDuration",
            valueType: "duration",
            value: num,
            unit: unit
        };
    }

TimeSpan
    = months:(Integer "/")? days:(Integer ".")? hours:Integer2 ":" minutes:Integer2 ":" seconds:Integer2 ms:("." $(DecimalDigit DecimalDigit? DecimalDigit?))? {
        return {
            type: "TimeSpan",
            valueType: "duration",
            months: (months === null) ? 0 : months[0],
            days: (days === null) ? 0 : days[0],
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            seconds: parseInt(seconds),
            milliseconds: (ms === null) ? 0 : parseInt(ms[1])
        };
    }

CalendarOffset
    = "first" _ unit:CalendarUnit _ "of" _ expr:CalendarExpression {
        return {
            type: "CalendarExpression",
            valueType: "moment",
            direction: "down",
            unit: unit,
            expression: expr
        };
    }
    / "final" _ unit:CalendarUnit _ "of" _ expr:CalendarExpression {
        return {
            type: "CalendarExpression",
            valueType: "moment",
            direction: "down",
            unit: unit,
            expression: {
                type: "CalendarExpression",
                direction: "up",
                unit: expr.unit,
                expression: expr
            }
        };
    }
    / ord:OrdinalOffset _ "of" _ expr:CalendarExpression {
        return {
            type: "BinaryExpression",
            valueType: "moment",
            operator: "+",
            left: expr,
            right: ord
        };
    }

CalendarExpression
    = "today" {
        return {
            type: "TodayLiteral",
            valueType: "moment"
        };
    }
    / "yesterday" {
        return {
            type: "YesterdayLiteral",
            valueType: "moment"
        };
    }
    / "tomorrow" {
        return {
            type: "TomorrowLiteral",
            valueType: "moment"
        };
    }
    / "this" _ unit:( CalendarUnit / DurationUnit ) {
        return {
            type: "CalendarExpression",
            valueType: "moment",
            direction: "down",
            unit: unit,
            expression: {
                type: "NowLiteral"
            }
        };
    }
    / "last" _ unit:( CalendarUnit / DurationUnit ) {
        return {
            type: "CalendarExpression",
            valueType: "moment",
            direction: "down",
            unit: unit,
            expression: {
                type: "BinaryExpression",
                operator: "-",
                left: {
                    type: "NowLiteral"
                },
                right: {
                   type: "MomentDuration",
                   value: 1,
                   unit: unit
               }
            }
        };
    }
    / "next" _ unit:( CalendarUnit / DurationUnit ) {
        return {
            type: "CalendarExpression",
            valueType: "moment",
            direction: "down",
            unit: unit,
            expression: {
                type: "BinaryExpression",
                operator: "+",
                left: {
                    type: "NowLiteral"
                },
                right: {
                   type: "MomentDuration",
                   value: 1,
                   unit: unit
               }
            }
        };
    }
    / unit:CalendarUnit _ "of" _ expr:MomentExpression {
        return {
            type: "CalendarExpression",
            valueType: "moment",
            direction: "down",
            unit: unit,
            expression: expr
        }
    }
    / CalendarOffset

OrdinalOffset
    = unit:CalendarUnit _ offset:Integer {
        return {
            type: "MomentDuration",
            valueType: "duration",
            value: offset - 1,
            unit: unit
        };
    }

OrdinalDuration
    = OrdinalOffset

DurationLiteral
    = "forever" {
        return {
            type: "ForeverLiteral",
            valueType: "duration"
        };
    }
    / TimeSpan
    / HumanDuration
    / ISODurationLiteral

DurationExpression
    = left:DurationLiteral _ "and" _ right:DurationExpression {
        return {
            type: "BinaryExpression",
            valueType: "duration",
            operator: "+",
            left: left,
            right: right
        };
    }
    / DurationLiteral

MomentExpression
    = MomentString
    / "-" durationExpression:DurationExpression {
        return {
            type: "BinaryExpression",
            valueType: "moment",
            operator: "-",
            left: {
                type: "NowLiteral"
            },
            right: durationExpression
        };
    }
    / "+" durationExpression:DurationExpression {
        return {
            type: "BinaryExpression",
            valueType: "moment",
            operator: "+",
            left: {
                type: "NowLiteral"
            },
            right: durationExpression
        };
    }
    / durationExpression:DurationExpression _ "ago" {
        return {
            type: "BinaryExpression",
            valueType: "moment",
            operator: "-",
            left: {
                type: "NowLiteral"
            },
            right: durationExpression
        };
    }
    / durationExpression:DurationExpression _ "before" _ subExpression:( MomentExpression / CalendarExpression / MomentValue ) {
        return {
            type: "BinaryExpression",
            valueType: "moment",
            operator: "-",
            left: subExpression,
            right: durationExpression
        };
    }
    / durationExpression:DurationExpression _ ("after" / "from") _ subExpression:( MomentExpression / CalendarExpression / MomentValue ) {
        return {
            type: "BinaryExpression",
            valueType: "moment",
            operator: "+",
            left: subExpression,
            right: durationExpression
        };
    }

MomentValue
    = CalendarExpression
    / MomentExpression
    / MomentDuration

MomentDuration
    = OrdinalDuration
    / DurationExpression
