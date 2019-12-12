const path=require('path')
const express=require('express')
const hbs=require('hbs')
const Geocode=require('./utils/Geocode')
const forecast=require('./utils/Forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app= express()

const publicDirPath= path.join(__dirname,'../public')

//To use Views(.hbs files) from templates directory
const viewPath= path.join(__dirname,'../templates/views')
app.set('views',viewPath)

const partialsPath= path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//to use handlebars engine Express 
app.set('view engine','hbs')

//This will access index.html page in public directory
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ajitesh Jain'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Weather App',
        name: 'Ajitesh Jain'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help page of Weather App',
        name: 'Ajitesh Jain',
        phone: 9999999999
    })
})

app.get('/products',(req,res)=> {
    if (!req.query.search) {
        res.send({
            error: "You must provide a search term"
        })
    }else{
        res.send({
            products: []
        })
    }  
})

// sending JSON type back
app.get('/weather',(req,res)=> {
    if (!req.query.address) {
        res.send({
            error: "You must provide an address"
        })
    }else{
        Geocode(req.query.address,(error, data1)=> {
            //Geocode('city',(error, {latitude,longitude})=> {
                if(data1){
                    //console.log('Data: ',data)
        
                forecast(data1.latitude, data1.longitude, (error, data2) => {
                        if(data2){
                            res.send({
                                Place: data1.Place,
                                latitude: data1.latitude,
                                longitude: data1.longitude,
                                Temperature: data2.Temperature,
                                Precipitation_Probability: data2.Precipitation_Probability,
                                Day_Summary: data2.Day_Summary,
                                General_Summary: data2.General_Summary
                        })}
                        else{
                            res.send(error)
                        }
                  })}
                  else {
                    res.send(error)
                  }
        })
}
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 Help Error',
        name: 'Ajitesh Jain',
        Error_Page: 'Help article not found, Please check the URL'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Error',
        name: 'Ajitesh Jain',
        Error_Page: 'Please check the URL'
    })
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000.')
})



// app.get('',(req,res)=> {
//     res.send('Hello')
// })

// app.get('/help',(req,res)=> {
//     res.send('Help Page')
// })

// // Sending HTML type back
// app.get('/about',(req,res)=> {
//     res.send('<h1>About Page</h1>')
// })

