const express = require('express');
const app = express();
// const sqlite3 = require('sqlite3').verbose();
const db = require('../db-resources/index')
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const compression = require('compression');
console.log()
app.use(cors());
app.use(parser.json());
// app.use(compression());
app.use(
  parser.urlencoded({
    extended: true,
  })  
)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'))
// })
// app.use(express.static(path.join(__dirname + '/../client/dist')));

// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });


// app.get('/', (request, response) => {
//   response.send('hello')
// })



app.get('/users', db.getUsers)
// app.get('/items/:itemId',(req, res) => {
//   console.log(res)
//   res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
// });



// app.get('/api/items/:id', (req, res) => {
//   //test that api path exists
//     //console.log(req.params.id);
//     db.all(`
//     select * from competitors \
//     cross join product \
//     on competitors.productID = product.productID \
//     where product.productID=${req.params.id} \
//     `, (err, data) => {
//       if (err) {
//         //test to see if there's an error
//         console.log(err, ' error here');
//       } else {
//         //see if the expected data equals 
      
//         res.send(data);
//         res.end();
//       }
//     });
// });



app.listen(3011, () => {
  console.log('Server listening on port 3011!');
});





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
