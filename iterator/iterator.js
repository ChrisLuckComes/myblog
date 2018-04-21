var obj = {
    a: 1,
    b: 2
}
Object.defineProperty(obj, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function () {
        var o = this
        var index = 0
        var keys = Object.keys(o)
        return {
            next: function () {
                return {
                    value: o[keys[index++]],
                    done: (index > keys.length)
                }
            }
        }
    }
})
for (let o of obj) {
    console.log(o);
}