//Create a sample question


////////////////////////Highest rating question////////////////////
const answerOne = document.querySelector('#imageAns1')
const answerTwo = document.querySelector('#imageAns2')
const answerThree = document.querySelector('#answer3')
const answerFour = document.querySelector('#answer4')
const quizBody = document.querySelector('#quiz-body')
const question = document.querySelector('#quiz-body h3')
const answerBody = document.querySelector('#answer-body')

const ratingArray = []
const showNameArray = []
const genreArray = []
const imageArray = []
const premiereArray = []


const showIdArray = []
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

// console.log(showIdArray)
// console.log(ratingArray)
// console.log(showNameArray)
// console.log(genreArray)
// console.log(imageArray)





const startButton = document.querySelector('#start-button')
let clickCount = 0

startButton.addEventListener('click', () => {
    if(clickCount === 0){
        firstQ()
    }else if (clickCount === 1){
            //////////////////////////CREATE SECOND QUESTION////////////////////////

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
        debugger
        //add event listener to the submit button
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        })
    }
})

/////function to start first question//////////ß
function firstQ(){
    clickCount += 1
    startButton.textContent = 'Next'
    question.textContent = 'Which TV show has the highest rating?'
    pullRatings()
}



////PULL RATINGS FUNCTION///////
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
    const imgOne = document.createElement('img')
    imgOne.height = '250'
    imgOne.src = imageArray[a]
    buttonOne.append(imgOne)
    console.log(showNameArray[a])

    const buttonTwo = document.createElement('button')
    const imgTwo = document.createElement('img')
    imgTwo.height = '250'
    imgTwo.src = imageArray[b]
    buttonTwo.append(imgTwo)
    console.log(showNameArray[b])
    answerBody.append(buttonOne, buttonTwo)

    buttonOne.addEventListener('click', (e) => {
        if (ratingArray[a] > ratingArray[b]) {
            console.log('correct')
        } else {
            console.log('wrong')
        }
        console.log(ratingArray[a])
        setTimeout(function(){
            buttonOne.remove()
            buttonTwo.remove()
        },2000)
    })

    buttonTwo.addEventListener('click', (e) => {
        if (ratingArray[b] > ratingArray[a]) {
            console.log('correct')
        } else {
            console.log('wrong')
        }
        console.log(ratingArray[b])
        setTimeout(function(){
            buttonOne.remove()
            buttonTwo.remove()
        },2000)
    })
}