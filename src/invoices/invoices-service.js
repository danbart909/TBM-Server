const InvoiceService = {
  getAllInvoices(knex) {
    return knex.select('*').from('invoices')
  },
  getCartByUser(knex, id) {
    return knex.select('*').from('invoices').where('invoices.user_id', id).join('invoice_products', 'invoices.id', 'invoice_products.invoice_id').where('checked_out', false)
  },
  getHistoryByUser(knex, id) {
    return knex.select('*').from('invoices').where('invoices.user_id', id).join('invoice_products', 'invoices.id', 'invoice_products.invoice_id').where('checked_out', true)
  },
  insertInvoice(knex, newItem) {
    return knex.insert(newItem).into('invoice_products').returning('*').then(rows => {
      return rows[0]
    })
  },
  deleteInvoice(knex, id) {
    return knex('invoices').where({ id }).delete()
  },
  updateInvoice(knex, id, quantity) {
    return knex('invoices').where({ id }).update({ quantity })
  },
  closeInvoice(knex, id, checked_out) {
    return knex('users').where({ id }).join('invoices', 'users.id', 'invoices.user_id').update({ checked_out })
  }
}

module.exports = InvoiceService