const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/user-model');

router.get("/login", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Login",
            isLoggedIn: req.session.is_logged_in,
            userName: req.session.username
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
            isLoggedIn: req.session.is_logged_in,
            userName: req.session.username
        },
        partials: {
            partial: "partial-signup"
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
    console.log(addUser);
    if (addUser) {
        res.status(200).redirect('/users/login');
    } else {
        res.status(500);
    }
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const user = new User(null, email, password);
    const response = await user.login();

    if (!! response.isValid) {
        const { id, username } = response;
        req.session.is_logged_in = true;
        req.session.username = username;
        req.session.user_id = id;
        console.log('session', req.session);
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