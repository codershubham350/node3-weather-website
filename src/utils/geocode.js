const request=require('request');

const geocode= (address, callback)=>{
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2h1YmhhbXNheGVuYTM1MCIsImEiOiJja3JoODAyc2QwM2cxMm9ydmh2cTB0N2k0In0.OmqLWtR004s6BOeG9PL-AA`;
    request({url, json:true,}, (error,{body})=>{
    if(error){
        callback('Unable to conncet to location services!', undefined);
        //in geocode('New York', (error='Unable to conncet to location services!',data=undefined)=>{})
    } else if (body.features.length === 0){
    callback('Unable to find location. Try another search', undefined)
    //in geocode('New York', (error='Unable to conncet to location services!',data=undefined)=>{})
    } else {
    callback(undefined,{
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
    })
    //in geocode('Philadelphia', (error=undefined,data='')=>{latitude: response.body.features[0].center[1],
     //   longitude: response.body.features[0].center[0],
     //   location: response.body.features[0].place_name,})
    }
    });
    }
    
  

    module.exports= geocode;