export {}
declare global {
    interface Array<T> {
        isEmpty(): boolean
        isNotEmpty(): boolean
    }
}
Array.prototype.isEmpty = function () {
    if (this.length === 0) {
        return true
    }
    return false
}
Array.prototype.isNotEmpty = function () {
    if (this.length === 0) {
        return false
    }
    return true
}
