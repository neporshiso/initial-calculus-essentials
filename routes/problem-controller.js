const express = require("express");
const router = express.Router();

const problemModel = require("../models/problem-model");

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

    const problem = await problemModel.getProblemById(4),
        problem_answer = problem.answer_value,
        problem_type = problem.type;
    
    const evaluation = problemModel.answerCheck(problem_type, problem_answer, user_answer);
    console.log(evaluation);
    
    if (!!evaluation) {
        res.status(200).redirect("/problem");
    } else {
        res.status(500).redirect("/problem")
    }

});

module.exports = router;
