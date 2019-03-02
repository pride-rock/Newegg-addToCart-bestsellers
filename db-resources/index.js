
const faker = require('faker');
const { Pool, Client } = require('pg')
const now = require('performance-now')

const connectionString = 'postgresql://me:password@localhost:5432/newegg'

const pool = new Pool({
  connectionString: connectionString,

})






/*********
 PRODUCT
 ********** */
var start = now()


// var generate = () => {
//   var seed = Object.create(staticObj)


//   seed.arbitrary = Math.round(Math.random() * (max - min) + min) + Math.round(Math.random() * (max - min) + min) / 100;
// }



// var staticObj = {
  


// }



// let see = object.create(staticobj)

// see.id



// let staticobj = {
//   title:
// }



var product = [];
for (var i = 0; i < 1000000; i++) {

  let multiplier = getRandomPcnt(1, 25);
  let multipliedPrice = getRandomArbitrary(60, 220) * multiplier;
  let total = Math.round(((multipliedPrice * 100) / 100) - getRandomArbitrary(60, 220));
  product.push({
    productID: i,
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
      client.query("INSERT INTO product(productID,priceProduct,onList,country,originalPrice,savedCash,savedPcnt) VALUES ($1, $2::decimal, $3::decimal, $4, $5::decimal, $6::decimal, $7::decimal)",
        [unit.productID, unit.price, unit.onList, unit.country, unit.originalPrice, unit.savedCash, unit.savedPcnt]
        , (err, result) => {
          if (err) {
            console.log('error on query ', err);
          }
        })
    })
  }
})

//promise -> 
//forloop each block

var end = now()



console.log(`Database took ${end - start}ms`);

console.log(process.memoryUsage());
// getProductId(200)

var start = now()
/*********
Competitors
********** */
var competitors = [];
var percent = getRandomPcnt(1, 15);
for (var j = 0; j < 5000000; j++) {
  competitors.push({
    productID: j,
    numReviews : getRandomWhole(8, 1200),
    deliveryPcnt : getRandomArbitrary(50, 97),
    productPcnt : getRandomArbitrary(50, 97),
    servicePcnt : getRandomArbitrary(50, 97),
    reviewScore : Math.round((getRandomArbitrary(50, 97) + getRandomArbitrary(50, 97) + getRandomArbitrary(50, 97)) / 3),
    country : generateRandomCountry(),
    companyName : faker.company.companyName(),
    price : scoreRound(getRandomArbitrary(60, 220) * percent)

  })


//   // ************** competitors table data population ************************ //
  pool.connect((err, client, done) => {
    if (err) {
      console.log('err on pool connection in DB', err);
    } else {
      competitors.forEach(unit => {
        client.query("INSERT INTO competitors (productID, numReviews, deliveryPcnt, productPcnt, servicePcnt, reviewScore, country, companyName, price) VALUES ($1, $2::decimal, $3::decimal, $4::decimal, $5::decimal, $6::decimal, $7, $8, $9::decimal)", 
        [unit.productID, unit.numReviews, unit.deliveryPcnt, unit.productPcnt, unit.servicePcnt, unit.reviewScore, unit.country, unit.companyName, unit.price]
       , (err, result) => {
            if (err) {
              console.log('error on query ', err);
            }
          })
      })
    }
  })
}

var end = now()

console.log(`Database took ${end-start}ms @ 100000`);
console.log(process.memoryUsage());
