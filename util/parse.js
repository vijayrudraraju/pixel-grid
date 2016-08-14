var flatten = require('flatten')
var isarray = require('is-array')
var isnumber = require('is-number')
var isstring = require('is-string')
var color = require('parse-color')

function parse(data) {
  data = (isarray(data[0]) && data[0].length != 3) ? flatten(data, 1) : data
  
  if (isnumber(data[0])) {
    data = data.map(function (d) {return [d, d, d]})
  }

  if (isstring(data[0])) {
    data = data.map(function (d) {return color(d).rgb})
  }

  return data
}

module.exports = parse