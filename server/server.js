//Config express
const express = require("express");

const dotenv = require("dotenv");
const logger = require('./logger/logger');

const process = require("process");

const connectToDatabase = require('./config/database');
const requestLogger = require('./middleware/requestLogger'); 
const errorHandler = require('./middleware/errorHandler');
const registerRoutes = require("./routes/registerRoutes");  
const cors = require("cors");

dotenv.config();

const app = express();

// configuration cors
const corsOptions = {
  origin: ["http://localhost:5173", "https://api.coingecko.com/"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// middleware pour parser le json
app.use(express.json()); 

// connect to the database
connectToDatabase();

// use the request logger middleware
app.use(requestLogger); 

registerRoutes(app); 

// error handling middleware
app.use(errorHandler); 
 
app.listen(process.env.PORT, () => {
  logger.info(`listening on port ${process.env.PORT}`);  
});
