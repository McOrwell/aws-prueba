const Comprador = require('../models/comprador');

async function crearComprador(req, res){
    /*datos = {
        sellerName:{
            name:'John',
            lastName:'Doe'
        },
        socialNetwork:{
                network:'facebook',
                name:'John Doe',
                url:'facebook.com'
        },
        buyerType:'Galerista',
        location: {
            calle:'Nazareth',
            numero:687,
            extension:'B',
            cp:44770,
            colonia:'Hermosa Provincia',
            municipio:'Guadalajara',
            estado:'Jalisco',
            pais:'México'
        }
    }*/
    var datos = req.body;
        datos.socialNetwork = datos.socialNetwork[0];
        datos.location = datos.location[0];

    const nuevoComprador = new Comprador(datos);
    await nuevoComprador.save();

    res.json(nuevoComprador);
    return nuevoComprador;
}

async function _crearComprador(datos){
    /*datos = {
        sellerName:{
            name:'John',
            lastName:'Doe'
        },
        socialNetwork:{
                network:'facebook',
                name:'John Doe',
                url:'facebook.com'
        },
        buyerType:'Galerista',
        location: {
            calle:'Nazareth',
            numero:687,
            extension:'B',
            cp:44770,
            colonia:'Hermosa Provincia',
            municipio:'Guadalajara',
            estado:'Jalisco',
            pais:'México'
        }
    }*/

    const nuevoComprador = new Comprador(datos);
    await nuevoComprador.save();

    return nuevoComprador;
}

async function verCompradores(req, res){
    let Compradores =  await Comprador.find({});
    res.json(Compradores);
    return Compradores;
}

async function borrarCompradores(req, res){
    let Compradores = await Comprador.remove();
    res.json(Compradores);
    return Compradores;
}

module.exports = { crearComprador, _crearComprador, verCompradores, borrarCompradores };