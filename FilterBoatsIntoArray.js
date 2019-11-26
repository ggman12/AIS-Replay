const csv = require('csv-parser')
const fs = require('fs');
class Boats {
  constructor() {
    this.Boats = [] // After the CSV is read there will be 57 boats in the array
  }
  addBoat(row) { // addBoat gets called for every row in the filtered CSV
    // The MMSI is a unique identifier for each boat
    for (let i = 0; i < this.Boats.length; i++) { //checks if the row read MMSI matches a boat already in Boats array 
      const Boat = this.Boats[i];
      if (Boat.MMSI === row.MMSI) {
        Boat.rows.push(row)
        return;
      }
    }
    this.Boats.push(new Boat(row)) // else create a new boat in the Boats Array
  }
}
class Boat{
  constructor(row){
    this.MMSI = row.MMSI
    this.length = row.Length
    this.rows = [row]
  }
}

  var BoatsArray = new Boats();

  readCSV();

  function readCSV() {
    var readStream = fs.createReadStream('AIS_2016_01_Zone04 Filtered.csv', {
        start: 0
      }).pipe(csv())
      .on('data', (row) => {
       
        BoatsArray.addBoat(row);
  
      })
      .on('end', () => {
        console.log('end of CSV');
        console.log(BoatsArray.Boats)
        require('./GPXCreator')(BoatsArray.Boats);
        //write the .gpx data to a .gpx file for each Boat in GPS array
        let GPScount = 0
        BoatsArray.Boats.forEach(Boat => {
          const gpx = Boat.gpxData;
          fs.writeFileSync('./GPS/Test/Boat'+ GPScount + '.gpx', gpx)
          GPScount++;
        });
       
        
      
      })
      .on('close', () => {
        console.log('end of CSV');
     
      })
  }
  function CreateCSVForEach(Boats) { 
    let count = 0;

    Boats.forEach(Boat => {
      let createCsvWriter = require('csv-writer').createObjectCsvWriter;
      let csvWriter = createCsvWriter({
    path: './Boats/Boat' + count.toString() + '.csv',
    header: [{
        id: 'MMSI',
        title: 'MMSI'
      },
      {
        id: 'BaseDateTime',
        title: 'BaseDateTime'
      },
      {
        id: 'LAT',
        title: 'LAT'
      },
      {
        id: 'LON',
        title: 'LON'
      },
      {
        id: 'SOG',
        title: 'SOG'
      },
      {
        id: 'COG',
        title: 'COG'
      },
      {
        id: 'Heading',
        title: 'Heading'
      },
      {
        id: 'VesselName',
        title: 'VesselName'
      },
      {
        id: 'IMO',
        title: 'IMO'
      },
      {
        id: 'CallSign',
        title: 'CallSign'
      },
      {
        id: 'VesselType',
        title: 'VesselType'
      },
      {
        id: 'Status',
        title: 'Status'
      },
      {
        id: 'Length',
        title: 'Length'
      },
      {
        id: 'Width',
        title: 'Width'
      },
      {
        id: 'Draft',
        title: 'Draft'
      },
      {
        id: 'Cargo',
        title: 'Cargo'
      }

    ]
  });
  csvWriter.writeRecords(Boat).then(() => {
    console.log("CSV Written")
  })
  count++;
    });
  }

  var Ships = [

  ]

  function writeCSV() {

    csvWriter.writeRecords(Ships).then(() => {
      console.log("CSV Written")
      process.exit()
    })


  }