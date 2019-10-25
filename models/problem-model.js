const db = require('./conn');

const base64js = require('base64-js');
const TextDecoder = require('text-encoder-lite').TextDecoderLite;
const TextEncoder = require('text-encoder-lite').TextEncoderLite;

function Base64Encode(str, encoding = 'utf-8') {
    var bytes = new (typeof TextEncoder === "undefined" ? TextEncoderLite : TextEncoder)(encoding).encode(str);        
    return base64js.fromByteArray(bytes);
}

function Base64Decode(str, encoding = 'utf-8') {
    var bytes = base64js.toByteArray(str);
    return new (typeof TextDecoder === "undefined" ? TextDecoderLite : TextDecoder)(encoding).decode(bytes);
}

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

db.result(`
INSERT INTO problems
VALUES
    (DEFAULT, '${Base64Encode(sampleProblemStatement)}', '${sampleProblemType}', '${Base64Encode(sampleProblemAnswerRepresentation)}', '{${sampleProblemAnswerValue.join()}}', '${Base64Encode(sampleProblemSolution)}', '${sampleProblemCategoryId}')
`);

class Problem {
    constructor(id, problemStatement) {
        this.id = id;
        this.problemStatement = problemStatement;
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