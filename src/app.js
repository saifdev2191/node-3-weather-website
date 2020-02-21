const path = require('path');
const forecast = require('./utils/forecast');
const getLatLong = require('./utils/geoCode')


//npm packages
const express = require('express')
const hbs = require('hbs')
//express is function . We call express function to create new express application
const app = express();

console.log(__dirname);
// Define path for express config
const publicdirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//customizing our web server using app.use(). This will load only static files from web server and not dynamic template
app.use(express.static(publicdirPath))

// we need to tell express that which default engine we are using for dynamic template. Here we are using hbs. Here we are telling express
// to set our view engine as hbs
app.set('view engine', 'hbs')
//we can customize default view folder and name it any thing. Just we need to define the path and tell express to look there only. Here we are
//actually telling express to look for view directory @ given path
app.set('views',viewPath)
// We set up partials to use that piece of code that is used repeatetively in all routes ex : header
hbs.registerPartials(partialsPath)

// To serve dynamic page in views
app.get('',(req,res)=>{
    //To render our handlebar content
    res.render('index',{
        title: "Weather app",
        name: "saif",
        footer: "Summary of todays weather",
        error: "Weather page not found"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About page',
        name: "saif",
        footer: "About footer",
        error: "Weather page not found"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help page",
        footer: "Help footer"
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide location/address'
        })
    }

    getLatLong(req.query.address ,(error, {lat, long} = {})=>{
        // const {lat, long} = data;
        if(error){
          return res.send({
              error: error
          })
        }
        forecast(lat,long, (error, {summary, temperature, rainProb} = {})=>{
            // const {summary, temperature, rainProb} = data;
            if(error){
                console.log('Error inside forecast', error);
            }
            console.log(`${summary}.It is currently ${temperature} degress out. There is ${rainProb}% chance of rain.`)

            res.send({
                address: req.query.address,
                forecast:`${summary}.It is currently ${temperature} degress out. There is ${rainProb}% chance of rain.`
        
            })
        })
    })

    // res.send({
    //     address: req.query.address,
    //     forecast:`${summary}.It is currently ${temperature} degress out. There is ${rainProb}% chance of rain.`

    // })
})






app.get('/products',(req,res)=>{
    if(!req.query.search){
        // serevr can return only pnce. Therefore we need to add return in if statement
        return res.send({
            error:'provide search item'
        })
    }
    console.log(req.query.myself)
    res.send({
        products: []
    })
})




//404-for help page
app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title: "404 error",
        error: "Help Page not found"
    })
})
//404 msg
app.get('*',(req,res)=>{
    res.render('error404',{
        title: "404 error",
        error: "Page not found"
    })
})




//we can specify specific route and tell server what to serve at this route. 
//app.get('path', callback(req, res)): app.get take two inputs. first input is route and second input is callback fn. Node server return what it has to
//serve in callback fn. Callback fn again take two inputs. One is request to the server and other is response from the server


// calling this : app.use(express.static(publicdirPath)) above , will look for index.html and that index.htmlwill be rendered in home url and 
//therefore below code will be meaningless
// app.get('',(req, res)=>{
//     res.send('Hello express')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>Title</h1>')
// })




//start the server. Has two arg. First is port number and other is optional callback fn which will execute when server has been started. Starting a
//server is asynchronous process
app.listen(3000, () => {
    console.log('server has started')
})

