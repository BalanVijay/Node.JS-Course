const express = require('Express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.path}`);
  var log = `${now}: ${req.method} ${req.path}`

  fs.appendFile('server.log', log + '/n', (err) => {
    if(err){
      console.log("Unalbe to write to file");
    }
  })
  next();
})

hbs.registerHelper('maint', () => {
  return 'Maintenance Page Hello';
})

// app.use((req, res) => {
//   res.render('maintenance.hbs', {
//     pageName: "Maintenance"             //"Maintenance Page"
//   });
// })

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  // res.send("Hello Express!");

  res.render('home.hbs', {
    welcomeTitle: "Welcome to my Website",
    pageTitle: "Welcome",
    page: "Home Page",

  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Title",

  });
})

app.get('/bad', (req, res) => {
  res.send({
    Title: "Bad Request",
    Description : "Page Not Found"
  });
});

app.listen(port), () => {
  console.log(`Server is back on port ${3000}`);
};
