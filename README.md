## cvTech
cvTech est une application de CVthèque basée sur Node.js qui permet aux recruteurs et aux entreprises de trouver et de contacter des profils techniques et des développeurs débutants.

### Fonctionnalités

- Création de profils de candidats avec des informations personnelles et professionnelles.
- Recherche de profils de candidats par compétences, expérience, localisation, etc.
- Visualisation des profils de candidats avec des détails tels que les compétences, l'expérience, les projets antérieurs, etc.
- Contact des candidats directement à partir de leur profil.

### Installation
Clonez le dépôt git :
bash
Copy code
git clone https://github.com/linnnux/cvTech.git
Installez les dépendances :
```
cd cvTech
npm install
```
Démarrez l'application :
```
npm start
```
L'application sera accessible à l'adresse http://localhost:{PORT} : voir config .env process.env.PORT.

### Configuration

Vous pouvez configurer l'application en modifiant les variables d'environnement suivantes :

PORT : Le port sur lequel l'application sera accessible (EX : 3000).
DB_HOST : localhost
DB_USER : nom utilisateur de la base de données
DB_PASSWORD: mot de passe utilisateur de la base de données
DB_PORT : port utilisé par la base de données
DB_DATABASE :le nom de la base de données
DB_SECRET : a secret key used to sign the session ID cookie

Technologies utilisées
Node.js
Express
javaScript
ejs
mySql
html5
css3

### Auteur
cvTech a été créé par [nacim meziani]. N'hésitez pas à me contacter pour toute question ou suggestion.

Licence
cvTech est distribué sous la licence [MIT]. Consultez le fichier LICENSE pour plus d'informations.
