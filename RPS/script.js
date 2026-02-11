let humanScore = 0;
let computerScore = 0;
const btnRock=document.querySelector("#rock");
const btnPaper=document.querySelector("#paper");
const btnScissors=document.querySelector("#scissors");
const container=document.createElement("div");
container.style.margin="20px"
const body=document.getElementById("body")
body.appendChild(container);
function getComputerChoice() {
  const r = Math.random();
  if (r < 0.33) return "rock";
  if (r < 0.67) return "paper";
  return "scissors";
}
function playRound(human, computer) {
  if (
    (human === "rock" && computer === "paper") ||
    (human === "paper" && computer === "scissors") ||
    (human === "scissors" && computer === "rock")
  ) {
      container.innerText=`You lost! ${computer} beats ${human} \n`;
      computerScore++;
  } else if (human === computer) {
      container.innerText="Draw! \n";
      computerScore++;
      humanScore++;
  } else {
      container.innerText=`You won! ${human} beats ${computer} \n`;
      humanScore++;
  }
}
let array=[btnRock,btnPaper,btnScissors];
console.log(array)
array.forEach(function(element){
    element.addEventListener("click",function(e){
      let computer=getComputerChoice()
      playRound(e.target.id,computer);
      container.innerText+=`The score is ${humanScore}:${computerScore}`;
      if(humanScore==5){
        container.innerText="You won!!!!";
        computerScore=0;
        humanScore=0;
      }
      else if(computerScore==5){
        container.innerText="Computer won :(((";
        computerScore=0;
        humanScore=0;
      }
    })}
)