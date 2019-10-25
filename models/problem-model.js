const db = require('./conn');

const sampleProblemStatement = String.raw`
For $-\frac{\pi}{2}< x< \frac{\pi}{2}$, it follows that $\tan(x)\cos(x)=\sin(x)$.
`;

const sampleProblemType = 'truefalse'; // manual_unordered truefalse

const sampleProblemAnswerRepresentation = String.raw`
True
`;

const sampleProblemAnswerValue = ['T'];

const sampleProblemSolution = String.raw`
Since $\tan(x)=\frac{\sin(x)}{\cos(x)}$ and $\cos(x)\neq0$ when $x\in(-\pi/2,\pi/2)$, we have the following:
$$
\tan(x)\cos(x)=\frac{\sin(x)}{\cos(x)}\cos(x)=\sin(x).
$$
`
const sampleProblemCategoryId = 3;

class Problem {
    constructor(id, problemStatement) {
        this.id = id;
        this.problemStatement = problemStatement;
    }


    static base64Decode (str, encoding = 'utf-8') {
        return Buffer.from(str, 'base64').toString('utf8')
    }

    static base64Encode(str, encoding = 'utf-8') {
        return Buffer.from(str, 'utf8').toString('base64')
    }

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

    static async getAll() {
        try {
            const response = await db.query(`SELECT * FROM problems;`);

            console.log(response);

            // for (let problem of response) {
            //     problem.problem_statement = Base64Decode(problem.problem_statement);
            // }

            // const decodedResponses = response.map(problem => Base64Decode(problem.problem_statement))
            // return decodedResponses;

            return response;
        } catch(error) {
            console.log('error.message');
            return error.message;
        }
    }

}

module.exports = Problem;