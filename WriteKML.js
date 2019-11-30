var builder = require('xmlbuilder')
var fs = require('fs')
var ejs = require('ejs')
let ejsTemplate = fs.readFileSync(__dirname + '/KML/template.ejs', 'ascii')

module.exports = function (Boats) {
    xmlbuilder(Boats)
}


var root = builder.create('kml', {
    encoding: 'utf-8'
}).att('xmlns', 'http://www.opengis.net/kml/2.2').att('xmlns:gx', "http://www.google.com/kml/ext/2.2")
var Document = root.ele('Document')

function xmlbuilder(Boats) {
    Boats.forEach(boat => {
        // Will be run 57 times for this data set

        let Folder = Document.ele("Folder")
        Folder.ele("name", {}, boat.rows[0].MMSI)
        Folder.ele("open", {}, 1)
        let LookAt = Folder.ele("LookAt") // LookAt is where the Google Earth Camera will go when a Folder is clicked
        LookAt.ele("longitude", {}, -157)
        LookAt.ele("latitude", {}, 21)
        LookAt.ele("altitude", {}, 0)
        LookAt.ele("range", {}, 4060590)
        LookAt.ele("heading", {}, -3)
        LookAt.ele("tilt", {}, 0)

        let Placemark = Folder.ele('Placemark') // will contain all postion and time data for each row
        Placemark.ele("description", {}, CreateDescriptionForBoat(boat)) // when a Placemark is clicked in google earth a description is displayed 
        Placemark.ele("styleUrl", {}, "#" + SetStyleBasedOnLength(boat)) // Create and assign a style for the Boat 
        let Track = Placemark.ele("gx:Track") // gx:Track is used by Placemark object for postion data that changes over time.

        boat.rows.forEach(row => {
            Track.ele("when", {}, row.BaseDateTime)
        });
        boat.rows.forEach(row => {
            Track.ele("gx:coord", {}, row.LON + " " + row.LAT + " " + 0)
        });
        boat.rows.forEach(row => {
            Track.ele("gx:angles", {}, row.Heading)
        });


    });

    var xml = root.end({
        pretty: true
    })
    fs.writeFileSync('./KML/BoatsKML' + '.kml', xml)
}

function CreateStyle(scale) { // All 57 boats have a unqiue style so that their scale can be unique 
    let hash = ID(); 
    let Style = Document.ele("Style").att("id", hash); 
    let IconStyle = Style.ele("IconStyle")
    IconStyle.ele("scale", {}, scale)
    Icon = IconStyle.ele("Icon")
    Icon.ele("href", {}, "http://maps.google.com/mapfiles/kml/shapes/ferry.png")
    return hash;

}

function SetStyleBasedOnLength(boat) { 
    let scale = 1
    let maxlength = 250;
    if (isNaN(boat.length)) { // Some of the Boat objects have no length 
        return CreateStyle(1);

    } else {

        scale = scale + boat.length / maxlength; // the boat scale ranges from 1-2 depending on boat length 
        return CreateStyle(scale);
    }

}

function CreateDescriptionForBoat(boat) { // creates
    return ejs.render(ejsTemplate, {boat}) // returns an html string used by KML description
}

var ID = function () { // Creates a unique has ID used for Style
    return '_' + Math.random().toString(36).substr(2, 9);
};