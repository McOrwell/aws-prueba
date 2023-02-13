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

/*Exports*/ const artistaSchema = new Schema(
    {
        sellerName: nameSchema,
        stageName: String,
        artistImg: String,
        locations: [locationSchema],
        whatsApp: [Number],
        socialNetworks: [contactNetSchema],
        emails:[String],
        htmlDescription: String,
        workIds:[String]
    }
);

module.exports = mongoose.model('artista', artistaSchema);