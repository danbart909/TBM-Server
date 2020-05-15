INSERT INTO products (title, description, category, price, url)
VALUES
  ('Black Bear', 'description for Black Bear', 'animals', 500, 'https://i.imgur.com/n4jPBwO.png'),
  ('Butterfly', 'description for Butterfly', 'animals', 5, 'https://i.imgur.com/lE2yQ9O.jpg'),
  ('Cow', 'description for Cow', 'animals', 200, 'https://i.imgur.com/HbcDOaY.jpg'),
  ('Kitten', 'description for Kitten', 'animals', 20, 'https://i.imgur.com/nLllPQ7.jpg'),
  ('Puppy', 'description for Puppy', 'animals', 20, 'https://i.imgur.com/dLQXfBS.jpg'),
  ('Raven', 'description for Raven', 'animals', 10, 'https://i.imgur.com/ezYivEA.jpg'),
  ('Rooster', 'description for Rooster', 'animals', 10, 'https://i.imgur.com/r0e7Ydo.jpg'),
  ('Chair', 'description for Chair', 'furniture', 25, 'https://i.imgur.com/2LIzXbO.jpg'),
  ('Chair 2', 'description for Chair 2', 'furniture', 25, 'https://i.imgur.com/zxcLlpz.jpg'),
  ('Sofa', 'description for Sofa', 'furniture', 100, 'https://i.imgur.com/KGa2QnM.jpg'),
  ('Sofa 2', 'description for Sofa 2', 'furniture', 100, 'https://i.imgur.com/5jCF2Z3.jpg'),
  ('Table', 'description for Table', 'furniture', 75, 'https://i.imgur.com/2alPKp1.jpg'),
  ('Table 2', 'description for Table 2', 'furniture', 75, 'https://i.imgur.com/1nGbnOX.jpg'),
  ('Coffin Bookcase', 'description for Coffin Bookcase', 'household', 75, 'https://i.imgur.com/EKJlwAU.jpg'),
  ('Hair Dryer', 'description for Hair Dryer', 'household', 20, 'https://i.imgur.com/k25a9kR.jpg'),
  ('Lamp', 'description for Lamp', 'household', 15, 'https://i.imgur.com/BY73zrv.jpg'),
  ('Lamp 2', 'description for Lamp 2', 'household', 15, 'https://i.imgur.com/7OIRs8q.jpg'),
  ('Salt & Pepper Shakers', 'description for Salt & Pepper Shakers', 'household', 10, 'https://i.imgur.com/n3v7SeK.jpg'),
  ('Small Fan', 'description for nuclear-powered Small Fan', 'household', 10000, 'https://i.imgur.com/vuQDVS5.jpg'),
  ('Watch', 'description for Watch', 'household', 5000, 'https://i.imgur.com/AffmtV3.jpg'),
  ('BMW', 'description for BMW', 'vehicle', 75000, 'https://i.imgur.com/JG11eTT.jpg'),
  ('Ferrari', 'description for Ferrari', 'vehicle', 250000, 'https://i.imgur.com/FPZdsXR.jpg'),
  ('Pogo Stick', 'description for Pogo Stick', 'vehicle', 100000, 'https://i.imgur.com/sj6mXQV.jpg'),
  ('Skateboard', 'description for Skateboard', 'vehicle', 125000, 'https://i.imgur.com/NQi69bj.jpg'),
  ('Space Shuttle', 'description for Space Shuttle', 'vehicle', 200, 'https://i.imgur.com/lFhrnJu.jpg'),
  ('TIE Fighter', 'description for TIE Fighter', 'vehicle', 5000000000, 'https://i.imgur.com/39whCAf.jpg');

INSERT INTO users (username, password)
VALUES
  ('user1', 'Password1!'),
  ('user2', 'Password2!'),
  ('user3', 'Password3!');

INSERT INTO invoices (user_id, checked_out)
VALUES
  (1, 'false'),
  (2, 'false'),
  (3, 'false'),
  (1, 'true'),
  (2, 'true'),
  (3, 'true');

INSERT INTO invoice_products (invoice_id, product_id, quantity)
VALUES
  (1, 1, 1),
  (1, 2, 4),
  (1, 7, 2),
  (2, 14, 1),
  (2, 15, 1),
  (2, 16, 2),
  (3, 23, 1),
  (3, 9, 2),
  (3, 18, 1),
  (4, 26, 1),
  (4, 18, 2),
  (4, 15, 1),
  (5, 21, 1),
  (5, 24, 4),
  (5, 12, 8),
  (5, 19, 3),
  (6, 21, 1),
  (6, 5, 88),
  (6, 11, 3);