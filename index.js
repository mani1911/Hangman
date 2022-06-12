const normalBtn = document.querySelector('.normal');
const dualBtn = document.querySelector('.dual');
const buttonsContainer = document.querySelector('.buttons');
const answerBlock = document.querySelector('.answer');
const wrongCount = document.querySelector('.wrongCount');
const image = document.querySelector('img');

let wrongs = 0;
let questionWord = "";
let maxWrong = 6;
let answer = "";

const setRandomWord = async ()=>{
    let res = await fetch('https://random-word-api.herokuapp.com/word');
    let data = await res.json();
    questionWord = data[0].toUpperCase();
    console.log(questionWord)
    return questionWord;
}

const checkLetter = (l)=>{
    if(questionWord.includes(l)){
        
    }
    else{
        wrongs++;
        wrongCount.innerHTML = wrongs;
        image.src = `images/${wrongs}.jpg`;

    }
}

const createLetterBtns = ()=>{
    let buttons = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    for(let letter of buttons){
        let newBtn = document.createElement('button');
        newBtn.innerHTML = letter;
        newBtn.classList.add('letterBtns');
        buttonsContainer.appendChild(newBtn);
        newBtn.addEventListener('click', ()=>{
            checkLetter(newBtn.innerHTML);
            newBtn.disabled = true;
        })
    }
}

const handleAnswerBlock = async ()=>{
    questionWord = await setRandomWord();
    for(let i in questionWord){
        answerBlock.innerHTML += " __"
    }
}

createLetterBtns();
handleAnswerBlock();








