import babel from 'babel-core'

var decorator = (wrapped) => {
    return function(){
        console.log("starting")
        wrapped.apply(this, arguments)
        console.log("finished")
    }
}

// @decorator
var add = (a, b) => {
    console.log(a + b)
}


add(1, 3)

