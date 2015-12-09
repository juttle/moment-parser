function subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
}

function SyntaxError(message) {
    this.name = "SyntaxError";
    this.message = message;
}
subclass(SyntaxError, Error);

function NotAMomentError(message) {
    this.name = "NotAMomentError";
    this.message = message || "Not a moment";
}
subclass(NotAMomentError, Error);

function NotADurationError(message) {
    this.name = "NotADurationError";
    this.message = message || "Not a duration";
}
subclass(NotADurationError, Error);

module.exports = {
    SyntaxError: SyntaxError,
    NotAMomentError: NotAMomentError,
    NotADurationError: NotADurationError
};
