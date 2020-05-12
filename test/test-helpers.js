const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

//TODO add other db tables as built & endpoints ready for testing

function cleanTables(db) {
    return db.transaction(trx => 
        trx.raw(
            `TRUNCATE
                users
                
            `
        )
        .then(() =>
            Promise.all([
                trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
                trx.raw(`SELECT setval('users_id_seq', 0)`)
            ])
        )
    )
}


//TODO add other helper functions above export statement & include them in export

module.exports = {
    cleanTables
}