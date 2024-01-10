let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// alternative turns are present in tic tac toe so first time x should come then 0 should come

let turn0 = true; //so first 0 is shown when clicked
let count = 0; //To Track Draw


const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// adding an even listner for all the boxes

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // now when clicked we should print o and x alternatively
    if (turn0) {
      // this means if turn of 0 is true
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerHTML = "X";
      turn0 = true;
    }
    // but there is one disadvantage if we click on the box again it will change value so we give this
    box.disabled = "true";
    // now to check after clicking we are geting a winner or not

    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});



const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};



const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
     let pos1Val = boxes[pattern[0]].innerText;
     let pos2Val = boxes[pattern[1]].innerText;
     let pos3Val = boxes[pattern[2]].innerText;

     if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
       if (pos1Val === pos2Val && pos2Val === pos3Val) {
         showWinner(pos1Val);
        //  one disadvantage is after x or 0 gets a win if any blocks are empty we can click and the game continues os we need to diable the button
         return true;
       }
     }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);