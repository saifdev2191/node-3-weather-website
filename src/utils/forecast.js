const request = require('request');
const forecast = (lat,long, callback) => {
    const url = `https://api.darksky.net/forecast/2a5888e151ccf06999f9102c40969d22/12.96991,77.59796?units=si`;
    request({url, json: true}, (err, res) => {
    if(err){
        callback('Unable to fetch geo -location', undefined)
    }
    else if(res.body.error){
       callback('Provide correct lat and long', undefined)
    }
    else{
        callback(undefined,{
            summary: res.body.hourly.data[0].summary,
            temperature: res.body.currently.temperature,
            rainProb: res.body.currently.precipProbability
        } )
    }
    
  })
}

module.exports = forecast;