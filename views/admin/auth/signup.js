const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ req, errors }) => {
    return layout({ content:`
        <div>
        Your id is: ${req.session.userId}
        <form method="POST">
            <input type="text" name="email" id="" placeholder="email">
            ${getError(errors, 'email')}
            <input type="text" name="password" id="" placeholder="password">
            ${getError(errors, 'password')}
            <input type="text" name="passwordConfirmation" id="" placeholder="password confirmation">
            ${getError(errors, 'passwordConfirmation')}
            <button>Sign Up</button>
        </form>
        </div>
    `
    });
}