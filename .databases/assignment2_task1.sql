-- 1. Insérer un enregistrement dans la table accounts
INSERT INTO accounts (first_name, last_name, email, password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. Mettre à jour le type de compte de Tony Stark en 'Administrateur'
UPDATE accounts
SET account_type = 'Administrateur'
WHERE email = 'tony@starkent.com';

-- 3. Supprimer Tony Stark de la base de données
DELETE FROM accounts
WHERE email = 'tony@starkent.com';

-- 4. Modifier la description du véhicule GM Hummer
UPDATE inventory
SET description = REPLACE(description, 'petits intérieurs', 'un grand intérieur')
WHERE model = 'Hummer';

-- 5. Sélectionner les véhicules de type "Sport" avec jointure
SELECT i.make, i.model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6. Sélectionner un utilisateur précis par son ID (exemple pour entraînement CRUD)
SELECT * FROM accounts WHERE account_id = 1;
