const fs = require('fs');
const { parse } = require('csv-parse')
interface returnType {
    date: Date,
    data: any[]
}

fs.createReadStream('../../Data/ASHOKLEY.NS.csv')
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row: any) {
        const obj: returnType = { date: new Date(), data: [] };
        obj.date = new Date(row[0]);
        const arr: any[] = [];
        for (let i = 1; i < row.length; i++) {
            arr.push(row[i]);
        }
        obj.data.push(arr);
        console.log(obj);
    })
    .on("end", function () {
        console.log("finished");
    })
    .on("error", function (error:any) {
        console.log(error.message);
    });