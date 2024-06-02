# Mon Projet

1. Clonez le projet à partir de GitHib/GitLab
2. Installez les dépendances avec la commande `npm install`
3. Configurez les variables d'environnement dans le .env
4. Executer "npm run db:create" pour creer la base du env en question
5. Executer "npm run migrate" pour lancer la migration des table dans la base
6. Executer "npm run seed" pour le seeder a fin d'avoir un utilisateur par defaut dans la base 
7. Démarrer l'application avec la commande `npm run dev
8. Pour créer un migration, executer "npx sequelize-cli migration:generate --name create-exampleMigration"
9. Pour créer un model, executer "npx sequelize-cli model:generate --name Users --attributes nom:string,email:string"
10. Pour créer un seed, executer "npx sequelize-cli seed:generate --name Users" 

## Utilisation

Pour utiliser le framwork nodejs + express + websoket.io la structure se deroule comme suit : 
1. server.js le point d'entrée de l'application
2. models/index.js gere tout les point d'entrée vers la creation de la base
3. models/ le models du service
4. app/controllers les controllers de l'api
5. routes/groups toutes les routes de chaques controller
6. routes/api.js le groupement de tout les routes dans route/groups
7. app/services regroupes les fonctions que les controllers utilises


