// defining some basic variables
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

// creating a module for all the functions
const mainGame= (()=>{
    // creates space for playing the game
    const createGameDiv = ()=>{
        const gameContainer = document.querySelector(".div-2");
        gameContainer.classList.add("game-container");
        for(let j=1;j<=9;j+=1){
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-item")
            gameDiv.classList.add(j);
            gameDiv.id = j;// different ID for different div inside the game container
            gameContainer.appendChild(gameDiv);
        }
    }
    // creates new div for Game and Score Card
    const newDivCreation = ()=>{
        for(let i=1;i<=3;i+=1){
            const newDiv = document.createElement("div");
            newDiv.classList.add(`div-${i}`)
            mainGameDiv.appendChild(newDiv);
        }
        createGameDiv();
    }
    // checks gameTools array's last element inorder to decide which won
    const decideWinner = ()=>{
        const winner = gameTools[gameTools.length-1];
        return winner === "o" ?`${playerOneName.value} Wins` 
        : `${playerTwoName.value} Wins`
    }
    // checking if someone has won yet or not
    const checkGameWinner = ()=>{
        const gameDivsId = [];
        for(let aa = 1;aa<=9;aa+=1){ // takes id of each div in gameContainer and pushes in game
            gameDivsId.push(`${document.getElementsByClassName(`${aa}`)[0].id}`);
        }
        const a=0;
        const b=3;
        const c=6;
        // condition for winner and draw
        if(gameDivsId[a] === gameDivsId[a+1] && gameDivsId[a+1] === gameDivsId[a+2] 
            || gameDivsId[b] === gameDivsId[b+1] && gameDivsId[b+1] === gameDivsId[b+2] 
            || gameDivsId[c] === gameDivsId[c+1] && gameDivsId[c+1] === gameDivsId[c+2] 
            || gameDivsId[a] === gameDivsId[b] && gameDivsId[b] === gameDivsId[c]
            || gameDivsId[a+1] === gameDivsId[b+1] && gameDivsId[b+1] === gameDivsId[c+1]
            || gameDivsId[a+2] === gameDivsId[b+2] && gameDivsId[b+2] === gameDivsId[c+2]
            || gameDivsId[a] === gameDivsId[b+1] && gameDivsId[b+1] === gameDivsId[c+2]
            || gameDivsId[a+2] === gameDivsId[b+1] && gameDivsId[b+1] === gameDivsId[c]){
                // displaying the winner of game 
                gameStatusDisplay.style.position = "absolute";
                gameStatusDisplay.textContent = decideWinner();
                gameStatusDisplay.classList.add("game-status");
                mainGameDiv.appendChild(gameStatusDisplay);
                // disabling all event clickers in the main div 
                mainGameDiv.classList.add("noclicks");
                return 0;
            }
        if(gameTools.length === 11){
            // displays DRAW
            gameStatusDisplay.style.position = "absolute";
            gameStatusDisplay.textContent = "Its a draw";
            mainGameDiv.appendChild(gameStatusDisplay);
            // disables events
            mainGameDiv.classList.add("noclicks");
            return 0;
        }
        return 0;
    };
    // adds circle image to the clicked div 
    const playingGameAgainO = block =>{
        const img = document.createElement("img");
        img.src= "./images/circel.png";
        img.style.margin = "0";
        block.id = "o";
        block.style.padding = "10px";
        block.appendChild(img);
        // helps for deciding the winner and increasing gameTools length
        gameTools.push("o");
        checkGameWinner();
    }
    // adds cross image to the clicked div 
    const playingGameAgainX = block =>{
        const img = document.createElement("img");
        img.src= "./images/cross.png";
        img.style.margin = "0"
        block.id = "x";
        block.style.padding = "10px";
        block.appendChild(img);
        // helps for deciding the winner and increasing gameTools length
        gameTools.push("x");
        checkGameWinner();
    }

    const playingGame = ()=>{
        const select = document.querySelectorAll(".game-item");
        select.forEach((block)=>{
            block.addEventListener("click", ()=>{
                const scoreCardOne = document.querySelector(".div-1");
                const scoreCardTwo = document.querySelector(".div-3");
                // checks if the div already has O or X in the div if not allows to add 
                if(block.id !== "o" && block.id !== "x"){
                    // shows whose turn it is to play
                    if(scoreCardOne.classList[1] === "turn"){
                        console.log(scoreCardOne.classList[1])
                        scoreCardOne.classList.remove("turn");
                        scoreCardTwo.classList.add("turn");
                    }
                    else if (scoreCardTwo.classList[1] === "turn"){
                        scoreCardTwo.classList.remove("turn");
                        scoreCardOne.classList.add("turn");
                    }
                    // checking which one to put in the div 
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
    // creates score card for both the players on either side of game container
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
        playingGame();
    }
    // removes all the element of starting page
    const removeStartingPageElements = ()=> {
        contentDiv1.remove();
        contentDiv2.remove();
        contentDivGif.remove();
        newDivCreation();
        getScoreCard();
    }
    // resets the gameContainer to the start
    const resetGameContainer = ()=>{
        if(mainGameDiv.childElementCount === 4){
            mainGameDiv.lastChild.remove(); // removing the gameStatusDisplay
        }
        // removing class for image in score card
        const scoreCardOne = document.querySelector(".div-1");
        const scoreCardTwo = document.querySelector(".div-3");
        scoreCardOne.classList.remove("turn");
        scoreCardTwo.classList.remove("turn");
        // returns back the gameTools to default
        gameTools.splice(2,gameTools.length);
        // removes the all the div in gameContainer
        const gameContainer = document.querySelector(".div-2");
        while (gameContainer.lastElementChild) {
            gameContainer.removeChild(gameContainer.lastElementChild);
        }
        // removes the class to enable back the DOM events
        mainGameDiv.classList.remove("noclicks"); 
        // creates new 9 div in gameContainer for new game
        for(let j=1;j<=9;j+=1){
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-item")
            gameDiv.classList.add(j)
            gameDiv.id = j;
            gameContainer.appendChild(gameDiv);
        }
        scoreCardOne.classList.add("turn");
        playingGame();
    }
    // returning all required functions for global access
    return {removeStartingPageElements, resetGameContainer}
})();

// starts game
const gameStart = ()=>{
    if(playerOneName.value !== "" && playerTwoName.value !== ""){// checks if both the players name is entered
            mainGame.removeStartingPageElements();
            resetGame.disabled = false;
            header.classList.add("header");
            const scoreCardOne = document.querySelector(".div-1");
            scoreCardOne.classList.add("turn");// initial turn showing of circle
    }
    else{ // gives warning for blank name 
        playerOneName.placeholder = "Enter Both Name";
        playerTwoName.placeholder = "Enter Both Name";
    setTimeout(()=>{ // removes warning after 3sec
        playerOneName.placeholder = "";
        playerTwoName.placeholder = "";
    },3000);
    }
}

startButton.addEventListener("click", gameStart); // game starting button event

resetGame.addEventListener("click", ()=>{
    location.reload() // resets the whole game to point 0
});

resetRound.addEventListener("click", ()=>{
    mainGame.resetGameContainer(); // resets the game to point after entering name
});