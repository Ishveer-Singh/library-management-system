require("dotenv").config();
const express = require("express")

const helmet = require("helmet");
const cors = require("cors");

const db = require("./db");
const app = express();

const limiter = require("./middleware/rateLimiter")

app.use(helmet());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(limiter);

app.use(express.json());

const errorHandler = require("./middleware/errorHandler")

const bookRoutes = require("./routes/booksRoutes");
const membersRoutes = require("./routes/membersRoutes")
const issuedBooksRoutes = require("./routes/issuedBooksRoutes")
const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/books",bookRoutes)
app.use("/api/v1/members",membersRoutes)
app.use("/api/v1/issued-books",issuedBooksRoutes)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

