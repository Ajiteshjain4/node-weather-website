//console.log('This is client side JS file')


const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
const messageOne= document.querySelector('#message1')
const messageTwo= document.querySelector('#message2')
const messageThree= document.querySelector('#message3')
const messageFour= document.querySelector('#message4')
const messageFive= document.querySelector('#message5')
const messageSix= document.querySelector('#message6')
const messageSeven= document.querySelector('#message7')
const messageEight= document.querySelector('#message8')
const messageNine= document.querySelector('#message9')

//messageOne.textContent= ''

weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()

    const location= search.value
    //console.log(location)

            messageOne.textContent='Loading.....'
            messageTwo.textContent= ''
            messageThree.textContent=''
            messageFour.textContent=''
            messageFive.textContent=''
            messageSix.textContent=''
            messageSeven.textContent=''
            messageEight.textContent=''
            messageNine.textContent=''

            // Making below change to work on Heroku
    //fetch('http://localhost:3000/weather?address='+location).then((response) => {
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {

        if(data.error){
            console.log(data.error)  
            messageOne.textContent='Error- ' + data.error    
            messageTwo.textContent= ''
            messageThree.textContent=''
            messageFour.textContent=''
            messageFive.textContent=''
            messageSix.textContent=''
            messageSeven.textContent=''
            messageEight.textContent=''
            messageNine.textContent=''
        }
        else{
            console.log(data.Place)
            messageOne.textContent= 'City- ' + data.Place
            console.log(data.latitude)
            messageTwo.textContent= 'Latitude- ' + data.latitude
            console.log(data.longitude)
            messageThree.textContent= 'Longitude- ' + data.longitude
            console.log(data.Temperature)
            messageFour.textContent= 'Current Temperature- ' + data.Temperature
            console.log(data.TemperatureHigh)
            messageFive.textContent= 'Highest Temperature- ' + data.TemperatureHigh
            console.log(data.TemperatureLow)
            messageSix.textContent= 'Lowest Temperature- ' + data.TemperatureLow
            console.log(data.Precipitation_Probability)
            messageSeven.textContent= 'Precipitation_Probability- ' + data.Precipitation_Probability
            console.log(data.Day_Summary)
            messageEight.textContent= 'Day_Summary- ' + data.Day_Summary
            console.log(data.General_Summary)
            messageNine.textContent= 'General_Summary- ' + data.General_Summary
            }
        })  
    })
})


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {

//         if(data.error){
//             console.log(data.error)        
//         }
//         else{
//             console.log(data.Place)
//             console.log(data.latitude)
//             console.log(data.longitude)
//             console.log(data.Temperature)
//             console.log(data.Precipitation_Probability)
//             console.log(data.Day_Summary)
//             console.log(data.General_Summary)
//             }
//         })  
//     })