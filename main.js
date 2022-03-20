let wordE1 = document.getElementById('word');
const wrongLetterE1 = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const hintshowmsg = document.getElementById('hintmsgshow');

const figureParts = document.querySelectorAll(".figure-part");

const words = ['application', 'programming', 'interface', 'wizard', 'mobile', 'computer', 'friend', 'management', 'puzzel', 'facebook', 'love'];
const Hintwords =[];
Hintwords['application']='a formal request to be considered for a position or to be allowed to do or have something, submitted to an authority, institution, or organization.';
Hintwords['programming']=' the process of creating a set of instructions that tell a computer how to perform a task.';
Hintwords['interface']='a device or program enabling a user to communicate with a computer.';
Hintwords['wizard']='a man who is believed to have magical powers and who uses them to harm or help other people.';
Hintwords['mobile']='Something or someone that is mobile is able to move or be moved easily.';
Hintwords['computer']='a digital electronic machine that can be programmed to carry out sequences of arithmetic or logical operations (computation) automatically.';
Hintwords['friend']='fr';
Hintwords['management']='mg';
Hintwords['puzzel']='pz';
Hintwords['facebook']='fb';
Hintwords['love']='lv';
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function getHint() {
    // alert(Hintwords[selectedWord]);
    hintshowmsg.innerHTML = Hintwords[selectedWord];
    console.log(selectedWord[0]);
    var text =`
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter1">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;
    text ? wordE1.children[0].innerHTML = selectedWord[0] : wordE1.innerHTML = text;
    // console.log(a)
    // children[0].innerHTML = selectedWord[0];
    // wordE1.innerHTML = a;
}
function displayWord(){
    var text =`
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;
    wordE1.innerHTML  = text;

    // const innerWord =wordE1.innerHTML.replace( /\n/ , '');
    var correctArray=selectedWord.split('');
    var isCorrect=false;
    for (let obj of correctArray) {
        if(correctLetters.includes(obj)==false){
            isCorrect=false;
            break;
        }
        isCorrect=true;
    }
    if(isCorrect){
        finalMessage.innerHTML = 'Congratulations! you won!';
        popup.style.display= 'flex';

    }
}

// Update the wrong letters
function updateWrongLetterE1(){
    //Display wrong letters
    wrongLetterE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter =>` <span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part,index) =>{
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display ='none';

        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'unfortunately you lost.';
        popup.style.display = 'flex';
    }
}

//Show notification
function ShowNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
//Keydown letter press
window.addEventListener('keydown',e =>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        getHint()
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                // getHint();
                displayWord();
            }else{
                ShowNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetterE1();
            }else{
                ShowNotification();
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () =>{
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    console.log(selectedWord);
    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';

});

displayWord();
