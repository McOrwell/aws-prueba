const mongoose = require('mongoose');

const { Schema } = mongoose;

/*Export*/ const imagenSchema = new Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: String
});

module.exports = mongoose.model('imagen', imagenSchema);