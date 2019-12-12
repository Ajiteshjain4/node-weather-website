const request=require('request')

const Geocode=(address, callback) => {
    const Geocode_url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWppdGVzaGphaW4iLCJhIjoiY2szdnBlZTJ6MGE2ejNrcGhlaXBndXNraSJ9.fZlSLWzqNBjgVZq-1t15BQ'

    request({ url: Geocode_url,json: true }, (error, response) => {
        if (error){
            callback({error: 'Cannot connect to the URL, Please check your internet.'})
        }//else if(response.body.code===400){
            else if(response.body.message){
                callback({error:' ,Please check with valid city.'})
            }
            else if(response.body.features.length===0){
                callback({error:'No matching request found, Please check with valid city'})
            }        
            else{
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    Place: response.body.features[0].place_name
                //console.log(response)
            })
        }
    })

}

module.exports = Geocode

// Geocode('Lucknow',(error, data)=> {
//     if(data) {
//         console.log(data)}
//         else {
//             console.log(error)
//         }
// })



// const Geocode_url='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWppdGVzaGphaW4iLCJhIjoiY2szdnBlZTJ6MGE2ejNrcGhlaXBndXNraSJ9.fZlSLWzqNBjgVZq-1t15BQ'
// //const Geocode_url='https://api.mapbox.com/geocoding/v5/mapbox.places/ALLAAAAALLLLAA.json?access_token=pk.eyJ1IjoiYWppdGVzaGphaW4iLCJhIjoiY2szdnBlZTJ6MGE2ejNrcGhlaXBndXNraSJ9.fZlSLWzqNBjgVZq-1t15BQ'

// // We need to fetch Latitude and longitude of a place to fetch the weather of that place.
// request({ url: Geocode_url,json: true }, (error, response) => {
//     if (error){
//         console.log("Cannot connect to the URL, Please check your internet.")
//         console.log(error)
//     }//else if(response.body.code===400){
//         else if(response.body.message){
//             console.log(response.body.message + " ,Please check the URL.")
//         }else if(response.body.features.length===0){
//             console.log("No matching request found, Please check with valid city")
//         }        
//         else{
//             const latitude=response.body.features[0].center[1]
//             const longitude=response.body.features[0].center[0]
//             console.log(latitude, longitude)
//             console.log(response.body.features[0].place_name)
//             //console.log(response)
//         }
// })