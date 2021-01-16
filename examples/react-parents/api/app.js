const express = require('express');
const cors = require('cors');
const { Gadget } = require('./db.js');

const app = express();

const allowedTypes = ['tablet', 'laptop'];
app.use(cors());
app.get('/api/gadgets', (req, res) => {
  const queryObject = {};
  const t = req.query.gadgetType;
  console.log(queryObject);
  if (t && allowedTypes.indexOf(t) > -1) {
    queryObject.type = t;
  }
  Gadget.find(queryObject, (err, result) => {
    res.json(result.map((g) => {
      return { type: g.type, name: g.name };
    }));
  });
});

/*
db.gadgets.insert({ type: 'tablet', name: 'Microsoft Surface Go' })
db.gadgets.insert({ type: 'laptop', name: 'Samsung Chromebook Pro'})
db.gadgets.insert({ type: 'tablet', name: 'Chuwi Hi9 Pro'})
db.gadgets.inert({ type: 'laptop', name: 'Macbook Pro 2018' })
*/

app.listen(3001);
