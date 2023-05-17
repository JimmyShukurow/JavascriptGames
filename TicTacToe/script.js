const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text");
replayBtn = resultBox.querySelector("button");


window.onload = ()=> {

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () =>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show")
    }
    selectOBtn.onclick = () =>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
}
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;


function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"><i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"><i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign)
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelaytime = ((Math.random()*1000)+200).toFixed();

    setTimeout(()=> {
        bot(runBot)
    },randomDelaytime)
}


function bot(runBot){
    if (runBot) {
        playerSign = "O"
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }        
        }
        let randomBox = array[Math.floor(Math.random()*array.length)];
        if (array.length > 0 ) {
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"><i>`;
                players.classList.remove("active");
                playerSign="X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"><i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
        selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none"
        playBoard.style.pointerEvents = "auto";
        playerSign="X";
    }

}

function getId(idName){
    return document.querySelector(".box" + idName).id;
}

function checkIds(val1, val2, val3, sign){
    if(getId(val1)==sign && getId(val2) == sign && getId(val3) == sign){
        return true;
    }
}

function selectWinner() {
    if( checkIds(1,2,3, playerSign) ||
        checkIds(4,5,6, playerSign) ||
        checkIds(7,8,9, playerSign) || 
        checkIds(1,4,7, playerSign) || 
        checkIds(2,5,8, playerSign) || 
        checkIds(3,6,9, playerSign) ||
        checkIds(1,5,9, playerSign) ||
        checkIds(3,5,7, playerSign) )
        {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);

            wonText.innerHTML = `Player <p> ${playerSign} </p> won the game!`
        }else {
            if (getId(1) != "" &&
                getId(2) != "" &&
                getId(3) != "" &&
                getId(4) != "" &&
                getId(5) != "" &&
                getId(6) != "" &&
                getId(7) != "" &&
                getId(8) != "" &&
                getId(9) != "") 
            {
                runBot = false;
                bot(runBot);
                setTimeout(() => {
                    playBoard.classList.remove("show");
                    resultBox.classList.add("show");
                }, 700);
    
                wonText.innerHTML = `Match has been drawn!`
            }
        }
}

replayBtn.onclick = ()=> {
    window.location.reload();
}
