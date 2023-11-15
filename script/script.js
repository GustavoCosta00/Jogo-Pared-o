let player = document.getElementById("player");
let ballGame = document.getElementById("ball");
let position = 600;
let positionBall = 600;
let top_position = 50;
let document_body = document.getElementById("body");
let timerColision;
let right;
let left;
let right_left = Math.floor(Math.random() * 2);
let movementRandom = Math.floor(Math.random() * 10);
let clearTimer = ball();


// INICIALIZAÇÃO DA MOVIMENTAÇÃO DO BLOCO
document.addEventListener("keydown", function (e) {
    movement(e.key);
});

// MOVIMENTAÇÃO DO BLOCO
function movement(key) {
    switch (key) {
        case "ArrowRight":
            position += 10;
            player.style.left = position + "px";
            break;

        case "ArrowLeft":
            position -= 10;
            player.style.left = position + "px";
            break;
        default:
            break;
    }
}

// MOVIMENTAÇÃO INICIAL DA BOLA
function ball() {
    let timer = setInterval(() => {
        top_position += 10
        ballGame.style.top = top_position + "px";

        if (right_left == 0) {
            // Mova para a direita
            positionBall += 5;
            ballGame.style.left = positionBall + "px";
        } else {
            // Mova para a esquerda
            positionBall -= 5;
            ballGame.style.left = positionBall + "px";
        }

        colide();
    }, 50);
    return timer;
}


// SISTEMA DE COLISÃO
function colide() {
    let playerRect = player.getBoundingClientRect();
    let ballRect = ballGame.getBoundingClientRect();

    if (
        ballRect.bottom >= playerRect.top &&
        ballRect.top <= playerRect.bottom &&
        ballRect.right >= playerRect.left &&
        ballRect.left <= playerRect.right
    ) {
        clearInterval(clearTimer); 
        clearInterval(timerColision);
        return returnBall();
    }

    if (ballRect.top <= 0) {
        clearInterval(clearTimer); 
        clearInterval(timerColision);
        return randomMovementBall();
    }

    if(ballRect.bottom >= window.innerHeight) {
        clearInterval(clearTimer); 
        clearInterval(timerColision);
        alert("Você perdeu um ponto! O jogo vai começar novamente!")
        location.reload();
    }

    if(ballRect.left <= 0) {
        clearInterval(clearTimer); 
        clearInterval(timerColision);
        reverseDirection()
    }

    if(ballRect.right >= window.innerWidth ){
        clearInterval(clearTimer); 
        clearInterval(timerColision);
        reverseDirection()
    }

}

function reverseDirection(){
    if(right_left == 1 ){
        right_left = 0
    }else if(right_left == 0){
        right_left = 1
    }
    clearTimer = ball()
}

// SISTEMA PARA FAZER A BOLA VOLTAR CASO TENHA COLIDIDO COM O BLOCO
function returnBall() {
    timerColision = setInterval(() => {
        top_position -= 10;
        ballGame.style.top = top_position + "px";

        if (right_left == 0) {
            // Mova para a direita
            positionBall += 5;
            ballGame.style.left = positionBall + "px";
        } else {
            // Mova para a esquerda
            positionBall -= 10;
            ballGame.style.left = positionBall + "px";
        }
        colide();
    }, 50);
}

// SISTEMA DE COLISÃO QUANDO A BOLA BATE EM ALGUM CANTO DA TELA
function randomMovementBall() {
    clearTimer = ball()
}

