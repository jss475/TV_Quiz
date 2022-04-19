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

const ratingArray = []
const showNameArray = []
const genreArray = []
const imageArray = []
const showIdArray = []
const premiereArray = []

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
    if(points < 5){
        //increment for each click
        clickCount += 1
        //populate content of the inital question
        startButton.textContent = 'Next'
        question.textContent = 'Which TV show has the highest rating?'
        //run function to pull ratings for the two shows
        pullRatings()
    }
    //if you hit 5 in a row on the ratings questions you go to the final question
    if (points === 5) {
        startButton.remove()
        /////////////////////////CREATE SECOND QUESTION////////////////////////
        //RNG a show
        let index = Math.ceil(Math.random()*showIdArray.length)
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
                message.textContent = 'YOU WIN'
            } else if (+e.target['input-text'].value !== +premiereYear) {
                toggleModal()
                message.textContent = 'YOU LOSE'
            }
        })
    }

})




//function to pull ratings of the shows
function pullRatings(){
        
        let a = Math.ceil(Math.random()*showIdArray.length)
        let b = Math.ceil(Math.random()*showIdArray.length)
        while(ratingArray[a] === null || ratingArray[b] === null) {
            a = Math.ceil(Math.random()*showIdArray.length)
            b = Math.ceil(Math.random()*showIdArray.length)

        }
        while(ratingArray[a] === ratingArray[b]) {
            b = Math.ceil(Math.random()*showIdArray.length)
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

        const btns = document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'magenta'
            })
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'white'
            })

        })
        



        buttonOne.addEventListener('click', (e) => {
            if (ratingArray[a] > ratingArray[b]) {
                points ++
                p.textContent = `Points: ${points}`
                toggleModal()
                if(points === 5) {
                    message.textContent = 'CONGRATS, Continue to the final question'
                } else {
                    message.textContent = 'CORRECT'
                }
                
            } else {
                points = 0
                p.textContent = `Points: ${points}`
                toggleModal()
                message.textContent = 'INCORRECT'
            }
            buttonOne.remove()
            buttonTwo.remove()
        })

        buttonTwo.addEventListener('click', (e) => {
            if (ratingArray[b] > ratingArray[a]) {
                points++
                p.textContent = `Points: ${points}`
                toggleModal()
                if(points === 5) {
                    message.textContent = 'CONGRATS, Continue to final questions'
                } else {
                    message.textContent = 'CORRECT'
                }
            } else {
                points = 0
                p.textContent = `Points: ${points}`
                toggleModal()
                message.textContent = 'INCORRECT'

            }
            buttonOne.remove()
            buttonTwo.remove()
        })
    }



