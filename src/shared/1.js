

function one(){
    console.log('one')
}
function three(){
    console.log('three')
}

function two(otherFunction){
    console.log('two')
    //otherFunction()
}


two(one)
two(three)

function sum(a, b){
    console.log(a + b)
}

sum(5, 10)
sum(2, 4)
