const express = require('express');
const router = express.Router();
const problemModel = require('../models/problem-model');

router.get('/', async function(req, res, next) {
    const problemData = await problemModel.getAll();

    res.render('template', { 
    locals: {
        title: "Problems Page",
        data: problemData
    },
    partials: {
        partial: "problem-partial"
    }
    });
});

module.exports = router;