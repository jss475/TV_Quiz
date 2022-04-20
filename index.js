//Create a sample question

//test
////////////////////////Highest rating question////////////////////
const question = document.querySelector('#quiz-body h3')
const answerBody = document.querySelector('#answer-body')
const modal = document.querySelector('.modal')
const startButton = document.querySelector('#start-button')
const closeButton = document.querySelector(".close-button");
const message = document.querySelector("#message")
const quizBody = document.querySelector('#quiz-body')
const modalContent = document.querySelector('.modal-content')

const ratingArray = []
const showNameArray = []
const genreArray = []
const imageArray = []
const showIdArray = []
const premiereArray = []
const loseIMG = document.createElement('img')
modalContent.append(loseIMG)

//////////////////////FETCH DATA FROM THE API/////////////////////////
fetch('https://api.tvmaze.com/shows')
.then(res => res.json())
.then(shows => {
    shows.forEach(show => {
        showIdArray.push(show.id)
        ratingArray.push(show.rating.average)
        showNameArray.push(show.name)
        genreArray.push(show.genres)
        imageArray.push(show.image.original)
        premiereArray.push(show.premiered)
    })
})
////////////////////////////////////////////////////


let clickCount = 0
let p = document.querySelector('p')
let points = 0
p.textContent = `Points: ${points}`



//function to toggle the visibility of the pop up
function toggleModal() {
    modal.classList.toggle("show-modal");
}

//add event listener for the close button on the pop up message
closeButton.addEventListener('click',() => {
    toggleModal()
})

//add event listener on the start/next button
startButton.addEventListener('click', () => {
    if(points < 2){
        if(points === 0){
            //hide the name submit 
            winnerBox.style.visibility = 'hidden'
        }
        //increment for each click
        clickCount += 1
        //populate content of the inital question
        startButton.textContent = 'Next'
        question.textContent = 'Which TV show has the highest rating?'
        //run function to pull ratings for the two shows
        pullRatings()
        //hide
    }
    //if you hit 5 in a row on the ratings questions you go to the final question
    if (points === 2) {
        //hide the start button
        startButton.style.visibility = 'hidden'
        /////////////////////////CREATE SECOND QUESTION////////////////////////
        //RNG a show
        let index = Math.floor(Math.random()*showIdArray.length)
        //create form to handle submit of typed in answer
        const form = document.createElement('form')
        form.id = "answer-form"
        //create input field to enter text
        const inputText = document.createElement('input')
        inputText.id = "input-text"
        inputText.type = "text"
        inputText.placeholder = "Type in your answer :)"
        form.append(inputText)
        //create input field to click submit button
        const inputSubmit = document.createElement('input')
        inputSubmit.id = "answer-submit"
        inputSubmit.type = "submit"
        inputSubmit.textContent = "SUBMIT"
        form.append(inputSubmit)
        //change text of h3 content
        const h3 = document.querySelector('#quiz-body h3')
        h3.textContent = 'What year did this show premiere?'
        //change image to have image appear
        const img = document.querySelector('#tv-image')
        img.src = imageArray[index]
        //add form before the br
        let br = document.querySelector('#quiz-body br')
        quizBody.insertBefore(form,br)
        //get year the show premiered
        let premiereYear = premiereArray[index]
        premiereYear = premiereYear.slice(0,4)
        console.log(premiereYear)
 
        //add event listener to the submit button and check if correct
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            
            if (+e.target['input-text'].value === +premiereYear) {
                toggleModal()
                loseIMG.src = ''
                winnerBox.style.visibility = 'visible'
                message.textContent = 'YOU WIN, add your name to the list of winners!'
                startButton.textContent = 'RESTART'
                points = 0
                p.textContent = `Points: ${points}`
                form.remove()
                document.querySelector('#tv-image').src = ''
                question.textContent = 'Please click RESTART'
            } else if (+e.target['input-text'].value !== +premiereYear) {
                toggleModal()
                message.textContent = ''
                loseIMG.src = 'YOU_FAIL.jpg'
                loseIMG.width = '350'
                startButton.textContent = 'RESTART'
        
                points = 0
                p.textContent = `Points: ${points}`
                form.remove()
                document.querySelector('#tv-image').src = ''
                question.textContent = 'Please click RESTART'
            }
            startButton.style.visibility = 'visible'
        })
    }

})




//function to pull ratings of the shows
function pullRatings(){
        
        let a = Math.floor(Math.random()*showIdArray.length)
        let b = Math.floor(Math.random()*showIdArray.length)
        while(ratingArray[a] === null || ratingArray[b] === null) {
            a = Math.floor(Math.random()*showIdArray.length)
            b = Math.floor(Math.random()*showIdArray.length)

        }
        while(ratingArray[a] === ratingArray[b]) {
            b = Math.floor(Math.random()*showIdArray.length)
        }
        
        const buttonOne = document.createElement('button')
        buttonOne.className = 'btn'
        const imgOne = document.createElement('img')
        imgOne.height = '250'
        imgOne.src = imageArray[a]
        buttonOne.append(imgOne)
        console.log(showNameArray[a])

        const buttonTwo = document.createElement('button')
        buttonTwo.className = 'btn'
        const imgTwo = document.createElement('img')
        imgTwo.height = '250'
        imgTwo.src = imageArray[b]
        buttonTwo.append(imgTwo)
        console.log(showNameArray[b])
        answerBody.append(buttonOne, buttonTwo)


        ///MOUSEOVER EVENT///////
        const btns = document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = header.style.background
            })
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'white'
            })

        })
        


        //////BUTTON CLICK////////////////
        buttonOne.addEventListener('click', (e) => {
            if (ratingArray[a] > ratingArray[b]) {
                points ++
                p.textContent = `Points: ${points}`
                toggleModal()
                if(points === 2) {
                    loseIMG.src = ''
                    message.textContent = 'CONGRATS, Continue to the final question'
                    question.textContent = 'Please click Next'
                } else {
                    loseIMG.src = ''
                    message.textContent = 'CORRECT'
                    question.textContent = 'Please click Next'
                }
                
            } else {
                question.textContent = 'Please click RESTART'
                startButton.textContent = 'RESTART'
                loseIMG.src = ''
                points = 0
                p.textContent = `Points: ${points}`
                toggleModal()
                message.textContent = ''
                // const loseIMG = document.createElement('img')
                loseIMG.src = 'game-over-v1.jpg'
                loseIMG.width = '350'
                
            }
            buttonOne.remove()
            buttonTwo.remove()
        })

        buttonTwo.addEventListener('click', (e) => {
            if (ratingArray[b] > ratingArray[a]) {
                points++
                p.textContent = `Points: ${points}`
                toggleModal()
                if(points === 2) {
                    loseIMG.src = ''
                    message.textContent = 'CONGRATS, Continue to final questions'
                    question.textContent = 'Please click Next'
                } else {
                    loseIMG.src = ''
                    message.textContent = 'CORRECT'
                    question.textContent = 'Please click Next'
                }
            } else {
                question.textContent = 'Please click RESTART'
                startButton.textContent = 'RESTART'
                loseIMG.src = ''
                points = 0
                p.textContent = `Points: ${points}`
                toggleModal()
                message.textContent = ''
                
                loseIMG.src = 'game-over-v1.jpg'
                // loseIMG.height = 'auto'
                loseIMG.width = '350'
                // modalContent.append(loseIMG)


            }
            buttonOne.remove()
            buttonTwo.remove()
        })
        //////////////////////////
    }
///////////////////////////////////////////////////



//////WINNERS BOARD//////
const winnerBox = document.querySelector('#name-box')
const winnerList = document.querySelector('#winner-list')
const url = 'http://localhost:3000/winners'

fetch(url)
.then(res => res.json())
.then(winners => winners.forEach(winner => populateList(winner)))

const populateList = (winner) => {
    const li = document.createElement('li')
    li.textContent = winner.name
    winnerList.append(li)
}



winnerBox.addEventListener('submit', (e) => {
    e.preventDefault()
    const newName = e.target.name.value

    fetch(url, {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name : newName,

        }),
    })
    .then(res => res.json())
    .then(data => populateList(data))

    winnerBox.reset()
})

/////////////////////////////////////////////

////////////////    CHANGE COLOR OF THE HEADER BACKGROUND BY RNG ////////////
const hexNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
const changeBtn = document.querySelector('#change-color')
const header = document.querySelector('header')
changeBtn.addEventListener('click', getHex)
function getHex() {
    let hexCol = "#";
    for(let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random()* hexNumbers.length);
        hexCol += hexNumbers[random];
    }
    header.style.background = hexCol;
};
///////////////////////////////////////