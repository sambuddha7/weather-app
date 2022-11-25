const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "443d21438948465187f81db444a25a40";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+apiKey+"&units=" + unit;
  https.get(url, function(response) {
    console.log(response);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +"@2x.png"
      res.write("<h1>Temperature is " + temp+ " celcius</h1>");
      res.write("<p>Description: it is " + description + "</p>");
      res.write("<img src='" + icon + "'></img>");
      res.send();
    });
  });
})
// const query = "Paris";
// const apiKey = "443d21438948465187f81db444a25a40";
// const unit = "metric";
// const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+apiKey+"&units=" + unit;
// https.get(url, function(response) {
//   console.log(response);
//   response.on("data", function(data) {
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp;
//     const description = weatherData.weather[0].description;
//     const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +"@2x.png"
//     res.write("<h1>Temperature is " + temp+ "</h1>");
//     res.write("<p>Description: it is " + description + "</p>");
//     res.write("<img src='" + icon + "'></img>");
//     res.send();
//   });
// });
app.listen(3000, function() {
  console.log("Server has started");
});
