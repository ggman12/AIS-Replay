const csv = require('csv-parser')
const fs = require('fs');


var endLine = 100000000

readCSV();
function readCSV() {
    var readStream = fs.createReadStream('AIS_2016_01_Zone04.csv', {start: 0,}).pipe(csv())
    .on('data', (row) =>{
      console.log(row)
      countRows()
      if(filterDate(row) == true){

        if(filterHour(row) == true){

          if(filterMinute(row) == true){

            if(filterLocation(row) == true){
              Ships.push(row);
            }
          }
        }
      }
      if(count>= 10){
        readStream.destroy();
      }
      
  })
.on('end', () =>{
    console.log('end of CSV');
    console.log(count);
    writeCSV()
})
.on('close', () => {
    console.log('end of CSV');
    console.log(count);

    writeCSV()
})
}


// console.log("thing")

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: '10rows.csv',
    header: [
      {id: 'MMSI', title: 'MMSI'},
      {id: 'BaseDateTime', title: 'BaseDateTime'},
      {id: 'LAT', title: 'LAT'},
      {id: 'LON', title: 'LON'},
      {id: 'SOG', title: 'SOG'},
      {id: 'COG', title: 'COG'},
      {id: 'Heading', title: 'Heading'},
      {id: 'VesselName', title: 'VesselName'},
      {id: 'IMO', title: 'IMO'},
      {id: 'CallSign', title: 'CallSign'},
      {id: 'VesselType', title: 'VesselType'},
      {id: 'Status', title: 'Status'},
      {id: 'Length', title: 'Length'},
      {id: 'Width', title: 'Width'},
      {id: 'Draft', title: 'Draft'},
      {id: 'Cargo', title: 'Cargo'}

    ]
  });

  class Ship{
    init(){

    }

  }
  var Ships = [

  ]

  function writeCSV() {
    //   if(Ships.length <= 0 ){
    //     startLine = endLine
    //     endLine = (endLine * 2) 
    //     new readCSV();        
    //   }else{
        csvWriter.writeRecords(Ships).then(() => {
            console.log("CSV Written")
            process.exit()
        })
      
      
  }
  
  var count =0;

  function countRows() {
    count++;
  }
  function filterDate(row) {
    if(row.BaseDateTime.includes("2016-09-27")){
      
      return true;
  }
  }
  function filterMinute(row) {
    let BTime= row.BaseDateTime
    let split = BTime.split("27T03:");
    let minute = split[1].split(":")[0]
    if(BTime == "2016-09-27T03:38:00"){
      
      return true;

    }else if(minute >=  08 && minute < 38){
      
        return true;
        
  

    }
  }
  function filterLocation(row) {
    if(row.LAT.includes("48.")){
      if(row.LON.includes("-123.")){
        
        return true;
      }
        
    

    }
  }
  function filterHour(row) {
    if(row.BaseDateTime.includes("T03:")){
      
      return true;

  }
  }
  
