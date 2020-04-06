//剩余参数
function show(a,b,...c){
    console.log(a);
    console.log(b);
    console.log(c);

}
show(1,2,4,6,7,9);
let arr=[1,2,,3];
console.log(arr);
console.log(...arr);
function add(...arr){
    return arr.reduce((previous,current)=>{
        return previous+current;
    })
    }
