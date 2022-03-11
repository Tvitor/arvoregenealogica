// import dotenv from 'dotenv';

// dotenv.config();

const express = require('express');
const router = require('./src/routes/routes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(router);
  }
}

export default new App().app;
