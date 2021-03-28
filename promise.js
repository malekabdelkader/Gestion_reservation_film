function call1(callback){
    callback()
}
function call2(callback){
    callback()
}
function call3(callback){
    callback()
}


console.log("a");
call1(function(){
    console.log( "b");
    call2(function(){
        console.log("c");
        call3(function () {
            console.log("d");
        })
        console.log("e");
    })
    console.log("f");
})
console.log("g");