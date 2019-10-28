const db = require("./conn");

class category {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    // create combined problem and category table
    static async joinProblemsAndCategories() {
        try {
            const response = await db.query(`SELECT c.id AS category_id, c.name AS category_name, c.description, p.id AS problem_number
            FROM categories c
            INNER JOIN problems p ON c.id = p.category_id;`);
            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    static async getUserAnswers(user_id) {
        try {
            const response = await db.query(`SELECT * 
            FROM user_answers
            WHERE user_answers.user_id = $1;`, [user_id]);
            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}

module.exports = category;
