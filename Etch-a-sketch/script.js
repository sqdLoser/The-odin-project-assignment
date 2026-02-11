const container=document.getElementById("container");
const input=document.getElementById("range");
const label=document.getElementById("labelForRange");
const colorpicker=document.getElementById("colorpicker");
const rainbowBtn=document.getElementById("rainbow");
const colorBtn=document.getElementById("color");
const eraserBtn=document.getElementById("eraser");
const clearBtn=document.getElementById("clear-btn");
const toggleBorders=document.getElementById("borders");

let activated=colorBtn;
let color="#ff0000";
container.style.display="grid";
container.style.border="1px solid #FB923C";
array=[rainbowBtn,colorBtn,eraserBtn];
creatingDivs(16);
let isActive=false;
toggleBorders.addEventListener("click",function(){
    if(!isActive){
        toggleBorders.style.backgroundColor="#F97316";
        toggleBorders.style.color="white"
        toggleBorders.style.border="1px solid #F97316"
        isActive=true;
        Array.from(container.children).forEach((element)=>{if(element.style.borderColor=="rgb(255, 247, 237)" ||element.style.border==""){element.style.border="1px solid rgb(251, 146, 60)"}})
    }
    else{
        unactivate(toggleBorders);
        isActive=false;
        Array.from(container.children).forEach((element)=>{if(element.style.border=="1px solid rgb(251, 146, 60)"){element.style.borderColor="#FFF7ED"}})
    }
})

container.addEventListener("mousedown",function(e){
    isdrawing=true;
    if(e.target!==this){
        paint(e);}
})
container.addEventListener("mouseup",()=>{isdrawing=false})
container.addEventListener("dragenter",function(e){ isdrawing=false; if(e.target!==this){paint(e)}})
container.addEventListener("touchmove",function(e){
    if(e.target!==this){
        e.preventDefault();
        paint(e)}})
container.addEventListener("mouseleave",()=>{isdrawing=false})
container.addEventListener("mouseover",function(e){
    if(isdrawing&&e.target!==this){
        paint(e);
}})
if (activated.id=="color"){
    colorpicker.addEventListener("input",()=>color=colorpicker.value);}
function paint(e){
    if(activated.id=="rainbow"){
        color=`rgb(${Math.floor(Math.random()*256)} ${Math.floor(Math.random()*256)} ${Math.floor(Math.random()*256)})`}
    e.target.style.backgroundColor=color;
    if(activated.id=="eraser"&&isActive){
        e.target.style.border="1px solid rgb(251, 146, 60)"}
   else{
        e.target.style.border="1px solid " + color;   
}
}
function activate(btn){
    btn.style.backgroundColor="#F97316";
    btn.style.color="white"
    btn.style.border="1px solid #F97316"
    activated=btn
}
function unactivate(btn){
    btn.style.backgroundColor="#FED7AA";
    btn.style.color="black"
    btn.style.border="1px solid black"
}
array.forEach(element => {
    element.addEventListener("click",function(e){
        unactivate(activated);
        activate(element)
})});
eraserBtn.addEventListener("click",()=>color="#FFF7ED");
colorBtn.addEventListener("click",()=>color=colorpicker.value);
clearBtn.addEventListener("click",()=>{
    creatingDivs(input.value)
    if (isActive){
            Array.from(container.children).forEach((element)=>{element.style.border="1px solid #FB923C"})
    }});
function creatingDivs(number){
    container.innerHTML=""
    for (let i=0;i<number*number;i++){
        let div=document.createElement("div")
        div.style.border="1px solid #FFF7ED";
        div.draggable=false;
        container.appendChild(div)
    container.style.gridTemplateColumns="repeat(" + number +", 1fr)"
}}
input.addEventListener("input",function(){
    label.textContent=input.value+"x"+input.value;
})
input.addEventListener("input",function(){
    creatingDivs(input.value);
    if (isActive){
        Array.from(container.children).forEach((element)=>{element.style.border="1px solid #FB923C"})
    }
    
})