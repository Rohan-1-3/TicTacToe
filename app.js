
const startButton = document.querySelector(".start-game");
const contentDiv1 = document.querySelector(".player-one");
const contentDiv2 = document.querySelector(".player-two");
const contentDivGif = document.querySelector(".gif");
const mainGameDiv = document.querySelector(".game");

const mainGame= (()=>{
    const removeElements = ()=> {
        contentDiv1.remove();
        contentDiv2.remove();
        contentDivGif.remove();
    }

    const newDivCreation = ()=>{
        for(let i=1;i<=3;i+=1){
            const newDiv = document.createElement("div");
            newDiv.classList.add(`div-${i}`)
            mainGameDiv.appendChild(newDiv);
        }
    }

    const createGameDiv = ()=>{
        const gameContainer = document.querySelector(".div-2");
        gameContainer.classList.add("game-container");
        for(let j=0;j<9;j+=1){
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-item")
            gameContainer.appendChild(gameDiv);
        }
    }


    const playingGameAgain = (hello)=>{
        hello.textContent = "O";
    }
    const playingGame = ()=>{
        const select = document.querySelectorAll(".game-item");
        select.forEach((block)=>{
            block.addEventListener("click", ()=>{
                playingGameAgain(block);
            })
        })
    }

    return {removeElements, newDivCreation, createGameDiv, playingGame}
})();

startButton.addEventListener("click", ()=>{
    mainGame.removeElements();
    mainGame.newDivCreation();
    mainGame.createGameDiv();
    mainGame.playingGame();
})