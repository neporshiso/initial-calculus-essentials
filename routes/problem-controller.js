const express = require("express");
const router = express.Router();
const problemModel = require("../models/problem-model"),
    userModel = require("../models/user-model"),
    userAnswerModel = require("../models/userAnswer-model");

router.get("/", async function(req, res, next) {
    if (req.session.is_logged_in) {
        res.render("template", {
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
        res.sendStatus(401);
    }
});

router.get("/:id", async function(req, res, next) {
    if (req.session.is_logged_in) {
        const id = req.params.id;
        const problem = await problemModel.getProblemById(id);
        /* convert to use problem.decode() */
        console.log("getting problem", problem);
        res.render("template", {
            locals: {
                title: "Problem #" + problem.id,
                problem: problem,
                problem_id: id,
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

router.post("/:id", async (req, res, next) => {
    const { user_answer } = req.body;
    const id = req.params.id;

    const user_id = req.session.user_id;

    const problem = await problemModel.getProblemById(id),
        problem_answer = problem.answer_value,
        problem_type = problem.type;

    const evaluation = await problemModel.answerCheck(
        problem_type,
        problem_answer,
        user_answer
    );

    const userAnswer = new userAnswerModel(
        user_answer,
        evaluation,
        "TRUE",
        user_id,
        problem.id
    );

    const answer = await userAnswerModel.getAnswer(user_id, id);
    const answerExist = !!answer.id;

    answerExist
        ? await userAnswer.updateAnswer()
        : await userAnswer.createAnswer();

    if (!!evaluation) {
        console.log("Answer was correct");
        res.status(200).redirect(`/problem/${id}/answer`);
    } else {
        console.log("Answer was incorrect");
        res.status(200).redirect(`/problem/${id}/answer`);
    }
});

module.exports = router;
