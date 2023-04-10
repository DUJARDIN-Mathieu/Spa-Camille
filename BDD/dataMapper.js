let donnee = require("./donnee.json")

const dataMapper = {
    getProduitByCategory: async function(category){
        const result = donnee.filter((produit) => produit.categorie == category)
            return result
         
    },
    getProduitByID: async function(id){
            return donnee[id-1]  
    }
};

module.exports = dataMapper