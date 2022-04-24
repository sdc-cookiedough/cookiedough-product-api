CREATE TABLE products (
  id serial primary key,
  name text,
  slogan text,
  description text,
  category text,
  default_price money null
);

INSERT INTO products VALUES (0, 'zero', 'zero', 'zero', 'zero', 0);

CREATE TABLE styles (
  id serial primary key,
  productId int references products(id),
  name text,
  sale_price money null,
  original_price money null,
  default_style boolean
);

CREATE TABLE features (
  id serial primary key,
  product_id int references products(id),
  feature text,
  value text
);

CREATE TABLE photos (
  id serial primary key,
  styleId int references styles(id),
  url text,
  thumbnail_url text
);

CREATE TABLE related (
  id serial primary key,
  current_product_id int references products(id),
  related_product_id int references products(id)
);

CREATE TABLE skus (
  id serial primary key,
  styleId int references styles(id),
  size text,
  quantity int
);