# The Black Market (Server)

Here is the repository for the The Black Market's back end.

## Heroku URL for Database

### URL

https://protected-oasis-11818.herokuapp.com

### Client Code

https://github.com/OmarMutd/TBM-Client

### Endpoints

#### GET /api/products/search?=searchterm=*input*

##### search for product by title

#### GET /api/products

##### gets all products

#### GET /api/products/:id ( = product id)

##### gets info for product by id

#### GET /api/products/categories

##### lists current categories

#### GET /api/products/category/:category ( = animals, furniture, household, vehicles)

##### lists all products in given category

#### GET /api/cart

##### returns the users's current cart

#### POST /api/cart

##### adds new item to user's cart (body requires: product_id, quantity)

#### DELETE /api/cart

##### empties current user's cart

#### DELETE /api/cart/:id ( = product.id)

##### deletes item in cart

#### GET /api/cart/history

##### gets order history of user

#### PATCH /api/cart/checkout

##### checks out current shopping cart & creates a new empty cart
