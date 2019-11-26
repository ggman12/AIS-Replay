var builder = require('xmlbuilder')
var xml = builder.create('root')
var fs = require('fs')
module.exports.func = function (Boat) {
    let kmlWriter = require('kmlwriter')
    
    let kml = new kmlWriter()
    kml.startKml(name= 'kml')
    // Boat.rows.forEach(row => {
    //     kml.addPlacemark()
    // });
    kml.addPlacemark("name", "thing", "12","12","32323")
    kml.saveKML('KML/awesome').catch(reason => {console.log(reason)})


}
// this.func();
xmlbuilder()
function xmlbuilder(params) {
    var root = builder.create('kml', {encoding: 'utf-8'}).att('xmlns', 'http://earth.google.com/kml/2.2');
    var Placemark = root.ele('Placemark')
    var xml = root.end({pretty: true})
    
    

    fs.writeFileSync('./KML/xmlbuilderXML' + '.kml', xml)
}
