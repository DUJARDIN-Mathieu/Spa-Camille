const client = require('./database')

const dataMapper = {
    getAllAvis: async function(){
        const result = await client.query('SELECT * FROM "avis"');
        return result.rows
    },
    getProduitByCategory: async function(category){
        const result = await client.query(`SELECT * FROM "produit" WHERE "categorie" = '${category}'`)
        return result.rows
    },
    getProduitByID: async function(id){
        const result = await client.query(`SELECT * FROM "produit" WHERE "id" = '${id}'`)
        return result.rows[0]
    },
    createAvis: async function(pseudo, note, description){
        const result = await client.query(`INSERT INTO "avis" (pseudo, note, descritpion) VALUES ('${pseudo}', '${note}', '${description}')`)
        return result.rows
    }
};

module.exports = dataMapper