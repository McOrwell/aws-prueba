const mongoose = require('mongoose');

const { Schema } = mongoose;

const nameSchema = new Schema (
    {
        name: String,
        lastName: String
    }
);

const contactNetSchema = new Schema(
    {
        network: String,
        name: String,
        url: String,
    }
);

const locationSchema = new Schema(
    {
        calle: String,
        numero: Number,
        extension: String,
        cp: Number,
        colonia: String,
        municipio: String,
        estado: String,
        pais: String
    }
);

/*Export*/ const galerySchema = new Schema({
    galeryName: String,
    owner: nameSchema, 
    logoCDN: String, 
    locations: [locationSchema],
    whatsApp:[Number],
    socialNetworks:[contactNetSchema],
    emails:[String]
});

module.exports = mongoose.model('galeria', galerySchema);