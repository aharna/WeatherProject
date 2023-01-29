const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")

  
})
app.post("/", function(req,res){
    console.log(req.body.cityName)

    const apiKey="73eba08084c3af783042f6afcf0138d7"
    const unit="metric"
    const query= req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
    https.get(url,function(response){
        console.log(response)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData)

            const temp= weatherData.main.temp
            console.log(temp)
            const weatherDescription = weatherData.weather[0].description
            console.log(weatherDescription)
            const icon =weatherData.weather[0].icon
         
            
            
            res.send("<p>The weather currently is "+ weatherDescription + "</p><h1>The Temperature of "+query+" is "+temp+" degree Celcius")
            
        })
    })
})
/*  */

app.listen(3000, function(){
    console.log("server is running!")
})