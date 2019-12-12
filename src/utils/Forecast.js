//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request=require('request')

const forecast=(latitude,longitude, callback) => {
    const Forecast_url= 'https://api.darksky.net/forecast/cfea8176348d92bf61cdba00db342dc6/'+latitude+','+longitude+'?lang=en&units=si'

    request({ url: Forecast_url,json: true }, (error, response) => {
        if (error){
            callback({error:'Cannot connect to the URL, Please check your internet.'})
        }else if(response.body.code===400){
            //else if(response.body.message){
                callback({error:' ,Please check with valid city.'})
            }
            // else if(response.body.features.length===0){
            //     callback("No matching request found, Please check with valid city")
            // }        
            else{
                callback(undefined, {
                    Temperature: response.body.currently.temperature,
                    TemperatureHigh: response.body.daily.data[0].temperatureHigh,
                    TemperatureLow: response.body.daily.data[0].temperatureLow,
                    Precipitation_Probability: response.body.currently.precipProbability,
                    Day_Summary: response.body.daily.data[0].summary,
                    General_Summary: response.body.daily.summary
                //console.log(response)
            })
        }
    })

}

module.exports = forecast


// In below url ?lang=en&units=si are use to change language, units etc.
// Rest can be changed via https://darksky.net/dev/docs#forecast-request document
// const url='https://api.darksky.net/forecast/cfea8176348d92bf61cdba00db342dc6/37.8267,-122.4233?lang=en&units=si'

// //adding json: true will automatically fetch the data and parse it to JSON ie no need to parse below down the line
// request({ url: url,json: true }, (error, response) => {
//     /*const data= JSON.parse(response)
//     // Below is to parse the body section of response
//     const data2= JSON.parse(response.body)
//     console.log(response)
//     //below currently is use to access the weather of current time
//     console.log(data2.currently)*/

//     if (error){
//         console.log("Cannot connect to the URL, Please check your internet")
//         console.log(error)
//     } //else if(response.body.code===400){
//         else if(response.body.error){
//         console.log(response.body.error + " ,Please check the URL.")
//     }
//     else{
//         console.log(response.body.daily.summary)
//         console.log(response.body.daily.data[0].summary)
//         console.log('It is currently '+ response.body.currently.temperature + ' degree celcius out here.')
//         console.log('There is '+ response.body.currently.precipProbability + '% chance of rain')
//     }
// })