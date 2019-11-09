const csv = require('csv-parser')
const fs = require('fs');
class Boats {
  constructor() {
    this.Boats = []
  }
  addBoat(boat) {
    // The MMSI is a unique identifier for each boat
    
    for (let i = 0; i < this.Boats.length; i++) { //checks if the row read MMSI matches a boat already in Boats array 
      const Boat = this.Boats[i];
      if (Boat[0].MMSI === boat.MMSI) {
        Boat.push(boat)
        return;
      }
    }
    this.Boats.push([boat]) // else create a new boat in the Boats Array

  }
}

  var BoatsArray = new Boats();

  readCSV();

  function readCSV() {
    var readStream = fs.createReadStream('AIS_2016_09_Zone10 -- filtered.csv', {
        start: 0
      }).pipe(csv())
      .on('data', (row) => {
       
        BoatsArray.addBoat(row);
  
      })
      .on('end', () => {
        console.log('end of CSV');
        console.log(BoatsArray.Boats)
        let GPSData = require('./CreateGPSForEach')(BoatsArray.Boats);
        let GPScount = 0
        GPSData.forEach(Data => {
          fs.writeFileSync('./GPS/Boat'+ GPScount + '.gpx', Data)
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