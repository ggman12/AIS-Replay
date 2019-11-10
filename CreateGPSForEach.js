const { buildGPX, GarminBuilder } = require('gpx-builder');
 
const { Point } = GarminBuilder.MODELS;
var GPS = []
module.exports = function (Boats) {
    Boats.forEach(Boat => {
        let points = [];
        Boat.forEach(Pos => {
            points.push(new Point(Pos.LAT, Pos.LON, {
                time: new Date(Pos.BaseDateTime),
                type: 'boat'
            }))
        }); 
        let gpxData = new GarminBuilder();
        gpxData.setSegmentPoints(points)
        GPS.push(buildGPX(gpxData.toObject()))
    });
    
    return GPS;
}