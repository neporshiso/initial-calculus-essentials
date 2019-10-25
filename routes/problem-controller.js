const express = require("express");
const router = express.Router();

const problemModel = require("../models/problem-model"),
    userModel = require("../models/user-model"),
    userAnswerModel = require("../models/userAnswer-model");

router.get("/", async function(req, res, next) {
    const problemData = await problemModel.getProblemById(1);

    res.render("template", {
        locals: {
            title: "Problems Page",
            data: problemData,
            isLoggedIn: req.session.is_logged_in,
            userName: req.session.username
        },
        partials: {
            partial: "problem-partial"
        }
    });
});

router.post("/answerCheck", async (req, res, next) => {
    const { user_answer } = req.body;
    const user_id = req.session.user_id;

    const problem = await problemModel.getProblemById(4),
        problem_answer = problem.answer_value,
        problem_type = problem.type;

    const evaluation = problemModel.answerCheck(
        problem_type,
        problem_answer,
        user_answer
    );

    const userAnswer = new userAnswerModel(
        user_answer,
        evaluation,
        'TRUE',
        user_id,
        problem.id
    );

    const newAnswer = await userAnswer.createAnswer();
    console.log(newAnswer);

    if (!!evaluation) {
        console.log("Answer was correct");
        res.status(200).redirect("/problem");
    } else {
        res.status(500).redirect("/problem");
    }
});

module.exports = router;
