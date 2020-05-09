const ProductService = {
  getAllProducts(knex) {
    return knex.select('*').from('products')
  },
  getById(knex, id) {
    return knex.from('products').select('*').where('id', id).first()
  },
  getByCategory(knex, category) {
    return knex.from('products').select('*').where('category', category)
  }
}

module.exports = ProductService