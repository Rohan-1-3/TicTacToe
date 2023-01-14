
const startButton = document.querySelector(".start-game");
const contentDiv1 = document.querySelector(".player-one");
const contentDiv2 = document.querySelector(".player-two");
const contentDivGif = document.querySelector(".gif");
const mainGameDiv = document.querySelector(".game");
const gameTools = ["sth","ath"];
const playerOneName = document.querySelector("#player-one-input");
const playerTwoName = document.querySelector("#player-two-input");
const resetRound = document.querySelector(".reset-round");
const resetGame = document.querySelector(".reset-game");
const header = document.querySelector("#header");
const circleImage = document.createElement("img");
const crossImage = document.createElement("img");
circleImage.src = "./images/circel.png"
crossImage.src = "./images/cross.png"
const gameStatusDisplay = document.createElement("h1");

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
        for(let j=1;j<=9;j+=1){
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-item")
            gameDiv.classList.add(j)
            gameDiv.id = j;
            gameContainer.appendChild(gameDiv);
        }
    }

    const getScoreCard = ()=>{
        const scoreCardOne = document.querySelector(".div-1");
        const scoreCardTwo = document.querySelector(".div-3");
        const scoreCardOneName = document.createElement("h3");
        const scoreCardTwoName = document.createElement("h3");
        scoreCardOneName.textContent = playerOneName.value.toUpperCase();
        scoreCardTwoName.textContent = playerTwoName.value.toUpperCase();
        scoreCardTwo.append(scoreCardTwoName);
        scoreCardOne.append(scoreCardOneName);
        scoreCardTwo.append(crossImage);
        scoreCardOne.append(circleImage);
    }

    const decideWinner = ()=>{
        const winner = gameTools[gameTools.length-1];
        return winner === "o" ?`${playerOneName.value} Wins` 
        : `${playerTwoName.value} Wins`
    }

    const removePadding = ()=>{
        if(mainGameDiv.childElementCount === 4){
            mainGameDiv.lastChild.remove();
        }
        const help = document.querySelector(".div-1");
        const help2 = document.querySelector(".div-3");
        help.classList.remove("turn");
        help2.classList.remove("turn");
        gameTools.splice(2,gameTools.length);
        const gameContainer = document.querySelector(".div-2");
        while (gameContainer.lastElementChild) {
            gameContainer.removeChild(gameContainer.lastElementChild);
          }
        mainGameDiv.classList.remove("noclicks")
        for(let j=1;j<=9;j+=1){
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-item")
            gameDiv.classList.add(j)
            gameDiv.id = j;
            gameContainer.appendChild(gameDiv);
        }
        help.classList.add("turn");
        playingGame();
    }

    const gameWin = ()=>{
        const gamedivv = []
        for(let aa = 1;aa<=9;aa+=1){
            gamedivv.push(`${document.getElementsByClassName(`${aa}`)[0].id}`)
        }
        const a=0;
        const b=3;
        const c=6;
        if(gamedivv[a] === gamedivv[a+1] && gamedivv[a+1] === gamedivv[a+2] 
            || gamedivv[b] === gamedivv[b+1] && gamedivv[b+1] === gamedivv[b+2] 
            || gamedivv[c] === gamedivv[c+1] && gamedivv[c+1] === gamedivv[c+2] 
            || gamedivv[a] === gamedivv[b] && gamedivv[b] === gamedivv[c]
            || gamedivv[a+1] === gamedivv[b+1] && gamedivv[b+1] === gamedivv[c+1]
            || gamedivv[a+2] === gamedivv[b+2] && gamedivv[b+2] === gamedivv[c+2]
            || gamedivv[a] === gamedivv[b+1] && gamedivv[b+1] === gamedivv[c+2]
            || gamedivv[a+2] === gamedivv[b+1] && gamedivv[b+1] === gamedivv[c]){
            gameStatusDisplay.style.position = "absolute";
            gameStatusDisplay.textContent = decideWinner();
            gameStatusDisplay.classList.add("game-status");
            mainGameDiv.appendChild(gameStatusDisplay);
            mainGameDiv.classList.add("noclicks");
            return 0;
        }
        if(gameTools.length === 11){
            const gameStatusDisplay = document.createElement("h1");
            gameStatusDisplay.style.position = "absolute";
            gameStatusDisplay.textContent = "Its a draw";
            mainGameDiv.appendChild(gameStatusDisplay);
            mainGameDiv.classList.add("noclicks");
            return 0;
        }
        return 0;
    };

    const playingGameAgainO = block =>{
        const img = document.createElement("img");
        img.src= "./images/circel.png";
        img.style.margin = "0";
        block.id = "o";
        block.style.padding = "10px";
        block.appendChild(img);
        gameTools.push("o");
        gameWin();
    }

    const playingGameAgainX = block =>{
        const img = document.createElement("img");
        img.src= "./images/cross.png";
        img.style.margin = "0"
        block.id = "x";
        block.style.padding = "10px";
        block.appendChild(img);
        gameTools.push("x");
        gameWin();
    }

    const playingGame = ()=>{
        const select = document.querySelectorAll(".game-item");
        select.forEach((block)=>{
            block.addEventListener("click", ()=>{
                const help = document.querySelector(".div-1");
                const help2 = document.querySelector(".div-3");
                if(block.id !== "o" && block.id !== "x"){
                    if(help.classList[1] === "turn"){
                        console.log(help.classList[1])
                        help.classList.remove("turn");
                        help2.classList.add("turn");
                    }
                    else if (help2.classList[1] === "turn"){
                        help2.classList.remove("turn");
                        help.classList.add("turn");
                    }
                    if(gameTools.length % 2 === 0){
                        playingGameAgainO(block);
                    }
                    else{
                        playingGameAgainX(block);
                    }
                }
            })
        })
    }

    return {removeElements, newDivCreation, 
        createGameDiv, playingGame, 
        getScoreCard, removePadding}
})();

const gameStart = ()=>{

    if(playerOneName.value !== "" && playerTwoName.value !== ""){
            mainGame.removeElements();
            mainGame.newDivCreation();
            mainGame.createGameDiv();
            mainGame.playingGame();
            mainGame.getScoreCard();
            resetRound.disabled = false;
            header.classList.add("header");
            const help = document.querySelector(".div-1");
            help.classList.add("turn")
    }
    else{
        playerOneName.placeholder = "Enter Both Name";
        playerTwoName.placeholder = "Enter Both Name";
    setInterval(()=>{
        playerOneName.placeholder = "";
        playerTwoName.placeholder = "";
    },3000)
    }
}

startButton.addEventListener("click", gameStart)

resetGame.addEventListener("click", ()=>{
    location.reload()
});

resetRound.addEventListener("click", ()=>{
    mainGame.removePadding();
})

resetRound.disabled = true;