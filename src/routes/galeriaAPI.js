const galeria = require('../models/galeria');
const Galeria = require('../models/galeria');

async function crearGaleria(req, res){
    let { datos } = req.body;
        datos.logoCDN = datos.logoCDN[0];

    let Galerias = await Galeria.find({});
    if(Galerias.length > 1) return false;

    const nuevaGaleria = new Galeria(datos);
    await nuevaGaleria.save();

    res.json(nuevaGaleria);
    return nuevaGaleria;

}

async function _crearGaleria(datos){
    let Galerias = await Galeria.find({});
    if(Galerias.length > 1) return false;

    const nuevaGaleria = new Galeria(datos);
    await nuevaGaleria.save();

    return nuevaGaleria;

}

async function actualizarGaleria(req, res){
    var { datos, galeriaId } = req.body;
        datos.logoCDN = datos.logoCDN[0];
    /*const { sellerName } = datos;
    console.log(sellerName);*/
    //console.log(datos);
    let galeriaActualizada = await Galeria.findByIdAndUpdate(galeriaId, datos);

    res.json(true);
    return galeriaActualizada;
}

async function verGalerias(req, res){
    let Galerias = await Galeria.find({});
    res.json(Galerias);
    return Galerias;
}

async function countGalerias(req, res){
    let Galerias = await Galeria.find({});
    res.json(Galerias.length);
    return Galerias.length;
}

async function borrarGalerias(req, res){
    let Galerias = await Galeria.remove();
    res.json(Galerias);
    return Galerias;
}

module.exports = { crearGaleria, _crearGaleria, actualizarGaleria, verGalerias, countGalerias, borrarGalerias };