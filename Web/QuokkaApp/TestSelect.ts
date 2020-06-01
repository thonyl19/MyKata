var fs = require('fs');
var cheerio = require("cheerio");

var FilePath ="x\\Yahoo_100.html"
var data = fs.readFileSync(FilePath);
var $ = cheerio.load(data, { decodeEntities: false });
console.log($);
var $1 = $('th:contains("名次")').parents('table');
var $2 =$1.wrap('div');
console.log($2.html());
