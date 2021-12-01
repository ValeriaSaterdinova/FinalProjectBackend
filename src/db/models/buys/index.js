const mongoose = require("mongoose");

const { Schema } = mongoose;

const buyScheme = new Schema({
    text: String,
    date: String,
    price: Number
  });

const Buy = mongoose.model("buys", buyScheme);