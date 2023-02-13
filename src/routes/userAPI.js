const User = require('../models/user');

const Product = require('../models/product');
const Artista = require('../models/artista');

async function _verUsuarios(){
    return await User.find({});
}

async function countUsuarios(req, res){
    var Usuarios = await User.find({});
    console.log(Usuarios.length);
    res.json(Usuarios.length);
    return Usuarios.length;
}

async function crearUsuario(req, res){
    var datos = req.body;
    const { rol } = datos;
    var isAdmin = rol === 'admin';

    if(isAdmin){
        let adminExist = await User.find({ rol:'admin' });
        if(adminExist){
            console.log('Ya existe un administrador');
        }
        datos.rol = 'user';
    }

    let newUser = new User(datos);
        newUser = await newUser.save();
    
    res.json(newUser);
    return newUser;
}

async function _crearUsuario(datos, isAdmin = false){
    if(isAdmin){
        let adminExist = await User.find({ rol:'admin' });
        if(adminExist) return false;
        datos.rol = 'admin';
    }

    let newUser = new User(datos);
        newUser = await newUser.save();
    
    return newUser;
}

async function borrarUsuarios(req, res){
    res.json(await User.remove());
    return true;
}

module.exports = { _verUsuarios, _crearUsuario, crearUsuario, countUsuarios, borrarUsuarios };