const express = require('express');
const app = express();
const db = require('./db')
const port = 3000;

// create .env file

// app.get('/product/:id', (req, res) => {
//   // make 3 queries - product, features, style
//   db.query('SELECT styles.id, styles.name, skus.id, skus.size, skus.quantity FROM products INNER JOIN styles ON products.id = styles.productId INNER JOIN skus ON skus.styleId = styles.id WHERE styles.id = $1;', [req.params.id], (err, response) => {
//     if (err) {
//       console.log(err.stack)
//     }
//     res.send(response.rows);
//   })
// })

// page	integer	Selects the page of results to return. Default 1.
// count	integer	Specifies how many results per page to return. Default 5.
// maybe find a way to write this query better? page/count/offset data types are all over the place
app.get('/products', (req, res) => {
  let page = req.query.page || '1';
  let count = req.query.count || '5';
  let offset = (Number(page) - 1) * Number(count);
  db.query('SELECT id, name, slogan, description, category, default_price FROM products LIMIT $1 OFFSET $2',
  [count, offset.toString()],
  (err, response) => {
    if (err) {
      console.log(err.stack);
    }
    res.send(response.rows);
  })
})

app.get('/products/:product_id', (req, res) => {
  // req.param.product_id
})

app.get('/products/:product_id/styles')

app.get('/products/:product_id/related')


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})