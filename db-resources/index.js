
const faker = require('faker');
const { Pool, Client } = require('pg')
const now = require('performance-now')

const connectionString = 'postgresql://me:password@localhost:5432/newegg'

const pool = new Pool({
  connectionString: connectionString,

})

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


/*********
 PRODUCT
 ********** */
var start = now()

for (var i = 0; i < 1000000; i++) {

  var product = [];
  let multiplier = getRandomPcnt(1, 25);
  let multipliedPrice = getRandomArbitrary(60, 220) * multiplier;
  let total = Math.round(((multipliedPrice * 100) / 100) - getRandomArbitrary(60, 220);
  product.push({
    id: i,
    price: getRandomArbitrary(60, 220),
    onList: getRandomWhole(3, 20),
    country: generateRandomCountry(0, 3),
    originalPrice: Math.round(multipliedPrice * 100) / 100,
    savedCash: Math.round(total * 100) / 100,
    savedPcnt: Math.round((multiplier - 1) * 100)
  })

}
// ************** product table data population ************************ //
pool.connect((err, client, done) => {
  if (err) {
    console.log('err on pool connection in DB', err);
  } else {
    product.forEach(unit => {
      client.query("INSERT INTO product(id,priceProduct,onList,country,originalPrice,savedCash,savedPcnt) VALUES ($1, $2::decimal, $3::decimal, $4, $5::decimal, $6::decimal, $7::decimal)",
        [unit.id, unit.price, unit.onList, unit.country, unit.originalPrice, unit.savedCash, unit.savedPcnt]
        , (err, result) => {
          if (err) {
            console.log('error on query ', err);
          }
        })
    })
  }
})

var end = now()



console.log(`Database took ${end - start}ms`);

console.log(process.memoryUsage());


// var start = now()
// /*********
// Competitors
// ********** */
// var competitors = [];
// var percent = getRandomPcnt(1, 15);
// for (var j = 0; j < 10000; j++) {
//   competitors.push({
//     numReviews : getRandomWhole(8, 1200),
//     deliveryPcnt : getRandomArbitrary(50, 97),
//     productPcnt : getRandomArbitrary(50, 97),
//     servicePcnt : getRandomArbitrary(50, 97),
//     reviewScore : Math.round((getRandomArbitrary(50, 97) + getRandomArbitrary(50, 97) + getRandomArbitrary(50, 97)) / 3),
//     country : faker.address.country(),
//     companyName : faker.company.companyName(),
//     price : scoreRound(getRandomArbitrary(60, 220) * percent),
//     productID: getProductId(200),

//   })


//   // ************** competitors table data population ************************ //
//   pool.connect((err, client, done) => {
//     if (err) {
//       console.log('err on pool connection in DB', err);
//     } else {
//       competitors.forEach(unit => {
//         client.query("INSERT INTO competitors(numReviews, deliveryPcnt, productPcnt, servicePcnt, reviewScore, country, companyName, price, productID) VALUES ($1, $2::decimal, $3::decimal, $4::decimal, $5::decimal, $6, $7, $8::decimal, $9)", 
//         [unit.numReviews, unit.deliveryPcnt, unit.productPcnt, unit.servicePcnt, unit.reviewScore, unit.country, unit.companyName, unit.price, unit.productID]           
//         , (err, result) => {
//             if (err) {
//               console.log('error on query ', err);
//             }
//           })
//       })
//     }
//   })
// }
// var end = now()


// console.log(`Database took ${end-start}ms`);
