//Create a sample question


////////////////////////Highest rating question////////////////////

//Fetch 4 different shows
// let a1 = Math.ceil(Math.random()*1000)
// let a2 = Math.ceil(Math.random()*1000)
// let a3 = Math.ceil(Math.random()*1000)
// let a4 = Math.ceil(Math.random()*1000)

//initialize an array to store the ratings and show names into their own arrays
//i.e ratingArray = [10, 9, 8.5, 9.5] 10 = rating for a1, 9 = rating for a2, ....
//i.e showARray = [Glee, Pachinko, Last Kingdom, Simpsons] Glee = show name for a1, Pachinko = show name for a2
let ratingArray = []
let showArray = []

let ratingObject = {}

function pullRatings(){
    for(i = 0; i < 4; i++){
        let a = Math.ceil(Math.random()*100)
        fetch(`https://api.tvmaze.com/shows/${a}`)
            .then(res => res.json())
            .then(data => {
                if(data.rating.average === null){
                    pullRatings()
                }
                ratingArray = [...ratingArray,data.rating.average]
                showArray = [...showArray, data.name]
            })
            .catch(error => console.log(error.message))
    }
    
    setTimeout(function(){
        let maxRating = Math.max(...ratingArray)
        let showIndex = ratingArray.indexOf(maxRating)
        const maxShow = showArray[showIndex]
        console.log(maxShow)
        console.log(ratingArray)
        console.log(showArray)
    },500)
}


pullRatings()
