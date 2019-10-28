const db = require("./conn");

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
                ]
            );

            return response;
        } catch (err) {
            return err.message;
        }
    }

    async updateAnswer() {
        try {
            const response = await db.result(
                `UPDATE user_answers SET is_correct=$1 WHERE user_id = $2 AND problem_id = $3 RETURNING id, answer, is_correct, is_active, user_id, problem_id;`,
                [this.is_correct, this.user_id, this.problem_id]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getAnswer(userId, problemId) {
        try {
            const response = await db.one(
                `SELECT * FROM user_answers
                WHERE user_id = $1 AND problem_id = $2;`,
                [userId, problemId]
            );
            return response;
        } catch (err) {
            return false;
        }
    }

}

module.exports = UserAnswer;
