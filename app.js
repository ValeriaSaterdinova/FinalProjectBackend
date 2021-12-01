const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;

app.use(cors());
app.use(express.json());

const buyScheme = new Schema({
  text: String,
  date: String,
  price: Number
});

const Buy = mongoose.model("buys", buyScheme);

const uri = 'mongodb+srv://ValeriaSaterdinova:restart987*@education.cssf9.mongodb.net/AllBuys?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/allBuys', (req, res) => {
  Buy.find().then(result => {
    res.send({data: result});
  });
});

app.post('/createBuys', (req, res) => {
  if (req.body.hasOwnProperty('text') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('date')){
    const buy = new Buy(req.body);
    buy.save().then(result => {
      res.send({data: result});
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
});

app.patch('/updateBuy', (req, res) => {
  if (req.body.hasOwnProperty('_id') && (req.body.hasOwnProperty('text') || req.body.hasOwnProperty('price') || req.body.hasOwnProperty('date'))) {
    Buy.updateOne({_id: req.body._id}, req.body).then(result => {
      Buy.find({_id: req.body._id}).then(result => {
        res.send({data: result});
      });
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
});

app.delete('/deleteBuy', (req, res) => {
  if (req.query.hasOwnProperty('_id')) {
    Buy.deleteOne({_id: req.query._id}).then(result => {
      res.send('Buys deleted');
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
  });

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
}); 