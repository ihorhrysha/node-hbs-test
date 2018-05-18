const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//loggong middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('No server.log file');
        }
    });

    next();
});

//data structure
var data_example_from_1c = {
    CustomerAccost: "Гриша Ігор ",
    CustomerId: 100500,
    SupportText: "Some support text",
    InvoiceNumber: 200045465788,
    Items: [
        { ProductId: 801234 },
        { ProductId: 861554 }
    ],
    siteId: 132416345644,
    languageId: 0
};

//hbs helpers for all entities
hbs.registerHelper('mail-token', (id, field) => {

    return new hbs.SafeString(fs.readFileSync(`${__dirname}/views/mt/mt${id}.html`));

});

hbs.registerHelper('product', (id, field) => {
    return new hbs.SafeString(`Product ID ${id}: One of the great things about Heroku is that you have a lot of flexibility in how you write your app. If you’re a Java nerd, you can write your app in Java. If you’re a diehard Python fan, Heroku won’t get in your way. PHP your jam? PHP to your heart’s content!<br><br>`);
});

//hbs helpers for site functions
hbs.registerHelper('autologin', (CustomerId) => {
    return `http://google.com/${CustomerId}`;
});

//rendering
app.get('/', (req, res) => {
    res.render('templates/upgraded.hbs', data_example_from_1c);
});

//server up
app.listen(port, console.log(`Server is up on ${port} port`));