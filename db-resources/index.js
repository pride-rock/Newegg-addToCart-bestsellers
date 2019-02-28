
const {Pool} = require('pg')

const connectionString = 'postgresql://me:password@localhost:5432/newegg'

const pool = new Pool({
  connectionString: connectionString,

})


const getUsers =  (request, response) => {
      pool.query('SELECT * FROM product', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.send(results)
    })


}

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM product', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }
  




module.exports = {getUsers}