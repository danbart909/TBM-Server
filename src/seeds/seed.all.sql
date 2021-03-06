INSERT INTO products (title, description, category, price, url)
VALUES
  ('Black Bear', 'Cuddly bear family abducted from the wild! Caution is advised for small children and anyone who wants to keep their limbs.', 'animals', 500, 'https://i.imgur.com/n4jPBwO.png'),
  ('Butterfly', "Beautiful black butterfly found inside the cracked core of a meteorite. It hasn't killed anyone... yet.", 'animals', 5, 'https://i.imgur.com/lE2yQ9O.jpg'),
  ('Cow', 'This is a talking cow. Unfortunately, he only does small talk and is awfully chatty.', 'animals', 200, 'https://i.imgur.com/HbcDOaY.jpg'),
  ('Kitten', 'This kitten is a monster of unspeakable evil. Only a fool would buy one of these kittens. Beware! You have been warned! THIS MEANS YOU!', 'animals', 20, 'https://i.imgur.com/nLllPQ7.jpg'),
  ('Puppy', 'This is a totally harmless puppy, looking for a welcoming family to come home to.', 'animals', 20, 'https://i.imgur.com/dLQXfBS.jpg'),
  ('Raven', 'This raven can read your mind. They often fly away as far as possible.', 'animals', 10, 'https://i.imgur.com/ezYivEA.jpg'),
  ('Rooster', 'This rooster can read your mind but loves you anyway.', 'animals', 10, 'https://i.imgur.com/r0e7Ydo.jpg'),
  ('Chair', 'Former chair of Henry VIII of England.', 'furniture', 25, 'https://i.imgur.com/2LIzXbO.jpg'),
  ('Chair 2', 'Former chair of Zhu Houzhao.', 'furniture', 25, 'https://i.imgur.com/zxcLlpz.jpg'),
  ('Sofa', 'Former sofa of Charles VI.', 'furniture', 100, 'https://i.imgur.com/KGa2QnM.jpg'),
  ('Sofa 2', 'Former sofa of Nero.', 'furniture', 100, 'https://i.imgur.com/5jCF2Z3.jpg'),
  ('Table', 'Former table of Caligula.', 'furniture', 75, 'https://i.imgur.com/2alPKp1.jpg'),
  ('Table 2', 'Former table of Ivan the Terrible.', 'furniture', 75, 'https://i.imgur.com/1nGbnOX.jpg'),
  ('Coffin Bookcase', 'Former bookcase of Dracula.', 'household', 75, 'https://i.imgur.com/EKJlwAU.jpg'),
  ('Hair Dryer', 'Just a regular hair dryer, for drying your hair and electrocuting people in bathtubs.', 'household', 20, 'https://i.imgur.com/k25a9kR.jpg'),
  ('Lamp', 'This lamp illuminates the room, but it does not contain a genie.', 'household', 15, 'https://i.imgur.com/BY73zrv.jpg'),
  ('Lamp 2', 'This lamp illuminates the room and may actually contain a genie.', 'household', 15, 'https://i.imgur.com/7OIRs8q.jpg'),
  ('Salt & Pepper Shakers', 'Cumin & Cinnamon Shakers, disguised as Salt & Pepper Shakers.', 'household', 10, 'https://i.imgur.com/n3v7SeK.jpg'),
  ('Small Fan', "This is a nuclear-powered fan, which can generate winds high enough to push over a school bus. You'll be kept cool, guaranteed!", 'household', 10000, 'https://i.imgur.com/vuQDVS5.jpg'),
  ('Watch', 'Tells the time. Also paints you as a target for muggers and theives.', 'household', 5000, 'https://i.imgur.com/AffmtV3.jpg'),
  ('BMW', 'BMW 2020 X6 Vantablack', 'vehicle', 75000, 'https://i.imgur.com/JG11eTT.jpg'),
  ('Ferrari', 'Black Velvet Ferrari', 'vehicle', 250000, 'https://i.imgur.com/FPZdsXR.jpg'),
  ('Pogo Stick', 'This pogo stick actually makes you younger, healthier, and better-looking with every bounce! Take care not to overuse, lest you become a gorgeous baby.', 'vehicle', 100000, 'https://i.imgur.com/sj6mXQV.jpg'),
  ('Skateboard', "This is a flying skateboard. Like a hoverboard, but better! It's the buyer's responsibility to find a way to stay on. Helmet recommended.", 'vehicle', 125000, 'https://i.imgur.com/NQi69bj.jpg'),
  ('Space Shuttle', 'I was cutting the grass the found a few of these in my backyard. Sold AS IS.', 'vehicle', 200, 'https://i.imgur.com/lFhrnJu.jpg'),
  ('TIE Fighter', "Long-range TIE Fighter complete with Hyperdrive. Your ticket out of the solar system and away from all those other suckers stuck on Earth! Warning: Will never hit what you're aiming at.", 'vehicle', 5000000000, 'https://i.imgur.com/39whCAf.jpg');

INSERT INTO users (username, password)
VALUES
  ('user1', 'Password1!'),
  ('user2', 'Password2!'),
  ('user3', 'Password3!');

INSERT INTO invoices (user_id, checked_out)
VALUES
  (1, 'true'),
  (2, 'true'),
  (3, 'true'),
  (1, 'false'),
  (2, 'false'),
  (3, 'false');

INSERT INTO invoice_products (invoice_id, product_id, user_id, quantity)
VALUES
  (1, 1, 1, 1),
  (1, 2, 1, 4),
  (1, 7, 1, 2),
  (2, 14, 2, 1),
  (2, 15, 2, 1),
  (2, 16, 2, 2),
  (3, 23, 3, 1),
  (3, 9, 3, 2),
  (3, 18, 3, 3),
  (4, 26, 1, 1),
  (4, 18, 1, 2),
  (4, 15, 1, 1),
  (5, 21, 2, 2),
  (5, 24, 2, 4),
  (5, 12, 2, 8),
  (6, 19, 3, 4),
  (6, 21, 3, 1),
  (6, 5, 3, 88);