const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();

const Problem = require('../models/problem-model')
const User = require('../models/user-model');

router.get("/login", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Login",
            session: req.session
        },
        partials: {
            partial: "partial-login"
        }
    });
});

router.get("/signup", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Sign Up",
            session: req.session
        },
        partials: {
            partial: "partial-signup"
        }
    });
});

router.get("/signup/error", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Sign Up",
            session: req.session,
        },
        partials: {
            partial: "partial-signup-error"
        }
    });
});

router.post("/signup", async (req, res, next) => {
    const { username,
            email } = req.body;
            const id = req.session.user_id

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User(username, email, hash);

    const addUser = await user.save();

    if (addUser.name === 'error' && addUser.code === '23505') {
        res.status(500).redirect('/users/signup/error');
    } else {
        res.status(200).redirect('/users/login');
    }
});

router.post("/login", async (req, res, next) => {

    const { email, password } = req.body;

    const user = new User(null, email, password);
    const response = await user.login();
    
    if (!! response.isValid) {
        const { id, username } = response;
        const answers = await User.getAnswerCountById(id);
        const problems = await Problem.getAll();
        req.session.answer_count = answers.count;
        req.session.problem_count = problems.length;
        console.log('count', answers.count, problems.length);
        req.session.is_logged_in = true;
        req.session.username = username;
        req.session.user_id = id;
        // console.log('session', req.session);
        res.status(200).redirect('/')
    } else {
        res.sendStatus(401)
    }
    console.log(response)

});

router.get("/logout", (req, res, next) => {
    req.session.destroy((result) => {
        console.log(result)
        res.status(200).redirect('/')
    });

});

module.exports = router;