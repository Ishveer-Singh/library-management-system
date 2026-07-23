require("dotenv").config();
const express = require("express")
const db = require("./db");

const app = express();
app.use(express.json());

const errorHandler = require("./middleware/errorHandler")

const bookRoutes = require("./routes/booksRoutes");
const membersRoutes = require("./routes/membersRoutes")
const issuedBooksRoutes = require("./routes/issuedBooksRoutes")

app.use(bookRoutes)
app.use(membersRoutes)
app.use(issuedBooksRoutes)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})