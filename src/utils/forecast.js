const request=require('request');

const forecast= (latitude, longitude, callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=df8a8d0408cc1e4a0d195cbab145e6b0&query=${longitude},${latitude}&units=f`;
    request({url, json:true,}, (error,{body})=>{
    if(error){
        callback('Unable to connect to location services!', undefined);
        //in geocode('New York', (error='Unable to conncet to location services!',data=undefined)=>{})
    } else if (body.error) // can also use if(response.body.success === false)
    {
    callback('Unable to find location. Try another search', undefined)
    //in geocode('New York', (error='Unable to conncet to location services!',data=undefined)=>{})
    } else {
callback(undefined,
 `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.
 Humidity is ${body.current.humidity} and wind direction is ${body.current.wind_dir}`,

)

//    callback(undefined,{
//        weather: response.body.current.weather_descriptions[0],
//         temperature: response.body.current.temperature,
//         feelsLike: response.body.current.feelslike,
//         city: response.body.location.region,
       
//     })
    
    }
    });
    }
    
module.exports= forecast;