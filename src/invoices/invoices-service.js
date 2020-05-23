const InvoiceService = {
  getAllInvoices(knex) {
    return knex.select('*').from('invoices')
  },
  getCartByUser(knex, id) {
    return knex.select('*').from('invoices').where('invoices.user_id', id).join('invoice_products', 'invoices.id', 'invoice_products.invoice_id').where('checked_out', false).join('products', 'invoice_products.product_id', 'products.id')
  },
  getHistoryByUser(knex, id) {
    return knex.select('*').from('invoices').where('invoices.user_id', id).join('invoice_products', 'invoices.id', 'invoice_products.invoice_id').where('checked_out', true).join('products', 'invoice_products.product_id', 'products.id')
  },
  getCurrentCartId(knex, user_id) {
    return knex.select('*').from('invoices').where('invoices.user_id', user_id).where('checked_out', false).pluck('id').then(function(id) {return id})
  },
  insertInvoice(knex, invoice_id, product_id, user_id, quantity) {
    return knex.insert(invoice_id, product_id, user_id, quantity).into('invoice_products').returning('*').then(rows => {
      return rows[0]
    })
  },
  getInvoice(knex, id) {
    return knex('invoice_products').where({ id })
  },
  emptyCart(knex, invoice_id) {
    return knex('invoice_products').where({ invoice_id }).delete()
  },
  deleteItemInCart(knex, invoice_id, product_id) {
    return knex('invoice_products').where({ invoice_id }).where({ product_id }).delete()
  },
  updateInvoice(knex, id, quantity) {
    return knex('invoice_products').where({ id }).update({ quantity })
  },
  closeInvoice(knex, user_id ) {
    return knex('invoices').where('user_id', user_id).join('users', 'invoices.user_id', 'users.id').update({ checked_out: true })
  },
  // closeInvoice(knex, user_id) {
  //   return knex('invoices').where({ user_id }).update({ checked_out: true })
  // },
  createNewCart(knex, user_id) {
    return knex.insert({user_id}).into('invoices').returning('*').then(rows => {
      return rows[0]
    })
  }
}

module.exports = InvoiceService