var show=function(){
    console.log("hello world");

}
show();
var show2=()=>console.log("hello world");
show2();
var show3=function(name){
    console.log(name);
}
show3('hxy');
var show4=(name)=>console.log(name);
show4('hxy');

var add1=function(a,b){
    return a+b;
}
console.log(add(1,2));

var add2=(a,b)=>{
    return a+b;
}
console.log(add2(1,2));
var add3=(a,b)=>a+b;
console.log(add(1,2));