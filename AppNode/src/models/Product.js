const {Schema, model} = require('mongoose')

const Product = new Schema({
    name: {type: String, required: true},
    price: {type: Number, default: 0}
});


module.exports= model("Product", Product);