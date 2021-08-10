const express = require('express');
const hbs = require("hbs");
const path = require("path");

const app = express();

const weatherData = require('../utls/weatherData')

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));

app.get("/", function(req, res){
  // res.send("Hi this is a weather app");
  res.render('index', {
    title:'Weather App'
  })
})

// adress is the name of the city we will be adding
app.get("/weather", function(req, res){
  // res.send("This is weather end point. ");
  const address = req.query.address
  if(!address){
    return res.send({
      error:"add a city name, please"
    })
  }

  // weatherData(address, (result) => {
  //   console.log(result);
  // })
  weatherData(address, (error, {temperature, description, cityName}) => {
    if(error) {
      return res.send({
        error
      })
    }
  console.log(temperature, description, cityName);
  res.send({
    temperature,
    description,
    cityName
  })
  })
});


app.get("*", function(req, res){
  // res.send("Page not found mate");
  res.render('404',{
    title: "page not found mate"
  })
})


app.listen(port, function(){
  console.log("Server is up and running on port ", port);
})
