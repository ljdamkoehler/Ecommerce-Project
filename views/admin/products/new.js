const layout = require('../layout');
const { getError } = require('../../helpers');

//Use a different encytype in this form so the image file can make it to my backend server 
module.exports = ({ errors }) => {
    return layout({
        content: `
        <form method="POST" enctype="multipart/form-data">
            <input type="text" placeholder="Title" name="title">
            ${getError(errors, 'title')}
            <input type="text" name="price" placeholder="Price">
            ${getError(errors, 'price')}
            <input type="file" name="image" id="product-image">
            <button>Submit</button>
        </form>
        `
    })
}
