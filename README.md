# The Black Market (Server)

Here is the repository for the The Black Market's back end.  



## Database credentials

### Host:

ec2-35-168-54-239.compute-1.amazonaws.com
    
### Database:

d2tvhidlfaub47
    
### User:

rrjvakuvnljofw
    
### Port:

5432
    
### Password:

9f853ac175a6eb2b8bde0b9f607745b874f6064a5b4690da8b57ae5b86172100
    
### URI:

postgres://nqbolyypkxkepc:79b7464e689390907efce8739cd2b50c41e987319b52e9ac3c4d3f662d551831@ec2-52-202-146-43.compute-1.amazonaws.com:5432/d2tvhidlfaub47

### Heroku CLI

heroku pg:psql postgresql-animated-06148 --app protected-oasis-11818



## Heroku URL for Database

### URL

https://protected-oasis-11818.herokuapp.com

### Endpoints

#### GET /api/products/search?=searchterm=*input*

##### search for product by title

#### GET /api/products

##### gets all products

#### GET /api/products/:id

##### gets info for product by :id

#### GET /api/products/categories

##### lists current categories (which are currently animals, furniture, household, and vehicles)

#### GET /api/products/category/:category

##### lists all products in :category

#### GET /api/cart/:id

##### returns the current cart for user id

#### POST /api/cart

##### adds new item to user's cart (requires: user_id, product_id, and quantity)

#### PATCH /api/cart/invoice/:id

##### updates quantity of item in cart (requires: quantity)

#### DELETE /api/cart/:id

##### deletes item in cart

#### GET /api/cart/history/:id

##### gets order history of user

#### PATCH /api/cart/history/:id ***NOT WORKING!

##### checks out current shopping cart (required: checked_out set to false) & creates a new empty cart ***NOT WORKING!

    
    
## imgur account information

### Username

thinkfulTBM

### Password

cohort19
