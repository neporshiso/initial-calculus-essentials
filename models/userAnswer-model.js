const db = require("./conn")

class UserAnswer {
    constructor(answer, is_correct, is_active, user_id, problem_id) {
        this.answer = answer;
        this.is_correct = is_correct;
        this.is_active = is_active;
        this.user_id = user_id;
        this.problem_id = problem_id;
    }

    async createAnswer() {
        try {
            const response = await db.one(
                `INSERT INTO user_answers (answer, is_correct, is_active, user_id, problem_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;`,
                [
                    this.answer,
                    this.is_correct,
                    this.is_active,
                    this.user_id,
                    this.problem_id
                ]);

                return response;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = UserAnswer;