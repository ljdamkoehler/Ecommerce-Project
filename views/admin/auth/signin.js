module.exports = ({ req }) => {
    return `
        <div>
            <form method="POST">
                <input type="text" name="email" id="" placeholder="email">
                <input type="text" name="password" id="" placeholder="password">
                <button>Sign In</button>
            </form>
        </div>
    `;
}