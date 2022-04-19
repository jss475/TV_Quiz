//Create a sample question


////////////////////////Highest rating question////////////////////
const answerOne = document.querySelector('#imageAns1')
const answerTwo = document.querySelector('#imageAns2')
const answerThree = document.querySelector('#answer3')
const answerFour = document.querySelector('#answer4')
const question = document.querySelector('#quiz-body h3')
const answerBody = document.querySelector('#answer-body')

//let ratingArray = []
// let showArray = []
const ratingArray = []
const showNameArray = []
const genreArray = []
const imageArray = []


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
    })
})

// console.log(showIdArray)
// console.log(ratingArray)
// console.log(showNameArray)
// console.log(genreArray)
// console.log(imageArray)





const startButton = document.querySelector('#start-button')
let clickCount = 0

let p = document.querySelector('p')
let points = 0
p.textContent = `Points: ${points}`



startButton.addEventListener('click', () => {
    clickCount += 1
    console.log(clickCount)
    startButton.textContent = 'Next'
    question.textContent = 'Which TV show has the highest rating?'


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
                //let number = +points.textContent.slice(-1)
                points++
                console.log(points)
                p.textContent = `Points: ${points}`
                // number += 1
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
                //let number = +points.textContent.slice(-1)
                points++
                p.textContent = `Points: ${points}`
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

    pullRatings()

   
    
            
                    
                    // const button = document.createElement('button')
                    // button.id = `answer${i+1}`
                    // console.log(button)
                    
                    // const img = document.createElement('img')
                    // img.height = '250'
                    // img.src = data.image.original
                    // button.append(img)
                    // answerBody.append(button)

                    // let maxRating = Math.max(...ratingArray)
                    // let showIndex = ratingArray.indexOf(maxRating)
                    // const maxShow = showArray[showIndex]
                    // console.log(showArray)
                    // console.log(ratingArray)
                    // console.log(maxShow)

                    

                


                    

    
    
    


})

//initialize an array to store the ratings and show names into their own arrays
//i.e ratingArray = [10, 9, 8.5, 9.5] 10 = rating for a1, 9 = rating for a2, ....
//i.e showARray = [Glee, Pachinko, Last Kingdom, Simpsons] Glee = show name for a1, Pachinko = show name for a2




// function pullRatings(){
//     for(i = 0; i < 4; i++){
//         let a = Math.ceil(Math.random()*100)
//         fetch(`https://api.tvmaze.com/shows/${a}`)
//             .then(res => res.json())
//             .then(data => {
//                 if(data.rating.average === null){
//                     pullRatings()
//                 }
//                 ratingArray = [...ratingArray,data.rating.average]
//                 showArray = [...showArray, data.name]
//                 console.log(data.image.original)
//                 debugger
//                 imageAns1.src = data.image.original
//             })
//             .catch(error => console.log(error.message))
//     }
    
//     setTimeout(function(){
//         let maxRating = Math.max(...ratingArray)
//         let showIndex = ratingArray.indexOf(maxRating)
//         const maxShow = showArray[showIndex]
//     },1000)
// }


// pullRatings()

// if(i===0) {
//     console.log(answerOne)
//     answerOne.src = data.image.original
// } else if (i ===1) {
//     console.log(answerTwo)
//     answerTwo.src = data.image.original
//}
