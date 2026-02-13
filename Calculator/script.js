const methods={
    "+":(a,b)=>a+b,
    "-":(a,b)=>a-b,
    "*":(a,b)=>a*b,
    "/":(a,b)=>a/b,
    equal:function(arr){
        if(methods[arr[1]]){
            let result=methods[arr[1]](parseFloat(arr[0]),parseFloat(arr[2]))
            if(!isFinite(result)){return "Error"}
            else if(result===Infinity){return "Sneaky error"}
            else{return parseFloat(result.toFixed(12))}
            }
        else{
            return "Error"
        }}
}
const numbers=document.querySelectorAll(".nums-btn")
const operators={
    divide:document.getElementById("divide"),
    multiply:document.getElementById("multiply"),
    substract:document.getElementById("substract"),
    add:document.getElementById("add"),
}
const buttons={
    clear:document.getElementById("clear"),
    delete:document.getElementById("delete"),
    result:document.getElementById("result"),
    output:document.getElementById("output"),
    equal:document.getElementById("equal"),
    dot:document.getElementById("dot"),
    percent:document.getElementById("percentage")}
const functions={
    handlingNums:function(num){
        isContinuing=false;
        if(buttons.output.style.display==="none"){
            buttons.output.style.display="block"
            operation=''
        }
        operation+=`${num.innerText}`
        buttons.result.innerText=''
        buttons.output.innerText+=num.innerText;
        if(operation.split(" ").length===3){
            buttons.result.innerText=methods.equal(operation.split(" "))}},
    handlingPercent:function(){
        operation=operation.split(" ")
        let temporary=operation.at(-1)/100;
        operation.pop();
        operation=operation.join(" ") + " " + temporary;
        buttons.output.innerText=operation;
        if(operation.split(" ").length===3){
            buttons.result.innerText=methods.equal(operation.split(" "))
    }},
    handlingOperators:function(operator){
        if(operation.split(" ").length===3){
            buttons.result.innerText=methods.equal(operation.split(" "))
            operation=buttons.result.innerText
            buttons.output.innerText=operation}
        else if(isContinuing){
            buttons.output.innerText="Ans"
            buttons.output.style.display="block";
        }
        buttons.output.innerText+=operators[operator].innerText;
        operation+=` ${operators[operator].innerText} `
},
    handlingEqual:function(){buttons.output.style.display="none";
    buttons.output.innerText='';
    if(!operation.includes(" ")){
        buttons.result.innerText=operation
    }
    else{
    operation=buttons.result.innerText}
    isContinuing=true;
    },
    handlingClear:function(){
        operation='';
        buttons.result.innerText='';
        buttons.output.innerText='';
        buttons.output.style.display="block";
    },
    handlingDelete:function(){
        if (operation.length === 0) return;
        if (operation.endsWith(" ")) {
            operation = operation.slice(0, -3);
        } else {
            operation = operation.slice(0, -1);
        }
        buttons.output.innerText = operation;
        let parts = operation.trim().split(/\s+/); 
        if (parts.length === 3 && parts[2] !== "") {
            buttons.result.innerText = methods.equal(parts);
        } else {
            buttons.result.innerText = '';
        }
    },
    handlingDot:function(){
        if(!operation.includes(" ")&&!operation.includes(".")){
            operation+=".";
            buttons.output.innerText+="."
        }
        else if(operation.split(" ").length===3&&!operation.split(" ").at(-1).includes(".")){
            operation+=".";
            buttons.output.innerText+="."
        }
        else{
            return;
        }
        if(isContinuing&&!buttons.result.innerText.includes(".")){
            buttons.output.innerText=buttons.result.innerText+".";
            buttons.result.innerText='';
            buttons.output.style.display="block";
            operation=buttons.output.innerText;
        }
    }
}
let operation="";
let isContinuing=false;
let nums=[0,1,2,3,4,5,6,7,8,9]
buttons.equal.addEventListener("click",function(){
    functions.handlingEqual();
})
numbers.forEach((num)=>{
    num.addEventListener("click",function(){
        functions.handlingNums(num);
    })})
document.addEventListener("keydown",function(e){
    if(nums.includes(parseInt(e.code.at(-1)))){
        functions.handlingNums(document.getElementById("number-"+parseInt(e.code.at(-1))))}
    switch (e.key) {
        case "Backspace":functions.handlingDelete();break;
        case "+":functions.handlingOperators("add");break;
        case "-":functions.handlingOperators("substract");break;
        case "*":functions.handlingOperators("multiply");break;
        case "/":functions.handlingOperators("divide");break;
        case "%":functions.handlingPercent();break;
        case "Enter":
        case "=":functions.handlingEqual();break;
        case ".":functions.handlingDot();break;
        case "c":
        case "C":functions.handlingClear();break;
    }
});
for (let operator in operators){
    operators[operator].addEventListener("click",function(){
        functions.handlingOperators(operator);
})}
buttons.percent.addEventListener("click",function(){
    functions.handlingPercent();
})
buttons.clear.addEventListener("click",function(){
    functions.handlingClear();
})
buttons.delete.addEventListener("click",function(){
    functions.handlingDelete();
});
buttons.dot.addEventListener("click",function(){
    functions.handlingDot();
})