const Imagen = require(`../models/imagen`);

async function crearImagen(datos){
    var imagen = datos;
    var newImagen = new Imagen(imagen);
        imagen = await newImagen.save();
    return imagen;
}

async function verImagenes(req, res){
    return res.json(await Imagen.find({}));
}

async function borrarImagen(req, res){

}

module.exports = { crearImagen, verImagenes, borrarImagen };