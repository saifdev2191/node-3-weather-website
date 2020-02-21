
const request = require("request")
const getLatLong = (address, callback) => {
    const url_lat = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FpZnVsMjE5MSIsImEiOiJjazZwMGh6N2cxY3dlM2xycmo4a2tvMWczIn0.UgDkWoqokWFZBbFtkqL3qQ`;
    var lat, long
    request({url: url_lat, json: true}, (err,res)=>{

        //network is down
        if(err){
            callback('Unable to fetch lat and long', undefined)
        }
        // no matching
        else if(res.body.features.length === 0 ){
            callback('provide correct geo location', undefined)
        }
        else{
            callback(undefined,{
                lat: res.body.features[0].center[0],
                long: res.body.features[0].center[1]
            })
        }
    })

}
module.exports = getLatLong;