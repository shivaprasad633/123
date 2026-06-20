const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const gameOverBox = document.getElementById("gameOver");

let score = 0;
let cactusPosition = 800;
let gameRunning = true;

document.addEventListener("keydown", function(event){
    if(event.code === "Space"){
        jump();
    }
});

function jump(){

    if(!dino.classList.contains("jump")){

        dino.classList.add("jump");

        setTimeout(()=>{
            dino.classList.remove("jump");
        },700);
    }
}

let scoreInterval = setInterval(()=>{

    if(gameRunning){
        score++;
        scoreElement.innerText = "Score: " + score;
    }

},100);

function moveCactus(){

    if(!gameRunning) return;

    cactusPosition -= 8;

    if(cactusPosition < -50){
        cactusPosition = 800;
    }

    cactus.style.left = cactusPosition + "px";

    let dinoBottom =
        parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    if(cactusPosition > 40 &&
       cactusPosition < 100 &&
       dinoBottom < 60){

        gameOver();
    }

    requestAnimationFrame(moveCactus);
}

function gameOver(){

    gameRunning = false;

    gameOverBox.style.display = "block";
}

function restartGame(){

    score = 0;
    cactusPosition = 800;

    scoreElement.innerText = "Score: 0";

    gameOverBox.style.display = "none";

    gameRunning = true;

    moveCactus();
}

moveCactus();
