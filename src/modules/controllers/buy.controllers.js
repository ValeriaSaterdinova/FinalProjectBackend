const Buy = require('../../db/models/buys/index');

module.exports.getAllBuys = (req, res) => {
  Buy.find().then(result => {
    res.send({ data: result });
  });
};

module.exports.createNewBuy = (req, res) => {
  if (req.body.hasOwnProperty('text') && req.body.hasOwnProperty('price') && req.body.hasOwnProperty('date')) {
    const buy = new Buy(req.body);
    buy.save().then(result => {
      res.send({ data: result });
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
};

module.exports.changeBuyInfo = (req, res) => {
  if (req.body.hasOwnProperty('_id') &&
    (
      req.body.hasOwnProperty('text') ||
      req.body.hasOwnProperty('price') ||
      req.body.hasOwnProperty('date')
    )) {
    Buy.updateOne({ _id: req.body._id }, req.body).then(result => {
      Buy.find({ _id: req.body._id }).then(result => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
};

module.exports.deleteBuy = (req, res) => {
  if (req.query.hasOwnProperty('_id')) {
    Buy.deleteOne({ _id: req.query._id }).then(result => {
      res.send('Buys deleted');
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
};