const express = require("express");
require("dotenv").config();
const connectToDB = require("./config/db");


// Connection To Database
connectToDB();

// Init App
const app = express();


// Apply Middlewares
app.use(express.json());
app.use(require('./middlewares/logger'));

// Error Handler  Middlewares
// app.use(require("./middlewares/notFound"));
// app.use(require('./middlewares/objectId'));

// Routes
app.use("/api/books", require("./routes/booksRouter"));
app.use("/api/authors", require("./routes/authorsRouter"));
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/users", require("./routes/usersRouter"));


// Running The Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
