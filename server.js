const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

//loggong middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log',log + '\n',(err) => {
        if (err){
            console.log('No server.log file');
        }
    });

    next();
});

////maitnance middleware
// app.use((req, res, next) => {
//     res.render('maitnance.hbs');
// });

//static pages
app.use(express.static(__dirname+'/public'));

//hbs helpers
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//page rendering
app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: "About Page",
        wellcomeMessage: "Hello man"
    });
});

app.get('/', (req,res)=>{
    res.render('home.hbs', {
        pageTitle: "Home Page",
        wellcomeMessage: "Hello man",
        text: "sdfsdf"
    });
});

app.listen(3000,console.log('Server is up on 3000 port'));