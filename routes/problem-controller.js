const express = require('express');
const router = express.Router();
const problemModel = require('../models/problem-model');

router.get('/', async function(req, res, next) {
    if (req.session.is_logged_in) {
        res.render('template', {
            locals: {
                title: "Problems!",
                isLoggedIn: req.session.is_logged_in,
                userName: req.session.username
            },
            partials: {
                partial: "problems-partial"
            }
        });
    } else {
        res.sendStatus(401)
    }
})
router.get('/:id', async function(req, res, next) {
    if (req.session.is_logged_in) {
        const id = req.params.id;
        const problem = await problemModel.getProblemById(id);
        /* convert to use problem.decode() */
        console.log('getting problem', problem);
        res.render('template', {
            locals: {
                title: "Problem #" + problem.id,
                problem: problem,
                statement: problemModel.base64Decode(problem.statement),
                solution: problemModel.base64Decode(problem.solution),
                isLoggedIn: req.session.is_logged_in,
                userName: req.session.username
            },
            partials: {
                partial: "problem-partial"
            }
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;