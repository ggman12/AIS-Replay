var builder = require('xmlbuilder')
var fs = require('fs')

xmlbuilder()
function xmlbuilder(Boats) {
    var root = builder.create('kml', {encoding: 'utf-8'}).att('xmlns', 'http://earth.google.com/kml/2.2');
    var Document = root.ele('Document')
    Boats.forEach(boat => {
        let Folder = Document.ele("Folder")
        boat..forEach(element => {
            
        });
        let Placemark = Document.ele('Placemark')
        let Timestamp = Placemark.ele("TimeStamp")
        let Point = Placemark.ele("Point")
        Timestamp.ele("when",{}, )
    });
    for (let i = 0; i < 5; i++) {
        const element = 5      
        
    }
    
    var xml = root.end({pretty: true})
    fs.writeFileSync('./KML/xmlbuilderXML' + '.kml', xml)
}
