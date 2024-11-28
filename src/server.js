import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import routes from './routes/routes';
import loginroute from './routes/userRoutes';

const dotenv = require('dotenv');
dotenv.config({ silent: true });
// initialize
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};
// enable/disable cross origin resource sharing if necessary
app.use(cors(corsOptions));

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use('', routes);
app.use('', loginroute);
// additional init stuff should go before hitting the routing

// default index route
app.get('/', (req, res) => {
  res.send('hi');
});

async function startServer() {
  try {
    // connect DB
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log(`Mongoose connected to: ${mongoURI}`);

    const port = process.env.PORT || 9090;
    app.listen(port);

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}

startServer();