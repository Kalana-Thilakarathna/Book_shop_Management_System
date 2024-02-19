const express = require("express");
const mongoose = require("mongoose");
const BookRoutes = require("./Routes/BookRoutes");
const cors = require("cors")
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "you are in the root" });
});

//middleware for handling cors policy
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["content-Type"]
}))

//middleware for parsing request body
app.use(express.json());

app.use("/books", BookRoutes);

mongoose
  .connect(
    "mongodb+srv://kalana2100:M3MOvTsZH4IcwmYW@cluster0.k7tcg4b.mongodb.net/book_shop?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DataBase connetcted");
  })
  .catch((err) => {
    console.log("error is ", err);
  });

app.listen(5000, () => {
  console.log("server listning at port 5000");
});

//M3MOvTsZH4IcwmYW
//kalana2100
//mongodb+srv://kalana2100:<password>@cluster0.k7tcg4b.mongodb.net/?retryWrites=true&w=majority
