const db = require("./conn");
const bcrypt = require('bcryptjs');

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    checkPassword(hash) {
        return bcrypt.compareSync(this.password, hash);
    }

    static async getAnswerCountById(userId) {
        try {
            const response = await db.one(`SELECT COUNT(*) FROM user_answers WHERE user_id=$1`, [userId]);
            console.log('response', response);
            return response;
        } catch (err) {
            console.log(err.message);
        }
    }

    async login() {
        try {
            const response =  await db.one(
                `SELECT id, username, password FROM users WHERE email = $1`,
                [this.email]
            );
            console.log('logging user in: ', response)
            const isValid = this.checkPassword(response.password);
            console.log('validity of ' + this.email, isValid)
            if (!!isValid) {
                const {
                    username,
                    id
                } = response;
                return { isValid, id, username };
            } else {
                return { isValid };
            };
            
        } catch (err) {
            return err.message;
        }
    }

    async save() {
        try {
            const response = await db.one(
                `INSERT INTO users (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING id;`,
                [
                    this.username,
                    this.email,
                    this.password
                ]);
                console.log('saving user: ', response)
                return response;
        } catch (err) {
            return err;
        }
    }
}

module.exports = User;
