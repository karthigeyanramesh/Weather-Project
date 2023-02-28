const express= require("express");
// const bodyParser = require("body-parser");
const https = require("https")
const bodyParser= require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html");


});

app.post("/", function(req,res){
  console.log("post recievd");
  const city = req.body.cityName;
  console.log(city);
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+city +"&appid=6f00cbd8345720996c654a4b68654587&units=metric";


https.get(url ,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weather = JSON.parse(data);
      console.log(weather);
      const temp = weather.main.temp;
      console.log(temp +"degrees");
      const weatherDescription = weather.weather[0].description
      console.log(weatherDescription)
      const iconCode = weather.weather[0].icon

      const urlImage= "http://openweathermap.org/img/wn/"+iconCode+ "@2x.png"

      message = "<h1> The weather in "+city+" is "+temp+" degrees </h1>";
     res.write(message)
     res.write("<p> Its "+weatherDescription + "</p>")
     res.write("<img src=" + urlImage +">");

      res.send();


})




    })

  })












// remember to send files u must write it outside the app.get
// function








// server
app.listen(2500,function(){
  console.log("servers inititated!")
})
