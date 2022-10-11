const dotenv = require("dotenv").config();
const express = require ("express");
const mongoose = require("mongoose");
const path = require("path")
var bodyParser = require('body-parser')


const contactsRouter = require('./routes/contactsRoutes')

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))


app.use('/', contactsRouter);

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
