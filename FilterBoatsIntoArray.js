const csv = require('csv-parser')
const fs = require('fs');
class BoatContainer {
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

  var boatContainer = new BoatContainer();

  readCSV();

  function readCSV() {
    var readStream = fs.createReadStream('AIS_2016_01_Zone04 Filtered.csv', {
        start: 0
      }).pipe(csv())
      .on('data', (row) => {
       
        boatContainer.addBoat(row);
  
      })
      .on('end', () => {
        console.log('end of CSV');
        console.log(boatContainer.Boats)
        require('./WriteKML')(boatContainer.Boats)
       
        
      
      })
      .on('close', () => {
        console.log('end of CSV');
     
      })
  }
  

  