const ProductService = {
  getAllProducts(knex) {
    return knex.select('*').from('products')
  },
  getById(knex, id) {
    return knex.from('products').select('*').where('id', id).first()
  }
}

module.exports = ProductService