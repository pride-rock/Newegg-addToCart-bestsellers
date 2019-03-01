const express = require('express');
const app = express();
// const sqlite3 = require('sqlite3').verbose();
const db = require('../db-resources/index')
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const compression = require('compression');
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
app.use(cors());
app.use(parser.json());
// app.use(compression());
app.use(
  parser.urlencoded({
    extended: true,
  })  
)

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 8080;
  const { spawn } = require('child_process');


  const pid = process.pid;
  const server = app.list(port, () => {
    console.log(`Worker ${process.pid} started`);
  })

  app.get('/', (req, res, next) => {
    for (var i = 0 ; i < 2e6 ; i++){
      res.send(`Process ${pid} says hi`)
    }
  })

}

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



// app.get('/users', db.getUsers)
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


// app.listen(3011, () => {
//   console.log('Server listening on port 3011!');
// });





// const getUsers =  (request, response) => {
//   pool.query('SELECT * FROM product', (error, results) => {
//   if (error) {
//     throw error
//   }
//   console.log(results)
//   response.send(results)
// })


// }

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM product', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }
