// File: userController.js

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

var bodyParser = require('body-parser');

const signUpController = require('../models/signUpModel');
const signInController = require('../models/signInModel');

const User = require('../models/userModel');
const db = require('../config/database'); //  connexion à la base de données
const createDB = require('../config/createDataBase'); //  crée la base de données + table
const session = require('express-session');



exports.getSignUpForm = (req, res, next) => {
  if (!req.session.user)
  {
    console.log('pas de session');
    res.write(signUpController.signUpForm());
    res.end();
    return;
  }
  else
  {
    console.log('session found');
    res.redirect('/');

  }


};
exports.getSignInForm = (req, res, next) => {
  res.write(signInController.signInForm());
  res.end();
};
exports.createUser = (req, res, next) => {

  // Créer un nouvel utilisateur
  const user = new User(req.body.email, req.body.username, req.body.password);

  // Méthode pour enregistrer un utilisateur dans la base de données
  user.save();

  res.redirect('/user/signup');

};

exports.findOneUser = (req, res, next) => {

  User.findOneUser(req.body.username)
      .then(user =>
      {
        if (user)
        {
          // si utilisateur trouvé, créer une session ou faire autre chose
          // Stocker des informations sur la session de l'utilisateur
          if(user.password == req.body.password)
          {
            console.log('65 userController.js : success authentification réussie with : '+ req.body.username);
            console.log('66 userController.js : user = '+user );
            req.session = {user : user}
            console.log('68 userController = req.session.user.username = '+req.session.user.username);
            console.log(req.session.count+' : count');

            console.log('71 userController.js req.session.user value  ==->'+req.session.user);
            console.log('72 userController.js req.session.user.name value  ==->'+req.session.user.username);

            res.redirect('/user/dashboard/');

          }

        }
        else
        {
          // utilisateur non trouvé
          console.log('ERROR 404 - user not found');
          res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
      })
      .catch(error => {
      // erreur lors de la recherche
      res.status(500).json({ error: error});
    });
};

exports.updateUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};

exports.getAllUsers = (req, res, next) => {
  User.findAllUsers()
      .then(users =>
      {
        if (users)
        {
            res.render('users', { users: users});
        }
        else
        {
          // utilisateur non trouvé
          console.log('ERROR 404 - user not found');
          res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
      })
      .catch(error => {
      // erreur lors de la recherche
      res.status(500).json({ error: error});
    });

};

exports.login = (req, res, next) => {

};
