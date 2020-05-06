const AnyService = {
  getAllAny(knex) {
    return knex.select('*').from('anytable')
  },
  getById(knex, id) {
    return knex.from('anytable').select('*').where('id', id).first()
  },
  insertAny(knex, newAny) {
    return knex
      .insert(newAny)
      .into('anytable')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteAny(knex, id) {
    return knex('anytable')
    .where({ id })
    .delete()
  },
  updateAny(knex, id, newAnyFields) {
    return knex('anytable')
      .where({ id })
      .update(newAnyFields)
  },
}

module.exports = AnyService