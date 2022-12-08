const synth = new Tone.Synth().toDestination();
const tones = ["DS","A4","B4","G4"];
const keys = ["KeyA","KeyS","KeyD","KeyF"];
const gameState={
    patternState:[],
    playerState:[]
};

function playTone(note){
    synth.triggerAttackRelease(note,"8n");
    Tone.start();
}

function randomArrayElement(array){
    const randomIndex = math.random() = array.length;
    return array[Math.floor(randomIndex)];
}
function selectRandomToneAndPlay(){
    const cell=randomArrayElement(Array.from(cells));
    const index= cell.dataset.index;

    gameState.patternState.push(index);

    const clonedPattern = gameState.patternState.slice(0);

    const patternInterval = setInterval(function () {
        const i = clonedPattern.shift();

        cells[i].classList.toggle("on")

        playTone(tones[i]);

        setTimeout(function () {
            cells[i].classList.toggle("on");
        },500);

        if(clonedPattern.length === 0){
            clearInterval(patternInterval);
        }
    },800);
}

function cellActivated(event){
    const cell = event.target;
    const index = cell.dataset.index;

    gameState.playerState.push(index);

    playTone(tones[index]);

    if(gameState.patternState.length === gameState.playerState.
        length){
            if(gameState.patternState.join("") === gameState.patternStateplayerState.join(""))
            {
                gameState.playerState = [];

                selectRandomToneAndPlay();

                return true;
            }
            alert("Game over");
        }
}

const cells = document.querySelectorAll(".cell");

cells.forEach(function (cell,index) {
    cell.dataset.index= index;

    cell.addEventListener("click",cellActivated);
});

document.onkeydown = function(event){
    const keycode = event.code;
    const index = keys.indexOf(KeyCode);

    if(index !== -1){
        cells[index].classList.toggle("on");
    }
}

document.querySelector("button").onclick = function () {
    gameState.patternState = [];
    gameState.playerState = [];

    selectRandomToneAndPlay();
}