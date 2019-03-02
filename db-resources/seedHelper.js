
const faker = require('faker');


function getRandomArbitrary(min, max) {
    let x = Math.round(Math.random() * (max - min) + min);
    let y = Math.round(Math.random() * (max - min) + min) / 100;
    return x + y;
  }
  
  function getRandomWhole(min, max) {
    let x = Math.round(Math.random() * (max - min) + min);
    return x;
  }
  
  function scoreRound(num) {
    return Math.ceil(num * 100) / 100;
  }
  
  function getRandomPcnt(min, max) {
    let x = Math.round(Math.random() * (max - min) + min);
    return 1 + (x / 100);
  }
  
  function getProductId(max) {
    let x = (Math.floor(Math.random() * max))
    return x
  }
  
  function generateRandomCountry(min, max) {
    let x = Math.round(Math.random() * (max - min) + min);
    var countries = ['United States', 'Mexico', 'Canada', 'China']
    return countries[x];
  }
  
  

  module.exports = {seedHelper} 