export {}
declare global {
    interface String {
        toDisplayString(): string
        isEmpty(): boolean
        isNotEmpty(): boolean
    }
}
String.prototype.toDisplayString = function () {
    if (this.length === 0) {
        return "-"
    }
    return this.toString()
}
String.prototype.isEmpty = function () {
    if (this.length === 0) {
        return true
    }
    return false
}
String.prototype.isNotEmpty = function () {
    if (this.length === 0) {
        return false
    }
    return true
}
