const express = require("express");
const router = express.Router();
const problemModel = require("../models/problem-model"),
    userModel = require("../models/user-model"),
    userAnswerModel = require("../models/userAnswer-model"),
    categoryModel = require("../models/category-model")

router.get("/", async function(req, res, next) {
    if (req.session.is_logged_in) {
        // const problems = await problemModel.getAll();
        const categoryAndProblems = await categoryModel.joinProblemsAndCategories();
        const userAnswers = await categoryModel.getUserAnswers(req.session.user_id);

        userAnswers.forEach(element => {
            categoryAndProblems[element.problem_id - 1].is_correct = element.is_correct;
        });

        console.log("PROBLEMS AND CATEGORIES", categoryAndProblems)
        console.log("CURRENT USER ANSWERS", userAnswers)

        res.render('template', {
            locals: {
                title: "Problems!",
                session: req.session,
                categoryCombo: categoryAndProblems
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
        const totalProblemCount = await problemModel.getTotalProblemCount();
        /* convert to use problem.decode() */
        console.log("getting problem", problem);
        res.render("template", {
            locals: {
                title: "Problem #" + problem.id,
                problem: problem,
                problem_id: id,
                problemCount: totalProblemCount.count,
                answer: problemModel.base64Decode(problem.answer_representation),
                statement: problemModel.base64Decode(problem.statement),
                solution: problemModel.base64Decode(problem.solution),
                session: req.session
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

    if (answerExist) {
        await userAnswer.updateAnswer();
    } else {
        await userAnswer.createAnswer();
        const answers = await userModel.getAnswerCountById(req.session.user_id);
        req.session.answer_count = Number(answers.count);
    }

    if (!!evaluation) {
        console.log("Answer was correct");
        req.session.save(
            () => res.status(200).redirect(`/problem/${id}/answer`)
        );
    } else {
        console.log("Answer was incorrect");
        req.session.save(
            () => res.status(200).redirect(`/problem/${id}/answer`)
        );
    }
});

router.get('/:id/answer', async (req, res, next) => {
    const problem_id = req.params.id;
    const user_id = req.session.user_id;
    const problem = await problemModel.getProblemById(problem_id);
    const totalProblemCount = await problemModel.getTotalProblemCount();
    const answerResult = await userAnswerModel.getAnswer(user_id, problem_id);

    console.log("IS THE ANSWER CORRECT? WELL ....", answerResult);

    res.render('template', {
        locals: {
            title: "Problem #" + problem_id,
            answer_correctness: answerResult.is_correct,
            session: req.session,
            problem_id: problem.id,
            statement: problemModel.base64Decode(problem.statement),
            solution: problemModel.base64Decode(problem.solution),
            answer_representation: problemModel.base64Decode(problem.answer_representation),
            problemCount: totalProblemCount.count
        },
        partials: {
            partial: "partial-answer"
        }
    });
})

module.exports = router;