var builder = require('xmlbuilder')
var fs = require('fs')

xmlbuilder()

function xmlbuilder(BoatsArray) {
    var root = builder.create('kml', {
        encoding: 'utf-8'
    }).att('xmlns', 'http://earth.google.com/kml/2.2');
    var Document = root.ele('Document')
    BoatsArray.forEach(boat => {
        let Folder = Document.ele("Folder")
        boat.rows.forEach(row => {
            let Placemark = Document.ele('Placemark')
            let Timestamp = Placemark.ele("TimeStamp")
            let Point = Placemark.ele("Point")
            Point.ele("coordinates", {}, row.LAT + "," + row.LON)
            Timestamp.ele("when", {}, row.BaseDateTime)
        });

    });

    var xml = root.end({
        pretty: true
    })
    fs.writeFileSync('./KML/xmlbuilderXML' + '.kml', xml)
}