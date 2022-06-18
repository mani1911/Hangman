const normalBtn = document.querySelector('.normal');
const dualBtn = document.querySelector('.dual');
const buttonsContainer = document.querySelector('.buttons');
const answerBlock = document.querySelector('.answer');
const wrongCount = document.querySelector('.wrongCount');
const image = document.querySelector('img');
const resetBtn = document.querySelector('.reset');
const nmode = document.querySelector('.nmodeBoard');
const dmode = document.querySelector('.dmodeBoard');
const goBtn = document.querySelector('.goBtn');
const dualInput = document.querySelector('#dualInput');
const dualBlock = document.querySelector('.dualBlock');

let normalMode = true;
let wrongs = 0;
let questionWord = "";
let maxWrong = 6;
let answer = "";
let gameOver = false;
let normalLeaderBoard = `${maxWrong+1}`;
let dualLeaderBoard = `${maxWrong+1}`;


localStorage.normal = normalLeaderBoard;
localStorage.dual = dualLeaderBoard;

const updateLeaderBoard = (mode, wrongs)=>{
    if(mode){
        localStorage.normal+= wrongs;
        console.log(localStorage.normal)
    }
    else{
        localStorage.dual+= wrongs;
        console.log(localStorage.dual)
    }
    setLeaderBoard(mode);
}
const setLeaderBoard = (mode)=>{
    let minWrongs = maxWrong+1; 
    let str = mode?localStorage.normal:localStorage.dual;
    for(let i of str){
        if(parseInt(i) <= minWrongs){
            minWrongs = i;
        }
    }
    mode?nmode.innerHTML = `Min-Wrongs : ${minWrongs}`:dmode.innerHTML = `Min-Wrongs : ${minWrongs}`;  
}

const replaceChar = (origString, replaceChar, index)=>{
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

goBtn.addEventListener('click', (e)=>{
    normalMode = false;
    wrongs = 0;
    image.src = `images/${wrongs}.jpg`;
    wrongCount.innerHTML = wrongs;
    if(dualInput.value === ""){
        buttonsContainer.style.color = "red";
        buttonsContainer.style.fontSize = "25px";
        buttonsContainer.innerHTML = "Input is Empty";
    }
    else{
        questionWord = dualInput.value.toUpperCase();
        buttonsContainer.innerHTML = "";
        console.log(questionWord);
        console.log(normalMode)
        handleAnswerBlock(normalMode);
        createLetterBtns();
    }

    
})

const setRandomWord = async ()=>{
    let res = await fetch('https://random-word-api.herokuapp.com/word');
    let data = await res.json();
    questionWord = data[0].toUpperCase();
    return questionWord;
}

const displayAnswer = ()=>{
    answerBlock.innerHTML = "";
    for(let i of questionWord){
        answerBlock.innerHTML += ` ${i} `
    }
}

const checkLetter = (l)=>{
    if(questionWord.includes(l)){
        let ans1 = answerBlock.innerHTML;
        for(let i=0; i<questionWord.length; i++){
            ans1 = answerBlock.innerHTML;
             if(questionWord[i] == l){
                ans1 = replaceChar(ans1, l, 3*i+1);
                ans1 = replaceChar(ans1, " ", 3*i+2);
                answerBlock.innerHTML = ans1;
             }
        }
    }
    else{
        wrongs++;
        wrongCount.innerHTML = wrongs;
        image.src = `images/${wrongs}.jpg`;
    }
}

const checkWon = ()=>{
    let userAns = answerBlock.innerHTML.replace(/\s/g,'');
    if(userAns === questionWord){
        return true;
    }
}

const createLetterBtns = ()=>{
    let buttons = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    for(let letter of buttons){

        let newBtn = document.createElement('button');
        newBtn.classList.add('letrBtn')
        newBtn.innerHTML = letter;
        newBtn.classList.add('letterBtns');
        buttonsContainer.appendChild(newBtn);
        newBtn.addEventListener('click', ()=>{
            newBtn.disabled = true;
            if(wrongs === maxWrong-1 && !questionWord.includes(newBtn.innerHTML)){
                gameOver = true;
                image.src = `images/${maxWrong}.jpg`;
                console.log('Game Over');
                wrongCount.innerHTML = maxWrong;
                displayAnswer();
                buttonsContainer.style.color=  "red";
                buttonsContainer.style.fontSize = "25px";
                buttonsContainer.innerHTML = "You Lose";
                return;
            }
            checkLetter(newBtn.innerHTML);
            if(checkWon()){
                buttonsContainer.style.color = "green";
                buttonsContainer.style.fontSize = "25px";
                buttonsContainer.innerHTML = "You Won";
                updateLeaderBoard(normalMode, wrongs)
                return;
            }
        })
    }
}

const handleAnswerBlock = async (mode)=>{
    if(mode){
        questionWord = await setRandomWord();
    }
    buttonsContainer.style.display = "block";
    answerBlock.innerHTML = "";
    for(let i in questionWord){
        answerBlock.innerHTML += " __"
    }
    answerBlock.style.display = "block";
}

const startGame = ()=>{
    handleAnswerBlock(normalMode);
    createLetterBtns();
}
const reset = ()=>{
    if(normalMode){
        dualBlock.style.display = "none"
        answerBlock.style.display = "block"
        buttonsContainer.style.display = "none";
        image.src = "images/0.jpg";
        wrongs = 0;
        wrongCount.innerHTML = wrongs;
        questionWord = "";
        answer = "";
        gameOver = false;
        buttonsContainer.innerHTML = "";
        startGame();
    }
    else{
        dualInput.value = "";
        dualBlock.style.display = "block";
        answerBlock.style.display = "none";
        buttonsContainer.style.display = "none";
        image.src = "images/0.jpg";
        wrongs =0;
        wrongCount.innerHTML = wrongs;
        questionWord = "";
        answer = "";
        gameOver = false;
        buttonsContainer.innerHTML = "";
    }
    
}
startGame();
resetBtn.addEventListener('click', ()=>{
    reset();
})

normalBtn.addEventListener('click', ()=>{
    normalMode = true;
    reset();
});
dualBtn.addEventListener('click', ()=>{
    normalMode = false;
    reset();
})








