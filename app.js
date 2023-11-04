const express = require("express");
require("dotenv").config();
const connectToDB = require("./config/db");
const {notFound, errorHanlder} = require("./middlewares/errors");
const cors = require("cors");
const helmet = require('helmet');



// Connection To Database
connectToDB();

// Init App
const app = express();


// Apply Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(require('./middlewares/logger'));

//Helmet :
app.use(helmet());


// Cors Policy
app.use(cors());

// Set View Engine
app.set('view engine', 'ejs');

// Routes
app.use("/api/books", require("./routes/booksRouter"));
app.use("/api/authors", require("./routes/authorsRouter"));
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/upload", require("./routes/uploadImage"));
app.use("/password", require("./routes/password"));


// Error Hanlder Middleware
app.use(notFound);
app.use(errorHanlder);

// Running The Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
