const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

app.use(cors());
app.use(parser.json());
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
  const { spawn } = require('child_process')
  const pid = process.pid;
  const server = app.listen(port, () => {
    console.log(`Worker ${process.pid} started`);
  })

  app.get('/', (req, res, next) => {
    for (var i = 0 ; i < 2e6 ; i++){
      res.send(`Process ${pid} says hi`)
    }
  })

}