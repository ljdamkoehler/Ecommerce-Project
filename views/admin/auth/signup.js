module.exports = ({ req }) => {
    return `
        <div>
            Your id is: ${req.session.userId}
            <form method="POST">
                <input type="text" name="email" id="" placeholder="email">
                <input type="text" name="password" id="" placeholder="password">
                <input type="text" name="passwordConfirmation" id="" placeholder="password confirmation">
                <button>Sign Up</button>
            </form>
        </div>
    `;
}