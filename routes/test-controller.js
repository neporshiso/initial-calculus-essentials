// Express variables required for it to run
const express = require("express"),
    router = express.Router();

// My Models
const helperModel = require("../models/helper-model");

// GET Routes
router.get("/", async (req, res, next) => {
    res.render("template", {
        locals: {
            title: "Testing User Answer Validation",
            isLoggedIn: req.session.is_logged_in,
            userName: req.session.username
        },
        partials: {
            indexPartial: "test-partial"
        }
    });
});

router.post("/answerCheck", async (req, res, next) => {
    const { user_answer } = req.body;

    // How do we dynamically update the problem id with each question?
    const problem = await helperModel.getProblemById(2);
    const problem_answer = problem.answer_value;
    const evaluation = helperModel.answerCheck(problem_answer, user_answer);
    
    console.log("problem's answer is:", problem_answer);
    console.log("user's answer is", user_answer);
    console.log("Did they get it right?", evaluation);

    // Re-route them to an answer page that looks very similar but has additional answer data

    // We need to update the user_answers database
    
    if (!!evaluation) {
        res.status(200).redirect("/test");
    } else {
        res.status(500).redirect("/test")
    }

});

module.exports = router;
