const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    return layout({
        content: `
        <form method="POST">
            <input type="text" placeholder="Title" name="title">
            <input type="text" name="price" placeholder="Price">
            <input type="file" name="image" id="product-image">
            <button>Submit</button>
        </form>
        `
    })
}
