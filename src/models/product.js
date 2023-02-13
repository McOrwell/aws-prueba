const mongoose = require('mongoose');

const { Schema } = mongoose;

const fichaTecnicaSchema = new Schema(
    {
        autor: String,
        titulo: String,
        ancho: Number,
        alto: Number,
        tecnica: String,
        finalizacion: Date,
        descripcion: String
    }
);

/*Export*/ const productSchema = new Schema(
    {
        productImg: String,
        fichaTecnica: fichaTecnicaSchema,
        precio: Number,
        cantidad: Number,
        status: String,
        autorId:String
    }
);

module.exports = mongoose.model('producto', productSchema);