CREATE TABLE cart (
  id INTEGER REFERENCES users(cart_id),
  products TEXT,
);