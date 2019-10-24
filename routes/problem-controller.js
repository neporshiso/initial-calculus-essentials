const express = require('express');
const router = express.Router();
const problemsModel = require('../models/problemsModel');

router.get('/', async function(req, res, next) {
    const problemsData = await problemsModel.getAll();

    res.render('template', { 
    locals: {
        title: "Problems Page",
        data: problemsData
    },
    partials: {
        partial: "problems.partial"
    }
    });
});

module.exports = router;