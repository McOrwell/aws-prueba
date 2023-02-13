const express = require('express');
const passport = require('passport');

const { crearArtista, verArtistas, borrarArtistas, actualizarArtista, borrarArtista } = require('./artistaAPI');
const { crearComprador, verCompradores, borrarCompradores } = require('./compradorAPI');
const { crearProduct, verProducts, borrarProduct, borrarProducts, actualizarProduct } = require('./productAPI');
const { crearGaleria, verGalerias, borrarGalerias, actualizarGaleria, _crearGaleria, _verGalerias } = require('./galeriaAPI');
const { _verUsuarios, _crearUsuario } = require('./userAPI');

async function inicializarPagina(req,res){
    //Pasos: Crear Administrador, Iniciar Sesion, Crear Una Galería

    const { paso } = req.body;

    if(paso == 'crearAdministrador'){
        const { datosAdmin } = req.body;
        let Usuarios = _verUsuarios();
        
        //Si aún no se ha creado el Administrador
        if(Usuarios.length === 0) {
            let newUser = await _crearUsuario(datosAdmin, true);
            res.json('creadoConExito'); 
        } else {
            res.json('yaExisteUnAdmin');
        }
    }

    if(paso == 'crearGaleria'){
        const Galerias = _verGalerias();
        if(Galerias.length === 0){
            const { datosGaleria } = req.body;
            let newGalery = await _crearGaleria(datosGaleria);
            res.json('galeriaCreadaConExito');
        } else {
            res.json('yaExisteUnaGaleria');
        }
    }
    
    

}

module.exports = { inicializarPagina };
