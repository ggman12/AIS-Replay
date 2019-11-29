var builder = require('xmlbuilder')
var fs = require('fs')
var ejs = require('ejs')
let ejsTemplate = fs.readFileSync(__dirname + '/KML/template.ejs', 'ascii')

module.exports = function (Boats) {
    xmlbuilder(Boats)
}



function xmlbuilder(Boats) {
    var root = builder.create('kml', {
        encoding: 'utf-8'
    }).att('xmlns', 'http://www.opengis.net/kml/2.2').att('xmlns:gx', "http://www.google.com/kml/ext/2.2")
    var Document = root.ele('Document')
    CreateStyles(Document)
    Boats.forEach(boat => {
        let Folder = Document.ele("Folder")
        Folder.ele("name", {}, boat.rows[0].MMSI)
        Folder.ele("open", {}, 1)
        let LookAt = Folder.ele("LookAt")
        LookAt.ele("longitude", {}, -157)
        LookAt.ele("latitude", {}, 21)
        LookAt.ele("altitude", {}, 0)
        LookAt.ele("range", {}, 4060590.093687469)
        LookAt.ele("heading", {}, -3)
        LookAt.ele("tilt", {}, 0)
        Folder.ele("Style").ele("ListStyle").ele("listItemType", {}, "checkHideChildren")
        let Placemark = Folder.ele('Placemark')
        Placemark.ele("description",{}, CreateDescriptionForBoat(boat))
       



        SetStyleBasedOnLength(boat, Placemark)
        let Track = Placemark.ele("gx:Track")

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

function CreateStyles(Document) {
    let Style = Document.ele("Style").att("id", "boat1");
    let IconStyle = Style.ele("IconStyle")
    IconStyle.ele("scale", {}, 1)

     Icon = IconStyle.ele("Icon")
    Icon.ele("href", {}, "http://maps.google.com/mapfiles/kml/shapes/ferry.png")

     Style = Document.ele("Style").att("id", "boat2");
     IconStyle = Style.ele("IconStyle")
    IconStyle.ele("scale", {}, 1.5)

     Icon = IconStyle.ele("Icon")
    Icon.ele("href", {}, "http://maps.google.com/mapfiles/kml/shapes/ferry.png")
    
     Style = Document.ele("Style").att("id", "boat4");
     IconStyle = Style.ele("IconStyle")
    IconStyle.ele("scale", {}, 2)

     Icon = IconStyle.ele("Icon")
    Icon.ele("href", {}, "http://maps.google.com/mapfiles/kml/shapes/ferry.png")


}

function SetStyleBasedOnLength(boat, Placemark) {
    if (boat.length >= 200) {
        Placemark.ele("styleUrl", {}, "#boat4")

    }
    else if (boat.length >= 100) {
        Placemark.ele("styleUrl", {}, "#boat2")
    }
    else if (boat.length < 50) {
        Placemark.ele("styleUrl", {}, "#boat1")
    }
     else {
        Placemark.ele("styleUrl", {}, "#boat1")

    }

}

function CreateDescriptionForBoat(boat) {
    return ejs.render(ejsTemplate, {boat})
}