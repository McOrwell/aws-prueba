const Artista = require('../models/artista');
const Product = require('../models/product');

async function crearArtista(req, res){
    const datos = req.body;
        datos.artistImg = datos.artistImg[0];

    var nuevoArtista = new Artista(datos);
        nuevoArtista = await nuevoArtista.save();

    res.json(nuevoArtista);
    return nuevoArtista;
}

async function _crearArtista(datos){
    var nuevoArtista = new Artista(datos);
        nuevoArtista = await nuevoArtista.save();

    return nuevoArtista;
}

async function actualizarArtista(req, res){
    var { datos, artistaId } = req.body;
        datos.artistImg = datos.artistImg[0];

    let artistaActualizado = await Artista.findByIdAndUpdate(artistaId, datos);

    res.json(true);
    return artistaActualizado;
}

async function verArtistas(req, res){
    let Artistas =  await Artista.find({});
    res.json(Artistas);
    return Artistas;
}

async function borrarArtista(req, res){
    console.log('Borrando Artista');

    const { artistId } = req.body;
    var Art = await Artista.findById(artistId);
    var { workIds } = Art;
    console.table(workIds);

    for(let workId of workIds){
        await Product.findByIdAndDelete(workId);
    }

    await Artista.findByIdAndDelete(artistId);

    res.json(true);
} 

async function borrarArtistas(req, res){
    let Artistas = await Artista.remove();
    res.json(Artistas);
    return Artistas;
}

module.exports = { crearArtista, _crearArtista, actualizarArtista, verArtistas, borrarArtista, borrarArtistas };