const OrdersService = {
  getAllOrders(knex) {
    return knex.select('*').from('orders')
  },
  getById(knex, id) {
    return knex.select('*').from('orders').where('id', id).first()
  },
  getByCartId(knex, cart_id) {
    return knex.select('*').from('orders').where('cart_id', cart_id)
  }
}

module.exports = OrdersService