# Clone of Newegg Add To Cart and Best Sellers

This repository contains the sourcecode for a single component of a clone of NewEgg.com, built with a microservice architecture. The component is designed as a full stack service and includes an in-store memeory database, along with a web server which serves a client application and a restful api. 

For this project, a team of developers each contributed individual components which were combined into a full listing page. To view the complete listing application, check out the related listing page repo.

# Technical Information

## Dependencies:
- [Node.js](https://github.com/nodejs/node) with the [Express.js](https://github.com/expressjs/express) framework
- SQLite3 with the [sqlite3 node driver](https://www.npmjs.com/package/sqlite3)
- [React](https://github.com/facebook/react) framework
- Testing
  - [Jest](https://github.com/facebook/jest)

## Project Overview

Data was generated for 100 items using my own functions as well as ```Faker.js``` to generate random company names and then stored in the SQLite3 database. Data was then accsessed using the SQLite3 node driver and displayed to the front-end using React. This was all done in an Express framework. Modal windows were created using raw html and css with consideration for older browsers.

Optimization was accounted for by using gzip compression on bundle assets while also using npm packages designed for additional compression. 

## Project Gallery

# Add To Cart

Add To Cart section with react state implemented in the quantity section

![Alt Text](https://giphy.com/gifs/24mNfFOwV4HMPPEFRH.gif)

# Best Sellers
Best Sellers section with modal popups done in raw HTML and CSS. Eggs also used dynamic CSS styling to render depending on competitor score

![Alt Text](https://giphy.com/gifs/uWnpISgrnIiXaaaHeP.gif)

## Special Thanks
[Marc](https://github.com/omenwolf)
[Danny](https://github.com/dmaziad)
