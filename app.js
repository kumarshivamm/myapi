require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
const connectDB = require("./db/connect")

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products")

app.use(cors());

// Middleware to enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.get("/", (req, res) => {
    res.send("Hi I am live")
});

// middleware or to set Router
app.use("/products", products_routes);  

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();