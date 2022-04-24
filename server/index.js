const express = require('express');
const app = express();
const db = require('./db')
const port = 3000;
require('dotenv').config();

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
    }
  )
})

app.get('/products/:product_id', (req, res) => {
  console.log(req.query)
  db.query(`
  SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price, (array(
    SELECT row_to_json(t)
    FROM (
      SELECT features.feature, features.value
      FROM features
      INNER JOIN products
      ON products.id = features.product_id
      WHERE products.id = $1
    ) t
  )) AS features
  FROM products
  WHERE products.id = $1;`, [req.params.product_id], (err, response) => {
    if (err) {
      console.log(err.stack);
    }
    res.send(response.rows[0]);
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  db.query(`SELECT p.id AS product_id,
  (SELECT json_agg(t2) FROM
    (SELECT styles.id AS style_id, styles.name,
      styles.original_price, styles.sale_price,
      styles.default_style AS "default\?",
      (SELECT json_agg(t3) FROM
        (SELECT photos.thumbnail_url, photos.url
        FROM photos where photos.styleId = styles.id
        AND styles.productId = p.id
        ) AS t3
      ) AS photos,
      (SELECT jsonb_object_agg(id, key_pair) FROM
        (SELECT
          skus.id,
          (SELECT json_build_object
            ('size', skus.size, 'quantity', skus.quantity)
          ) key_pair
          FROM skus INNER JOIN styles
          ON styles.id = skus.styleId
          WHERE skus.styleId = styles.id
          AND styles.productId = p.id GROUP BY skus.id
        ) AS asdf) AS skus FROM styles where productId = p.id
    ) AS t2
  ) AS results
  FROM products AS p WHERE p.id = $1;`, [req.params.product_id], (err, response) => {
    if (err) {
      console.log(err.stack);
    }
    res.send(response.rows[0]);
  })
})

app.get('/products/:product_id/related', (req, res) => {
  db.query(`
    SELECT array_agg(related.related_product_id) AS related
    FROM related
    INNER JOIN products
    ON products.id = related.current_product_id
    WHERE products.id = $1
  `, [req.params.product_id], (err, response) => {
      if (err) {
        console.log(err.stack);
      }
      res.send(response.rows[0].related);
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port} lmao`)
})
