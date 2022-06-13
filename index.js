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

const replaceChar = (origString, replaceChar, index)=>{
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

const setRandomWord = async ()=>{
    let res = await fetch('https://random-word-api.herokuapp.com/word');
    let data = await res.json();
    questionWord = data[0].toUpperCase();
    console.log(questionWord)
    return questionWord;
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

handleAnswerBlock();

createLetterBtns();








