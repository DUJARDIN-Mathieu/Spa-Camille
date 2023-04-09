const db = require('./database');
db.query(`DROP TABLE IF EXISTS "avis";
DROP TABLE IF EXISTS "produits";

CREATE TABLE IF NOT EXISTS "produit" (
    "id" SERIAL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prix" REAl NOT NULL,
    "categorie" TEXT NOT NULL,
    "description" TEXT,
    "illustration" TEXT
);

INSERT INTO "produit"("id", "nom", "prix", "categorie", "description", "illustration") VALUES
(1, "La Formule Zenitude", "70", "Formule"),
(2, "La Formule Délice", "80", "Formule"),
(3, "La Formule Gourmande", "130", "Formule"),
(4, "La Formule Relax", "170", "Formule"),
(5, "La Formule Détente", "190", "Formule"),
(6, "Soft", "1,5", "Supplement"),
(7, "Cocktail sans alcool", "5", "Supplement"),
(8, "Salade de fruit frais", "15", "Supplement"),
(9, "Planche Apéritif", "17", "Supplement"),
(10, "Décoration Spécial", "20", "Supplement"),
(11, "Bouquet de rose", "30", "Supplement"),
(12, "Personne supplémentaire", "30", "Supplement"),
(13, "Champagne", "35", "Supplement"),
(14, "Planche apéritif dinatoire", "35", "Supplement"),
(15, "Brunch", "40", "Supplement");

CREATE TABLE IF NOT EXISTS "avis" (
    "id" SERIAL PRIMARY KEY,
    "pseudo" TEXT DEFAULT "inconnu",
    "description" TEXT NOT NULL
);`)