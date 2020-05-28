const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function cleanTables(db) {
  return db.transaction(trx => 
    trx.raw(
      `TRUNCATE
      invoices,
      invoice_products,
      users,
      products`
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE invoices_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE invoice_products_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE products_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('invoices_id_seq', 0)`),
        trx.raw(`SELECT setval('invoice_products_id_seq', 0)`),
        trx.raw(`SELECT setval('users_id_seq', 0)`),
        trx.raw(`SELECT setval('products_id_seq', 0)`)
      ])
    )
  )
}

function makeProductArray() {
  return [
    {
      "id": 1,
      "title": "Black Bear",
      "description": "description for Black Bear",
      "category": "animals",
      "price": "$500.00",
      "url": "https://i.imgur.com/n4jPBwO.png"
  },
  {
      "id": 2,
      "title": "Butterfly",
      "description": "description for Butterfly",
      "category": "animals",
      "price": "$5.00",
      "url": "https://i.imgur.com/lE2yQ9O.jpg"
  },
  {
      "id": 3,
      "title": "Cow",
      "description": "description for Cow",
      "category": "animals",
      "price": "$200.00",
      "url": "https://i.imgur.com/HbcDOaY.jpg"
  },
  {
      "id": 4,
      "title": "Kitten",
      "description": "description for Kitten",
      "category": "animals",
      "price": "$20.00",
      "url": "https://i.imgur.com/nLllPQ7.jpg"
  },
  {
      "id": 5,
      "title": "Puppy",
      "description": "description for Puppy",
      "category": "animals",
      "price": "$20.00",
      "url": "https://i.imgur.com/dLQXfBS.jpg"
  },
  {
      "id": 6,
      "title": "Raven",
      "description": "description for Raven",
      "category": "animals",
      "price": "$10.00",
      "url": "https://i.imgur.com/ezYivEA.jpg"
  },
  {
      "id": 7,
      "title": "Rooster",
      "description": "description for Rooster",
      "category": "animals",
      "price": "$10.00",
      "url": "https://i.imgur.com/r0e7Ydo.jpg"
  },
  {
      "id": 8,
      "title": "Chair",
      "description": "description for Chair",
      "category": "furniture",
      "price": "$25.00",
      "url": "https://i.imgur.com/2LIzXbO.jpg"
  },
  {
      "id": 9,
      "title": "Chair 2",
      "description": "description for Chair 2",
      "category": "furniture",
      "price": "$25.00",
      "url": "https://i.imgur.com/zxcLlpz.jpg"
  },
  {
      "id": 10,
      "title": "Sofa",
      "description": "description for Sofa",
      "category": "furniture",
      "price": "$100.00",
      "url": "https://i.imgur.com/KGa2QnM.jpg"
  },
  {
      "id": 11,
      "title": "Sofa 2",
      "description": "description for Sofa 2",
      "category": "furniture",
      "price": "$100.00",
      "url": "https://i.imgur.com/5jCF2Z3.jpg"
  },
  {
      "id": 12,
      "title": "Table",
      "description": "description for Table",
      "category": "furniture",
      "price": "$75.00",
      "url": "https://i.imgur.com/2alPKp1.jpg"
  },
  {
      "id": 13,
      "title": "Table 2",
      "description": "description for Table 2",
      "category": "furniture",
      "price": "$75.00",
      "url": "https://i.imgur.com/1nGbnOX.jpg"
  },
  {
      "id": 14,
      "title": "Coffin Bookcase",
      "description": "description for Coffin Bookcase",
      "category": "household",
      "price": "$75.00",
      "url": "https://i.imgur.com/EKJlwAU.jpg"
  },
  {
      "id": 15,
      "title": "Hair Dryer",
      "description": "description for Hair Dryer",
      "category": "household",
      "price": "$20.00",
      "url": "https://i.imgur.com/k25a9kR.jpg"
  },
  {
      "id": 16,
      "title": "Lamp",
      "description": "description for Lamp",
      "category": "household",
      "price": "$15.00",
      "url": "https://i.imgur.com/BY73zrv.jpg"
  },
  {
      "id": 17,
      "title": "Lamp 2",
      "description": "description for Lamp 2",
      "category": "household",
      "price": "$15.00",
      "url": "https://i.imgur.com/7OIRs8q.jpg"
  },
  {
      "id": 18,
      "title": "Salt & Pepper Shakers",
      "description": "description for Salt & Pepper Shakers",
      "category": "household",
      "price": "$10.00",
      "url": "https://i.imgur.com/n3v7SeK.jpg"
  },
  {
      "id": 19,
      "title": "Small Fan",
      "description": "description for nuclear-powered Small Fan",
      "category": "household",
      "price": "$10,000.00",
      "url": "https://i.imgur.com/vuQDVS5.jpg"
  },
  {
      "id": 20,
      "title": "Watch",
      "description": "description for Watch",
      "category": "household",
      "price": "$5,000.00",
      "url": "https://i.imgur.com/AffmtV3.jpg"
  },
  {
      "id": 21,
      "title": "BMW",
      "description": "description for BMW",
      "category": "vehicle",
      "price": "$75,000.00",
      "url": "https://i.imgur.com/JG11eTT.jpg"
  },
  {
      "id": 22,
      "title": "Ferrari",
      "description": "description for Ferrari",
      "category": "vehicle",
      "price": "$250,000.00",
      "url": "https://i.imgur.com/FPZdsXR.jpg"
  },
  {
      "id": 23,
      "title": "Pogo Stick",
      "description": "description for Pogo Stick",
      "category": "vehicle",
      "price": "$100,000.00",
      "url": "https://i.imgur.com/sj6mXQV.jpg"
  },
  {
      "id": 24,
      "title": "Skateboard",
      "description": "description for Skateboard",
      "category": "vehicle",
      "price": "$125,000.00",
      "url": "https://i.imgur.com/NQi69bj.jpg"
  },
  {
      "id": 25,
      "title": "Space Shuttle",
      "description": "description for Space Shuttle",
      "category": "vehicle",
      "price": "$200.00",
      "url": "https://i.imgur.com/lFhrnJu.jpg"
  },
  {
      "id": 26,
      "title": "TIE Fighter",
      "description": "description for TIE Fighter",
      "category": "vehicle",
      "price": "$5,000,000,000.00",
      "url": "https://i.imgur.com/39whCAf.jpg"
  }
  ]
}

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'user1',
      password: 'Password1!'
    },
    {
      id: 2,
      username: 'user2',
      password: 'Password2!'
    },
    {
      id: 3,
      username: 'user3',
      password: 'Password3!'
    }
  ]
}

function makeInvoicesArray() {
  return [
    {
      id: 1,
      user_id: 1,
      date: new Date(),
      checked_out: true
    },
    {
      id: 2,
      user_id: 2,
      date: new Date(),
      checked_out: true
    },
    {
      id: 3,
      user_id: 3,
      date: new Date(),
      checked_out: true
    },
    {
      id: 4,
      user_id: 1,
      date: new Date(),
      checked_out: false
    },
    {
      id: 5,
      user_id: 2,
      date: new Date(),
      checked_out: false
    },
    {
      id: 6,
      user_id: 3,
      date: new Date(),
      checked_out: false
    },
  ]
}

function makeInvoice_ProductsArray() {
  return [
    {
      id: 1,
      invoice_id: 1,
      product_id: 1,
      user_id: 1,
      quantity: 1
    },
    {
      id: 2,
      invoice_id: 1,
      product_id: 2,
      user_id: 1,
      quantity: 4
    },
    {
      id: 3,
      invoice_id: 1,
      product_id: 7,
      user_id: 1,
      quantity: 2
    },
    {
      id: 4,
      invoice_id: 2,
      product_id: 14,
      user_id: 2,
      quantity: 1
    },
    {
      id: 5,
      invoice_id: 2,
      product_id: 15,
      user_id: 2,
      quantity: 1
    },
    {
      id: 6,
      invoice_id: 2,
      product_id: 16,
      user_id: 2,
      quantity: 2
    },
    {
      id: 7,
      invoice_id: 3,
      product_id: 23,
      user_id: 3,
      quantity: 1
    },
    {
      id: 8,
      invoice_id: 3,
      product_id: 9,
      user_id: 3,
      quantity: 2
    },
    {
      id: 9,
      invoice_id: 3,
      product_id: 18,
      user_id: 3,
      quantity: 3
    },
    {
      id: 10,
      invoice_id: 5,
      product_id: 21,
      user_id: 2,
      quantity: 2
    },
    {
      id: 11,
      invoice_id: 5,
      product_id: 24,
      user_id: 2,
      quantity: 1
    },
    {
      id: 12,
      invoice_id: 5,
      product_id: 12,
      user_id: 2,
      quantity: 8
    },
    {
      id: 13,
      invoice_id: 6,
      product_id: 15,
      user_id: 3,
      quantity: 1
    },
    {
      id: 14,
      invoice_id: 6,
      product_id: 19,
      user_id: 3,
      quantity: 4
    }
  ]
}

function seedUsers(db, users) {
  return db.into('users').insert(users)
    .then(() =>
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedProducts(db, products) {
  return db.into('products').insert(products)
    .then(() =>
      db.raw(
        `SELECT setval('products_id_seq', ?)`,
        [products[products.length - 1].id],
      )
    )
}

function seedInvoices(db, invoices) {
  return db.into('invoices').insert(invoices)
    .then(() =>
      db.raw(
        `SELECT setval('invoices_id_seq', ?)`,
        [invoices[invoices.length - 1].id],
      )
    )
}

function seedInvoice_Products(db, invoice_products) {
  return db.into('invoice_products').insert(invoice_products)
    .then(() =>
      db.raw(
        `SELECT setval('invoice_products_id_seq', ?)`,
        [invoice_products[invoice_products.length - 1].id]
    ))
}

function categoryItems(category) {
  const items = makeProductArray()
  const categoryItems = []
  for (i = 0; i < items.length; i++) {
    if (items[i].category == category) {
      categoryItems.push(items[i])
    }
  }
  return categoryItems
}

function getCartById(id) {
  const allCarts = makeInvoice_ProductsArray()
  const thisCart = []
  for (i = 0; i < allCarts.length; i++) {
    if (allCarts[i].user_id == id) {
      thisCart.push(allCarts[i])
    }
  }
  return thisCart
}

function addToCart(newItem, cart) {
  const nC = cart.concat(newItem)
  return nC
}

function deleteFromCart(id, cart) {
  return cart - id
}

function seeds(db, users, products, invoices, invoice_products) {
  return db.transaction(async trx => {
    await seedUsers(trx, users),
    await seedProducts(trx, products),
    await seedInvoices(trx, invoices),
    await seedInvoice_Products(trx, invoice_products)
  })
}

function makeFixtures() {
  const testProducts = makeProductArray()
  const testUsers = makeUsersArray()
  const testInvoices = makeInvoicesArray()
  const testInvoice_Products = makeInvoice_ProductsArray()
  return { testProducts, testUsers, testInvoices, testInvoice_Products }
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  cleanTables,
  makeUsersArray,
  makeProductArray,
  makeInvoicesArray,
  makeInvoice_ProductsArray,
  seeds,
  seedUsers,
  seedProducts,
  seedInvoices,
  seedInvoice_Products,
  makeAuthHeader,
  makeFixtures,
  categoryItems,
  getCartById,
  addToCart,
  deleteFromCart,
}