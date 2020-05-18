const InvoiceService = {
  getAllInvoices(knex) {
    return knex.select('*').from('invoices')
  },
  getCartByUser(knex, id) {
    return knex.select('*').from('invoices').where('invoices.user_id', id).join('invoice_products', 'invoices.id', 'invoice_products.invoice_id').where('checked_out', false).join('products', 'invoice_products.product_id', 'products.id')
  },
  getHistoryByUser(knex, id) {
    return knex.select('*').from('invoices').where('invoices.user_id', id).join('invoice_products', 'invoices.id', 'invoice_products.invoice_id').where('checked_out', true)
  },
  getCurrentCartId(knex, id) {
    return knex.select('*').from('invoices').where('invoices.user_id', id).where('checked_out', false).pluck('id').then(function(id) {return id})
  },
  insertInvoice(knex, invoice_id, product_id, user_id, quantity) {
    return knex.insert(invoice_id, product_id, user_id, quantity).into('invoice_products').returning('*').then(rows => {
      return rows[0]
    })
  },
  // insertInvoice(knex, invoice_id, product_id, quantity) {
  //   return knex.insert(product_id, quantity).into('invoice_products').where('invoice_id', invoice_id).returning('*').then(rows => {
  //     return rows[0]
  //   })
  // },
  getInvoice(knex, id) {
    return knex('invoice_products').where({ id })
  },
  emptyCart(knex, invoice_id) {
    return knex('invoice_products').where({ invoice_id }).delete()
  },
  updateInvoice(knex, id, quantity) {
    return knex('invoice_products').where({ id }).update({ quantity })
  },
  closeInvoice(knex, id, checked_out) {
    return knex('invoices').where('user_id', id).join('users', 'invoices.user_id', 'users.id').update({ checked_out })
  },
  // closeInvoice(knex, id, checked_out) {
  //   return knex('users').where({ id }).join('invoices', 'users.id', 'invoices.user_id').update({ checked_out })
  // },
  createNewCart(knex, id) {
    return knex.insert('user_id', id).into('invoices').returning('*').then(rows => {
      return rows[0]
    })
  }
}

module.exports = InvoiceService