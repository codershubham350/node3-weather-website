const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode= require('./utils/geocode');
const forecast=require('./utils/forecast');

//console.log(__dirname);
// console.log(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDirectoryPath= path.join(__dirname, '../public');
const viewsPath= path.join(__dirname, '../templates/views');
const partialsPath= path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name:'Shubham Saxena',

    });
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name:'Shubham Saxena',
    });
});

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help Page',
        description: 'Welcome to the Helper Page!',
        name:'Shubham Saxena',
        
    });
})

// app.get('/weather', (req, res)=>{

//  if(!req.query.address)
//  {
//   return res.send({
//          error:'Please provide the address!',
//      })
//  }   
// res.send({
// address: req.query.address,
// forecast: '50°C', 

// });
// });

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})
   


app.get('/products', (req, res)=>{

if(!req.query.search){
return res.send({
    error:'You must provide a search term',
});
};
// Here we cannpt send 2 response for one request so it will show error as
// Cannot set headers after they are sent to the client
   console.log(req.query.search);
    res.send({
        products: [],
    });
});

// app.com 
// app.com/help
// app.com/about

// Displaying 404 Page using wild card character "*"(when there is no page found)

app.get('/help/*', (req, res)=>{
    res.render('404', {
     title: '404 Page',
     name:'Shubham Saxena',
errorMessage: 'Help article not Found'
    });
 })

app.get('*', (req, res) => {
res.render('404',{
    title: '404 Page',
    name:'Shubham Saxena',
    errorMessage: 'Page not found',
})
})



// app.get('/help/*', (req, res)=>{
//     res.send('Help article not found');
// })

// app.get('*', (req, res) => {
// res.send('My 404 Page');
// })

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});