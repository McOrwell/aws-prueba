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

/*Export*/ const compradorSchema = new Schema(
    {
        name: nameSchema,
        socialNetwork: contactNetSchema,
        buyerType: String,
        location:locationSchema,
        obraCotizada:String
    }
);

module.exports = mongoose.model('comprador' ,compradorSchema);