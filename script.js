let container = document.querySelector("#container"); //armazena a variável chamada "container"//
let player = document.querySelector("#player"); //armazena a variável chamada "player"//
let block = document.querySelector("#block"); //armazena a variável chamada "block"//
let road = document.querySelector("#road"); //armazena a variável chamada "road"//

let score = document.querySelector("#score"); //armazena a variável chamada "score"//
let gameOver = document.querySelector("#gameOver"); //armazena a variável chamada "gameover"//
//seleção de elementos//

let interval = null; //Inicializa uma variável chamada "interval" com o valor nulo//
let playerScore = 0; //Inicializa uma variável chamada "playerScore" com o valor 0//
//variáveis//

let scoreCounter = () => { //função de atualização do placar//
    playerScore++; //atualiza o conteúdo do elemento com o ID "score" com o novo valor//.
    score.innerHTML = `Score <b>${playerScore}</b>`;
};

window.addEventListener("keydown", (event) => { //Quando uma tecla é pressionada, a função de seta é executada//
    if (event.code === "Space" && gameOver.style.display === "block") { //evento de "keydown" pressionar uma tecla//
        resetGame();
    } else if (event.code === "Space") {
        gameOver.style.display = "none";
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 6s linear infinite";
       
        playerScore = 0;
        interval = setInterval(scoreCounter, 20);
    } else if (event.key === "ArrowUp") { //recebe a classe "playerActive" por 500 milissegundos//
        if (!player.classList.contains("playerActive")) {
            player.classList.add("playerActive");
            setTimeout(() => {
                player.classList.remove("playerActive");
            }, 500);
        }
    }
});

let result = setInterval(() => { // verificação de colisão// //Define um intervalo que é executado a cada 10 milissegundos//
    let playerBottom = parseInt(getComputedStyle(player).getPropertyValue("bottom"));
    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    if (playerBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
       
        clearInterval(interval);
    }
}, 10);

function resetGame() { // função de reiniciação do jogo// //Oculta o elemento com o ID "gameOver"//
    gameOver.style.display = "none";
    playerScore = 0;
    score.innerHTML = `Score <b>00</b>`;
    block.style.animation = "";
    
    road.firstElementChild.style.animation = "none";
    setTimeout(() => {
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 6s linear infinite";
        
        interval = setInterval(scoreCounter, 20);
    }, 100);
}