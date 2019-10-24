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

const problemStatementEncoded = Base64Encode(
    String.raw`
    \begin{align}
    \text{LHS} &\equiv [p_1\to p_2]\land\cdots\land[p_{k+1}\to p_{k+2}]\land[p_{k+1}\to p_{k+2}]\\[0.5em]
    &\Downarrow\qquad \text{(definition of conjunction)}\\[0.5em]
    &[[p_1\to p_2]\land[p_2\to p_3]\land\cdots\land[p_{k+1}\to p_{k+2}]]\land[p_{k+1}\to p_{k+2}]\\[0.5em]
    &\Downarrow\qquad \text{(by $S(k)$ with each $q_i = p_i$)}\\[0.5em]
    &[(p_1\land p_2\land\cdots\land p_k)\to p_{k+1}]\land[p_{k+1}\to p_{k+2}]\\[0.5em]
    &\Downarrow\qquad \text{(by $S(1)$ with $q_1=p_1\land\cdots\land p_k)$ and $q_2=p_{k+1}$)}\\[0.5em]
    &[[(p_1\land p_2\land\cdots\land p_k)\land p_{k+1}]\to p_{k+1}]\land [p_{k+1}\to p_{k+2}]\\[0.5em]
    &\Downarrow\qquad \text{(by definition of conjunction)}\\[0.5em]
    &[(p_1\land p_2\land\cdots\land p_k\land p_{k+1}]\to p_{k+1}]\land [p_{k+1}\to p_{k+2}]\\[0.5em]
    &\Downarrow\qquad \text{(since $a\land b\to b$ with $b=[p_{k+1}\to p_{k+2}]$)}\\[0.5em]
    &[(p_1\land p_2\land\cdots\land p_k\land p_{k+1})\to p_{k+2}]\land[p_{k+1}\to p_{k+2}]\\[0.5em]
    &\Downarrow\qquad \text{(since $a\land b\to a$)}\\[0.5em]
    &(p_1\land p_2\land\cdots\land p_k\land p_{k+1})\to p_{k+2}\\[0.5em]
    &\equiv \text{RHS},
    \end{align}
    `
)

const problemStatementDecoded = Base64Decode(problemStatementEncoded);

db.result(`
INSERT INTO problems
VALUES
    (DEFAULT, '${problemStatementEncoded}')
`)

class ProblemsList {
    constructor(id, problemStatement) {
        this.id = id;
        this.problemStatement = problemStatement;
    }

    static async getAll() {
        try {
            const response = await db.query(`SELECT * FROM problems;`);
            // console.log(Array.from(response));
            
            // response.forEach(problem => problem.problem_statement = Base64Decode(problem.problem_statement));


            // for (let problem of response) {
            //     problem.problem_statement = Base64Decode(problem.problem_statement);
            // }
            // console.log(response);
            // console.log(decodedResponses);
            const decodedResponses = response.map(problem => Base64Decode(problem.problem_statement))
            // console.log('response: ', decodedResponses);
            return decodedResponses;
        } catch(error) {
            console.log('error.message');
            return error.message;
        }
    }
}

module.exports = ProblemsList;







INSERT INTO problems
    (id, statement, type, answer_representation, answer_value, solution, category_id)
VALUES
    (DEFAULT, 'sample problem statement', 'sample problem type (truefalse, manual_ordered, manual_unordered)', 'answer representation', 'simple answer to evaluate and compare', 'simple solution', 2);








    <body>
    <h1>Problem Statement</h1>
    <p>
        The expression
\[
\frac{x+1-\dfrac{1}{x+1}}{\dfrac{1}{x+1}},
\]
such that $x\neq-1$, can be written in the form $ax^2+bx$. Express $a$ and $b$ as integers.
    </p>
    <h1>Problem Answer</h1>
    <p>
        $a=1$ and $b=2$
    </p>
    <h1>Problem Solution</h1>
    <p>
        One approach is to multiply the given expression by $\frac{x+1}{x+1}$ at the outset:
\begin{align*}
\frac{x+1-\dfrac{1}{x+1}}{\dfrac{1}{x+1}}
&= \frac{x+1-\dfrac{1}{x+1}}{\dfrac{1}{x+1}}\cdot\frac{x+1}{x+1} & \text{(strategically multiply)}\\[1em]
&= \biggl(x+1-\frac{1}{x+1}\biggr)\cdot(x+1) & \text{(simplify)}\\[1em]
&= x(x+1)+1(x+1)-1 & \text{(distribute)}\\[1em]
&= x^2+2x. & \text{(simplify)}
\end{align*}
Another approach is to first obtain a common denominator for the expression in the numerator and then multiply through by $\frac{x+1}{x+1}$:
\begin{align*}
\frac{x+1-\dfrac{1}{x+1}}{\dfrac{1}{x+1}}
&= \frac{\dfrac{(x+1)^2-1}{x+1}}{\dfrac{1}{x+1}} & \text{(common denominator)}\\[1em]
&= \frac{\dfrac{x^2+2x}{x+1}}{\dfrac{1}{x+1}} & \text{(simplify)}\\[1em]
&= \frac{\dfrac{x^2+2x}{x+1}}{\dfrac{1}{x+1}}\cdot\frac{x+1}{x+1} & \text{(strategically multiply)}\\[1em]
&= x^2+2x.
\end{align*}
From the above, it is clear that both approaches are similar, albeit the second approach seems to be an algebraically cleaner approach. Regardless, in the end, $a=1$ and $b=2$.
    </p>
</body>