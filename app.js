const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Server started in port 3000");
});

app.post("/", function (req, res) {
  console.log("Post request Received");
  console.log(req.body.cityName);

  const query = req.body.cityName;

  const apiKey = "cb33c8c215e0e96ee877defdee729fa5";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&lang=english&units=" +
    unit;
  // console.log(url);

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const weather = weatherData.weather[0].description;
      const wind = weatherData.wind.speed;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(weather);

      res.write(
        "<h1> The current  Temperature of " +
          query +
          " is " +
          temp +
          " Degree Celcius </h1>"
      );
      res.write("<h2> The weather description is " + weather + "</h2>");
      res.write("<img src = " + imageURL + ">");
      res.write("The wind speed in " + query + "is" + wind);
      res.send();
    });
    ``;
  });
});
