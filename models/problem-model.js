const db = require("./conn");

const base64js = require("base64-js");
const TextDecoder = require("text-encoder-lite").TextDecoderLite;
const TextEncoder = require("text-encoder-lite").TextEncoderLite;

function Base64Encode(str, encoding = "utf-8") {
    var bytes = new (typeof TextEncoder === "undefined"
        ? TextEncoderLite
        : TextEncoder)(encoding).encode(str);
    return base64js.fromByteArray(bytes);
}

function Base64Decode(str, encoding = "utf-8") {
    var bytes = base64js.toByteArray(str);
    return new (typeof TextDecoder === "undefined"
        ? TextDecoderLite
        : TextDecoder)(encoding).decode(bytes);
}

const sampleProblemStatement = String.raw`
For $-\frac{\pi}{2}< x< \frac{\pi}{2}$, it follows that $\tan(x)\cos(x)=\sin(x)$.
`;

const sampleProblemType = "truefalse"; // manual_unordered truefalse

const sampleProblemAnswerRepresentation = String.raw`
True
`;

const sampleProblemAnswerValue = ["T"];

const sampleProblemSolution = String.raw`
Since $\tan(x)=\frac{\sin(x)}{\cos(x)}$ and $\cos(x)\neq0$ when $x\in(-\pi/2,\pi/2)$, we have the following:
$$
\tan(x)\cos(x)=\frac{\sin(x)}{\cos(x)}\cos(x)=\sin(x).
$$
`;
const sampleProblemCategoryId = 3;
// commenting this out because it kept inserting data 

// db.result(`
// INSERT INTO problems
// VALUES
//     (DEFAULT, '${Base64Encode(
//         sampleProblemStatement
//     )}', '${sampleProblemType}', '${Base64Encode(
//     sampleProblemAnswerRepresentation
// )}', '{${sampleProblemAnswerValue.join()}}', '${Base64Encode(
//     sampleProblemSolution
// )}', '${sampleProblemCategoryId}')
// `);

class Problem {
    constructor(
        id,
        problemStatement,
        type,
        answer_representation,
        answer_value,
        solution,
        category_id
    ) {
        this.id = id;
        this.problemStatement = problemStatement;
        this.type = type;
        this.answer_representation = answer_representation;
        this.answer_value = answer_value;
        this.solution = solution;
        this.category_id = category_id;
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
        } catch (error) {
            console.log("error.message");
            return error.message;
        }
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

    // The user needs to input answers with spaces in between values e.g x1 0.5 x2 -3
    // answerCheck evaluates the user's answer from the form submission and evaluates depending upon the problem type and returns a boolean
    static answerCheck(problem_type, problem_answer, user_answer) {
        const problemAnswerObj = this.convertArrayDataToObj(problem_answer);
        const userAnswerArray = user_answer.split(" ");
        const userAnswerObj = this.convertArrayDataToObj(userAnswerArray);

        let evaluation = "";

        switch (problem_type) {
            case "manual_ordered":
                JSON.stringify(problemAnswerObj) ==
                JSON.stringify(userAnswerObj)
                    ? (evaluation = true)
                    : (evaluation = false);

                break;

            case "manual_unordered":
                let problemKeysArray = JSON.stringify(
                    Object.keys(problemAnswerObj).sort()
                );
                let userKeysArray = JSON.stringify(
                    Object.keys(userAnswerObj).sort()
                );

                let problemValuesArray = JSON.stringify(
                    Object.values(problemAnswerObj).sort()
                );
                let userValuesArray = JSON.stringify(
                    Object.values(userAnswerObj).sort()
                );

                problemKeysArray == userKeysArray &&
                problemValuesArray == userValuesArray
                    ? (evaluation = true)
                    : (evaluation = false);

                break;

            // since truefalse is single value answer, we can use don't have to convert problemAnswerValue. Can just rely on the arguments passed in directly
            case "truefalse":
                problem_answer == user_answer
                    ? (evaluation = true)
                    : (evaluation = false);
                break;

            default:
                console.err("The problem type is not valid.");
        }
        return evaluation;
    }

    // Helper Function that can convert an PSQL Array to JSON
    static convertArrayDataToObj(obj) {
        const objectToConvert = obj;
        const objLength = objectToConvert.length;
        let objAnswer = new Object();

        // This loop dynamically travels the length of the array data and populates key/value pairs and returns an object
        for (let i = 0; i < objLength; i += 2) {
            let key = objectToConvert[i];
            let value = objectToConvert[i + 1];

            objAnswer[key] = value;
        }

        return objAnswer;
    }

    // Pulls the answer value from Problems Table
    static async getArrayAnswer(id) {
        // SQL starts counting from 1 instead of 0
        try {
            const response = await db.one(
                `SELECT array_data FROM restaurants WHERE id = $1;`,
                [id]
            );
            const arrayObj = response.array_data;
            const convertedAnswer = this.convertArrayDataToObj(arrayObj);

            return convertedAnswer;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Problem;
