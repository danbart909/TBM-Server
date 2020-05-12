CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  FOREIGN KEY cart_id REFERENCES cart(id),
  FOREIGN KEY product_id REFERENCES products(id),
  quantity INTEGER NOT NULL,
  date_of_checkout new Date()
)