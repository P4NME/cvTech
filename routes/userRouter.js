// File: userRouter.js

const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const signUpController = require('../models/signUpModel');
const signInController = require('../models/signInModel');

const User = require('../models/userModel');
const session = require('express-session');


router.get('/signup', userController.getSignUpForm);
router.post('/signup', userController.createUser);

router.get('/users', userController.getAllUsers);
//router.get('/:id', userController.getOneUser);

// Exemple de route qui utilise la session
router.get('/cv', (req, res) => {

  let user = 'no one';

  if (req.session.count)
  {
    req.session.count++;
  }
  if (req.session.user)
  {
    user =  req.session.user;
  }
  else
  {
    sessionInit = 1;
    username = 'anonymous';
  }
  //res.send(`Hello world! Vous avez visité cette page ${req.session.count} fois.`);
  console.log('userRouter ligne : 39 --> user = ',user);
  res.render('cv', { user: user});

});
router.get('/portfolio', (req, res) => {


  if (req.session.user)
  {
    username =  req.session.user.username;
    req.session.count = 0;
  }
  else
  {
    req.session.count = 1;
    username = 'anonymous';
  }
  //res.send(`Hello world! Vous avez visité cette page ${req.session.count} fois.`);
  res.render('portfolio', { name: username});

});
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
//router.post('/login', userController.login);

// Créer une session pour l'utilisateur
router.post('/signin', userController.findOneUser);
router.get('/signin',  userController.getSignInForm);

router.post('/login', userController.findOneUser);

// Vérifier si l'utilisateur est authentifié
router.get('/dashboard', (req, res) => {
  if (!req.session.user)
  {
    console.log('74 - userRouter : '+req.session.user);
    res.redirect('/user/signin');

  }
  else
  {
    console.log('80 - userRouter : '+req.session.user);

    res.render('dashboard', { user: req.session.user});

  }



});


// Déconnecter l'utilisateur
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.redirect('/user/signin');
  });
});


module.exports = router;
