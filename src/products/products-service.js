const ProductService = {
  getAllProducts(knex) {
    return knex.select('*').from('products')
  },
  getById(knex, id) {
    return knex.select('*').from('products').where('id', id).first()
  },
  getByCategory(knex, category) {
    return knex.from('products').select('*').where('category', category)
  },
  getByTitle(knex, searchterm) {
    return knex.from('products').select('*').whereRaw(`LOWER(title) LIKE '%${searchterm.toLowerCase()}%'`)

    // .where('title', 'like', `%${searchterm}%`)
  }
}

module.exports = ProductService