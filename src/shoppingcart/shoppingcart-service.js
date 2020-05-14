const ShoppingCartService = {
  getAllCart(knex) {
    return knex.select('*').from('cart')
  },
  getById(knex, id) {
    return knex.select('*').from('cart').where('id', id).first()
  }
}

module.exports = ShoppingCartService