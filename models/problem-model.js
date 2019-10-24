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
By completing the square, the polynomial $x^2-6x+4$ can be written in the form $(x-a)^2+b$. Express $a$ and $b$ as integers.
`;

const sampleProblemType = 'manual_ordered';

const sampleProblemAnswerRepresentation = String.raw`
$a=3, b=-5$
`;

const sampleProblemAnswerValue = ['a', '3', 'b', '5'];

const sampleProblemSolution = String.raw`
Consider the following:
\begin{align*}
x^2-6x+4
&= (x^2-6x+9)+4-9 & \text{(add and subtract $(-6/2)^2$)}\\[0.5em]
&= (x-3)^2-5 & \text{(factor)}\\[0.5em]
&= (x-3)^2+(-5). & \text{(write in desired form)}
\end{align*}
Hence, $a=3$, and $b=-5$.
`

const sampleProblemCategoryId = 1;

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