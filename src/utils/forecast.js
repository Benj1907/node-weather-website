const request=require('request');

const forecast= (longitude,latitude,callback)=>{
    var url= 'https://api.darksky.net/forecast/fbadd496ab56183d76efd83a41082d04/'+longitude+','+latitude+'?units=si'
    //console.log(url)
    request({url,json: true}, (error, {body})=>{
 
    if (error){
             callback("Unable to connect to weather forecast service!",undefined)
         }
         else if(body.error){
     
             callback("Unable to find location",undefined)
         }
     
         else{
 
         callback(undefined,"This is currently "+body.currently.temperature+" degrees.\nThere is a "+body.currently.precipProbability+" percent chance of rain")
                 
     }
 
 })
 }

 module.exports=forecast;