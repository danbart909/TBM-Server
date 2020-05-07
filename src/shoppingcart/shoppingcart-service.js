const ShoppingCartService = {
  getAllCart(knex) {
    return knex.select('*').from('shoppingcart')
  }
}

module.exports = ShoppingCartService