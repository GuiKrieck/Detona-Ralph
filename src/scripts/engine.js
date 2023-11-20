const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector('#life')
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        life: 3,
    },
    actions:{
        timerId:  setInterval(randomSquare, 1000),
        countdownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;


    if(state.values.currentTime < 0){
        clearInterval(state.actions.countdownTimerId);
        clearInterval(state.actions.timerId);
        gameOver();
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}
function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });
    //a função acima vai remover a classe enemy da do quadrado atual

    //abaixo selecionamos um novo quadrado randomicamente, e adicionamos a ele a
    //classe enemy
    let randomNumber = Math.floor(Math.random() * 9 );
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result ++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            } else {
                state.values.life--;
                state.view.life.textContent = (`x${state.values.life}`);
                if(state.values.life < 0){
                    gameOver();
                }

            }
        })
    })
}

function gameOver(){
    alert(`Game over! O seu resultado foi: ${state.values.result}! Clique em okay para reiniciar!`);
    restart();
}

function restart(){
   state.values.hitPosition = 0;
   state.values.result = 0;
   state.values.currentTime = 60;
   state.values.life = 3;
   state.view.score.textContent = state.values.result;
   state.view.life.textContent = (`x${state.values.life}`);
   state.view.timeLeft.textContent = state.values.currentTime;
   
}

function init(){
addListenerHitBox();
}

init();