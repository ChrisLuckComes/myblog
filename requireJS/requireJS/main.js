req(['a', 'b'], function (a, b) {
    a.hi()
    b.goodbye()
}, function () {
    console.error('error')
})