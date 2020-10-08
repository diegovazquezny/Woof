const { Router } = require('express');
const express = require('express');
const userController = require('../controllers/UserController');
const matchesController = require('../controllers/MatchesController');
const router = express.Router();

router.post('/login',
  userController.createUser,
  (req, res) => res.status(200).json(res.locals.data)
);

router.get('/getUserData/:id',
  userController.getUserData,
  (req, res) => res.status(200).json(res.locals.data)
);

router.delete('/deleteUser/:id',
  userController.deleteUserData,
  (req, res) => res.status(200).json(res.locals.data)
);

router.put(
  '/updateUserData/:id',
  userController.updateUserData,
  matchesController.userActivities,
  matchesController.getUniqueIds,
  matchesController.returnMatches,
  (req, res) => res.status(200).json(res.locals.matchingUsersInfo)
);

module.exports = router;

