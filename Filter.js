// 10 am utc 
const csv = require('csv-parser')
const fs = require('fs');
var readStream

var endLine = 100000000

readCSV();

function readCSV() {
  readStream = fs.createReadStream('HOURS.csv', {
      start: 0,
    }).pipe(csv())
    .on('data', (row) => {
      console.log(row)
      countRows()

      let date = filterDate(row)


      if (date != undefined) {
        if (filterHour(row, date) == true) {
          if (filterLocation(row) == true) {
            Ships.push(row)
          }
        }


      }
      console.log(count)

    })
    .on('end', () => {
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
  path: 'Location.csv',
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

class Ship {
  init() {

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

var count = 0;

function countRows() {
  count++;
}

function filterDate(row) { 
  if (row.BaseDateTime.includes("2016-01-01")) {
    return 1;
  } else if (row.BaseDateTime.includes("2016-01-02")) { // Data is in GMT and Oahu, Hawaii is on HST January 1st HST includes January 2nd GMT
    return 2;
  }

}

function filterMinute(row) {
  let BTime = row.BaseDateTime 
  let split = BTime.split("27T03:"); // split the BaseDateTime row to just the Time
  let minute = split[1].split(":")[0] // get just the minutes string in the BaseDateTime
  if (BTime == "2016-01-01T03:38:00") { 
    return true;
  } else if (minute >= 08 && minute < 38) {
    return true;
  }
}

function filterLocation(row) {
  if (row.LAT.includes("21.")) {
    if (row.LON.includes("-157.") || row.LON.includes("-158.")) {
      return true;
    }
  }
}

function filterHour(row, day) {
  let BTime = row.BaseDateTime
  let split = BTime.split("0" + day + "T"); // split the BaseDateTime row to just the Time
  let hours = split[1].split(":")[0] // get just the hours string in the BaseDateTime
  let hoursNum = parseInt(hours, 10); // convert the hours string into a number 
  if (day == 1) { // if it's january 1st gmt
    if (hoursNum >= 10) {
      return true;
    }
  } else if (day == 2) { // if it's january 2nd gmt
    if (hoursNum < 10) {
      return true;
    }
  }
}