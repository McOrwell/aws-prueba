const Product = require('../models/product');
const Artista = require('../models/artista');

async function crearProduct(req, res){
    const datos = req.body;
            datos.productImg = datos.productImg[0];
    const Autor = await Artista.findById(datos.autorId);

    const nuevoProducto = new Product(datos);
    const productoCreado = await nuevoProducto.save();

    var { workIds } = Autor;
    workIds.push(productoCreado._id);
    await Artista.findByIdAndUpdate(Autor._id, { workIds });

    res.json(nuevoProducto);
    return nuevoProducto;
}

async function _crearProduct(datos){
    const Autor = await Artista.findById(datos.autorId);

    const nuevoProducto = new Product(datos);
    const productoCreado = await nuevoProducto.save();

    var { workIds } = Autor;
    workIds.push(productoCreado._id);
    await Artista.findByIdAndUpdate(Autor._id, { workIds });

    return nuevoProducto;
}

async function actualizarProduct(req, res){
    var { datos, id } = req.body;
    datos.productImg = datos.productImg[0];

    let prodActualizado = await Product.findByIdAndUpdate(id, datos);

    res.json(prodActualizado);
    return prodActualizado;
}

async function verProducts(req, res){
    let Prods =  await Product.find({});
    res.json(Prods);
    return Prods;
}

async function borrarProduct(req, res){
    const { productId } = req.body;
    var product = await Product.findById(productId);
    var autor = await Artista.findById(product.autorId);
    var { workIds } = autor;
    workIds = workIds.filter(workId => workId !== productId);

    console.log(productId);
    console.table(workIds);

    let artistaActualizado = await Artista.findByIdAndUpdate(product.autorId, { workIds });
    let prodEliminado = await Product.findByIdAndDelete(productId);
    
    res.json(true);
}

async function borrarProducts(req, res){
    let Prods = await Product.remove();
    res.json(Prods);
    return Prods;
}

module.exports = { crearProduct, _crearProduct, actualizarProduct, verProducts, borrarProduct, borrarProducts };