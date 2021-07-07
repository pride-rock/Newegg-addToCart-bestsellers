
const { Pool, Client } = require('pg')
const { performance } = require('perf_hooks')
const {getRandomArbitrary, getRandomWhole, scoreRound, getRandomPcnt, generateRandomCountry, getProductId} = require('./seedHelper')
const connectionString = 'postgresql://junjo:password@localhost:5432/junjo'
const pgp = require('pg-promise')({
  capSQL: false// if you want all generated SQL capitalized
});

// connect to the database
const pool = new Pool({
  connectionString: connectionString,
})

const db = pgp(pool);

//************************ generate data ********************************//


const dataGenerator = (num)=>{
  var product = [];
  let multiplier = getRandomPcnt(1, 25);
  let multipliedPrice = getRandomArbitrary(60, 220) * multiplier;
  let total = Math.round(((multipliedPrice * 100) / 100) - getRandomArbitrary(60, 220));

  for (var i = 0 ; i < num  ; i++) {
    product.push({
      productid: i,
      priceproduct: getRandomArbitrary(60, 220),
      onlist: getRandomWhole(3, 20),
      country: generateRandomCountry(0, 3),
      originalprice: Math.round(multipliedPrice * 100) / 100,
      savedcash: Math.round((total * 100) / 100),
      savedpcnt: Math.round((multiplier - 1) * 100)
    })
     
  }
  return product;
}




//************************ seed data into the database ********************************//
const dbInsert= async (num) => {
  var product = dataGenerator(num);

  const cs = new pgp.helpers.ColumnSet(["productid","priceproduct","onlist","country","originalprice","savedcash","savedpcnt"],{table: 'product'})
  const q = pgp.helpers.insert(product, cs)
  // console.log(JSON.stringify(q))
  await db.query(q)
    .then(data =>{} )
    .catch(err => {})
}
console.log(`testing 5mil w/ 10 batches`)



//************************ using promise to throw data in batches ********************************//
const batchInsert = async(iterate, insertion) => {
  const start = performance.now();
  iterate = 10 ;

  for (let i = 0; i < iterate; i++) {
    await(insertion(1000000))
 
  }
  const end = performance.now();
  console.log(`Performance: ${end-start}ms`)
}

batchInsert(0, dbInsert);


console.log(process.memoryUsage());
