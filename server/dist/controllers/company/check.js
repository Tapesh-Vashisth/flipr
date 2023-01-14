"use strict";
const fs = require('fs');
const { parse } = require('csv-parse');
fs.createReadStream('../../Data/ASHOKLEY.NS.csv')
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
    const obj = { date: new Date(), data: [] };
    obj.date = new Date(row[0]);
    const arr = [];
    for (let i = 1; i < row.length; i++) {
        arr.push(row[i]);
    }
    obj.data.push(arr);
    console.log(obj);
})
    .on("end", function () {
    console.log("finished");
})
    .on("error", function (error) {
    console.log(error.message);
});
