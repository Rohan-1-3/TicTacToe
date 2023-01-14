
const startButton = document.querySelector(".start-game");
const contentDiv1 = document.querySelector(".player-one");
const contentDiv2 = document.querySelector(".player-two");
const contentDivGif = document.querySelector(".gif");
const mainGameDiv = document.querySelector(".game");
const gameTools = ["sth","ath"];

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
        // const someImg = document.createElement("img")
        // someImg.classList.add("outline");
        // someImg.src = "./images/Screenshot_20230113_094743.png";
        // gameContainer.appendChild(someImg)
        for(let j=1;j<=9;j+=1){
            const gameDiv = document.createElement("div");
            gameDiv.classList.add("game-item")
            gameDiv.classList.add(j)
            gameDiv.id = j;
            gameContainer.appendChild(gameDiv);
        }
    }

    const gameWin = ()=>{
        const gamediv1 = document.getElementsByClassName("1")[0].id;
        const gamediv2 = document.getElementsByClassName("2")[0].id;
        const gamediv3 = document.getElementsByClassName("3")[0].id;
        const gamediv4 = document.getElementsByClassName("4")[0].id;
        const gamediv5 = document.getElementsByClassName("5")[0].id;
        const gamediv6 = document.getElementsByClassName("6")[0].id;
        const gamediv7 = document.getElementsByClassName("7")[0].id;
        const gamediv8 = document.getElementsByClassName("8")[0].id;
        const gamediv9 = document.getElementsByClassName("9")[0].id;
        const gamedivv = [gamediv1, gamediv2, gamediv3, gamediv4, gamediv5
            , gamediv6, gamediv7, gamediv8, gamediv9]
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
            alert("win");
            return 0;
        }
        if(gameTools.length === 11){
            alert("draw");
        }

    }

    const playingGameAgainO = block =>{
        const img = document.createElement("img");
        img.src= "./images/circel.png";
        img.style.margin = "0"
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
                if(block.id !== "o" || block.id !== "x"){
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

    return {removeElements, newDivCreation, createGameDiv, playingGame}
})();

startButton.addEventListener("click", ()=>{
    mainGame.removeElements();
    mainGame.newDivCreation();
    mainGame.createGameDiv();
    mainGame.playingGame();
})
