CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);