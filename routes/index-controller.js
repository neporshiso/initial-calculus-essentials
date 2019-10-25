const express = require('express');
const router = express.Router();
const indexModel = require('../models/index-model');

router.get('/', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'Welcome to the homepage!',
      session: req.session

    },
    partials: {
      partial: 'partial-index'
    }
  });
});

module.exports = router;
