require("dotenv").config();
const express = require("express")

const helmet = require("helmet");
const cors = require("cors");

const db = require("./db");
const app = express();

const limiter = require("./middleware/rateLimiter")

app.use(helmet());

app.use(cors({
    origin: "https://library-management-frontend-teh2.onrender.com",
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});