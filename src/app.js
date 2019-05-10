const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', function (req, res) {
    res.render('index',{
        title: 'Weather app',
        name: 'Benjamin Gauron'
    })
}
)


app.get('/about', function (req, res) {
    res.render('about',{
        title: 'About',
        name: 'Benjamin Gauron'
    })
}
)

app.get('/help', function (req, res) {
    res.render('help',{
        title: 'Help',
        message: 'This message will help you!',
        name: 'Benjamin Gauron'
    })
}
)


app.get('/weather', function (req, res) {
    if(!req.query.address){
        return res.send({error:"You must provide an address"})
    }
    else{
  
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{ 
        if(error){
             return res.send({error})
               }
              
       forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
                  }
                  res.send({forecast:forecastData,location})
              });
     });

    }
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({error: "You must provide a search term"})
    }
   data=req.query.search
    res.send({
        products:[],
        data
    })
})

app.get('*',  (req, res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Benjamin Gauron'
    })
    })


app.listen(port, () => {
    console.log('Server is up and running on port '+port)
})