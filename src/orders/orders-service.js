const OrdersService = {
  getAllOrders(knex) {
    return knex.select('*').from('orders')
  },
  getById(knex, id) {
    return knex.select('*').from('orders').where('id', id).first()
  }
}

module.exports = OrdersService