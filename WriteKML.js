var builder = require('xmlbuilder')
var fs = require('fs')
module.exports = function (Boats) {
    xmlbuilder(Boats)
}



function xmlbuilder(Boats) {
    var root = builder.create('kml', {
        encoding: 'utf-8'
    }).att('xmlns', 'http://earth.google.com/kml/2.2');
    var Document = root.ele('Document')

    Boats.forEach(boat => {
        let Folder = Document.ele("Folder")
        Folder.ele("name",{}, boat.rows[0].MMSI)
        Folder.ele("open",{}, 1)
        let LookAt = Folder.ele("LookAt")
        LookAt.ele("longitude",{}, -157)
        LookAt.ele("latitude",{}, 21)
        LookAt.ele("altitude", {}, 0)
        LookAt.ele("range",{}, 4060590.093687469)
        LookAt.ele("heading", {}, -3)
        LookAt.ele("tilt",{}, 0)
        Folder.ele("Style").ele("ListStyle").ele("listItemType",{},"checkHideChildren")

        boat.rows.forEach(row => {
            let Placemark = Folder.ele('Placemark')
            let Timestamp = Placemark.ele("TimeStamp")
            Placemark.ele("styleUrl",{}, "#seeadler-dot-icon")
            let Point = Placemark.ele("Point")
            Point.ele("coordinates", {}, row.LON + "," + row.LAT)
            Timestamp.ele("when", {}, row.BaseDateTime)
        });
        

    });
    // let Placemark = Document.ele("Placemark")
    //     Placemark.ele("name", {}, "Aweseom line")
    //     let LineStyle = Placemark.ele("Style").ele("LineStyle")
    //     LineStyle.ele("color",{}, "ff0000ff")
    //     LineStyle.ele("width", {}, "5")
    //     let Line = Placemark.ele("LineString")
    //     Line.ele("tessellate",{}, 1)
    //     Line.ele("altitudeMode",{}, "absolute")
    //     Line.ele("coordinates",{},"55.374000,-4.640000 55.405000,-4.579000 55.393000,-4.654000")

    var xml = root.end({
        pretty: true
    })
    fs.writeFileSync('./KML/BoatsKML' + '.kml', xml)
}