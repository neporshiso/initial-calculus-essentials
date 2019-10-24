const db = require("./conn");

class Helper {

    static async getProblemById(id) {
        try {
            const response = await db.one(
                `SELECT * FROM problems WHERE id = $1;`,
                [id]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    // This will need to be updated as the problem_answer will be an object from postgres and the user_answer will be a String
    static answerCheck(problem_answer, user_answer) {
        if (problem_answer == user_answer) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Helper;
