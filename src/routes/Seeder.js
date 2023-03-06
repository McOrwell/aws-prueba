const Product = require('../models/product');
const Artista = require('../models/artista');

const { crearArtista, _crearArtista, borrarArtistas } = require('./artistaAPI');
const { crearComprador, _crearComprador, borrarCompradores } = require('./compradorAPI');
const { crearProduct, _crearProduct, borrarProducts } = require('./productAPI');
const { crearGaleria, _crearGaleria, borrarGalerias } = require('./galeriaAPI');
const { borrarUsuarios } = require('./userAPI');

function getRandomArbitrary(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  

function getRandomArray(length = getRandomArbitrary(1, 20)){
    var Arreglo = [];
    for(let i = 0; i < length; i++){
        Arreglo.push(getRandomArbitrary(0, 99));
    }
    return Arreglo;
}

function transformarArtistaData(index = 0, workIds = []){

    let imgIndex = index;
        imgIndex++;
    imgIndex > 50 ? imgIndex = imgIndex - 50 : imgIndex = imgIndex;

    var datosArtista = {
        sellerName:{
            name:'John',
            lastName:`Doe ${index}`
        },
        stageName:`Artista Doe ${index}`,
        artistImg:`https://previews.123rf.com/images/tuktukdesign/tuktukdesign1609/tuktukdesign160900004/62073399-icono-de-usuario-hombre-perfil-hombre-de-negocios-avatar-ilustraci%C3%B3n-vectorial-persona-glifo.jpg`,
        locations:[
            {
                calle:'Calle',
                numero:007,
                extension:'A',
                cp:44100,
                colonia:'Colonia Americana',
                municipio:'Guadalajara',
                estado:'Jalisco',
                pais:'México'
            }
        ],
        whatsApp:[3344556677],
        socialNetworks:[
            {
                network:'facebook',
                name:`John Doe ${index}`,
                url:'facebook.com'
            }
        ],
        emails:['correo@hotmail.com'],
        htmlDescription:`<h1 class="Title">Hola Mundo</h1>`,
        workIds:workIds
    };

    return datosArtista;

}

async function transformarCompradorData(index = 0, obraId = false){
    if(obraId === false) return false;
    
    var obraCotizada = await Product.findById(obraId);

    let { _id } = obraCotizada;

    var datosComprador = {
        name:{
            name:'John',
            lastName:`Doe ${index}`
        },
        socialNetwork: {
            network:'facebook',
            name:`John Doe ${index}`,
            url:'facebook.com'
        },
        buyerType:'Galerista',
        location: {
            calle:'Calle',
            numero:007,
            extension:'A',
            cp:44100,
            colonia:'Colonia Americana',
            municipio:'Guadalajara',
            estado:'Jalisco',
            pais:'México'
        },
        obraCotizada:_id
    }

    return datosComprador;

}

async function transformarProductData(index = 0, idArtista = false){

    let imgIndex = index;
    imgIndex++;
    imgIndex > 50 ? imgIndex = imgIndex - 50 : imgIndex = imgIndex;
    
    if(idArtista === false) return false;

    var datosAutor = await Artista.findById(idArtista);
    //console.log(datosAutor.stageName);
    
    if(datosAutor.workIds.includes(idArtista)) return false;//Esa obra ya está enlazada con este autor

    const { _id, stageName } = datosAutor;

    var datosProduct = {
        productImg:'https://jacobflorescarrillo.com/img/paint-15.jpg',
        fichaTecnica:{
            autor:`${stageName}`,
            titulo: `Obra ${index}`,
            ancho: 120,
            alto: 150,
            tecnica: 'oleo sobre tela',
            finalizacion: Date.now(),
            descripcion:'Oleo Sobre Tela'
        },
        precio:108000,
        cantidad:1,
        status: 'disponible',
        autorId:_id
    }

    return datosProduct;
}

function transformarGaleriaData(index = 0){

    var datosPropietario = {
        galeryName: `Galeria de arte ${index}`,
        owner: { name:'Juan', lastName:'Nieves' },
        logoCDN: 'https://jacobflorescarrillo.com/img/paint-15.jpg',
        locations:[
            {
                calle:'Calle',
                numero:007,
                extension:'A',
                cp:44100,
                colonia:'Colonia Americana',
                municipio:'Guadalajara',
                estado:'Jalisco',
                pais:'México'
            }
        ],
        whatsApp:[3322116655],
        socialNetworks:[
            {
                network:'facebook',
                name:`John Snow ${index}`,
                url:'https://facebook.com'
            }
        ],
        emails:['correo@hotmail.com']
    }
    return datosPropietario;
}

async function Seeder(req, res){

    //Una sóla Galería con un único dueño
        _crearGaleria(transformarGaleriaData(1));

    //Crear 10 Artistas
        for(let i = 0; i < 10; i++){
            
            //randomArray = getRandomArray();
            //workIds = Products.filter((prod, i) => randomArray.includes(i));
            //workIds = workIds.map((prod, i) => { return prod._id });
            
            let dataArtista = transformarArtistaData(i);
            //dataArtista.workIds = workIds;
            dataArtista.workIds = [];

            await _crearArtista(dataArtista);
        }

    //Crear 10 obras y enlazarlas a un artista
        let Artistas = await Artista.find({});
        //console.log(Artistas.length);

        for(let i = 0; i < 100; i++){
            let idAutor = Artistas[getRandomArbitrary(0, 9)]._id;
            let dataProduct = await transformarProductData(i, idAutor);

            await _crearProduct(dataProduct);
        }
    //Crear 10 Compradores
        let Obras = await Product.find({});
        for(let i = 0; i < 10; i++){
            let obraId = Obras[getRandomArbitrary(0, 99)]._id;
            await _crearComprador( await transformarCompradorData(i, obraId) );
        }

    res.json(true);
    return true;    
}

module.exports = { Seeder };