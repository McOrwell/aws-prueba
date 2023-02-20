const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const { crearArtista, verArtistas, borrarArtistas, actualizarArtista, borrarArtista } = require('./artistaAPI');
const { crearComprador, verCompradores, borrarCompradores } = require('./compradorAPI');
const { crearProduct, verProducts, borrarProduct, borrarProducts, actualizarProduct } = require('./productAPI');
const { crearGaleria, verGalerias, borrarGalerias, actualizarGaleria, countGalerias } = require('./galeriaAPI');
const { Seeder } = require('./Seeder');
const { countUsuarios, borrarUsuarios, crearUsuario } = require('./userAPI');
const { crearImagen, verImagenes, borrarImagen } = require('./imagenAPI');

/* MULTER */

const multer = require('multer');
const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/assets'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      let filename = file.originalname.split('.')[0];
      let name = file.originalname.replace(`${filename}`, `${filename}-${uniqueSuffix}`);

      return cb(null, name);
    }
  }
);
const fileFilter = (req, file, cb) => {
    const mimeTypes = /image/;
    let isValid = mimeTypes.test(file.mimetype);
    console.log('El archivo es valido?', isValid);
    if(isValid) return cb(null, isValid);
    else return cb('Error: Tipo de archivo no permitido');
}
const upload = multer({ storage, fileFilter });
//const upload = multer({  dest: path.join(__dirname, '../public/assets'), storage });


router.post('/subirImagen', upload.single('imagen'), async (req, res) => {
  console.log(req.file);
  let newImagen = await crearImagen(req.file);
  res.redirect(`/admin/subirImagen`);
});

/* MULTER */

//C - Create
router.post('/rutaPrueba', async (req, res) => {
  console.log(req.body);
  res.json(false);
});

router.post('/crearArtista', isAuthenticated, crearArtista);
router.post('/crearComprador', crearComprador);
router.post('/crearProduct', isAuthenticated, crearProduct);
router.post('/crearGaleria', isAuthenticated, crearGaleria);
router.post('/crearUsuario', isAuthenticated, crearUsuario);
router.get('/seeder', isAuthenticated, Seeder);

//U - Update
router.post('/actualizarArtista', isAuthenticated, actualizarArtista);
router.post('/actualizarProduct', isAuthenticated, actualizarProduct);
router.post('/actualizarGaleria', isAuthenticated, actualizarGaleria);

//R - Read
router.post('/verArtistas', verArtistas);
router.post('/verCompradores', verCompradores);
router.post('/verProducts', verProducts);
router.post('/verGalerias', verGalerias);

router.post('/countUsuarios', isAuthenticated, countUsuarios);
router.post('/countGalerias', isAuthenticated, countGalerias);
router.post('/verImagenes', verImagenes);


//U - Update

//D - Delete
router.post('/borrarArtistas', isAuthenticated, borrarArtistas);
router.post('/borrarArtista', isAuthenticated, borrarArtista);
router.post('/borrarCompradores', isAuthenticated, borrarCompradores);
router.post('/borrarProduct', isAuthenticated, borrarProduct);
router.post('/borrarProducts', isAuthenticated, borrarProducts);
router.post('/borrarGalerias', isAuthenticated, borrarGalerias);
router.post('/borrarUsuarios', isAuthenticated, borrarUsuarios);




/* Servidor */

  /* Admin */
    router.get(`/admin/inicializarPagina`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/subirImagen`, isAuthenticated, async (req, res) => { res.render('admin'); });


    router.get(`/admin`,isAuthenticated, async (req, res) => { res.render('admin'); });
    router.get(`/admin/login`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/artistas`, isAuthenticated, async (req, res) => { res.render('admin'); });
    router.get(`/admin/obras`, isAuthenticated, async (req, res) => { res.render('admin'); });
    router.get(`/admin/verContactos`, isAuthenticated, (req, res) => { res.render('admin'); });


    router.get(`/admin/artistas/:id`, isAuthenticated, (req, res) => { res.render('admin'); });
    router.get(`/admin/obras/:id`, isAuthenticated, (req, res) => { res.render('admin'); });

    router.get(`/admin/galerias/editarGaleria`, isAuthenticated, async (req, res) => { res.render('admin'); });

    router.get(`/admin/artistas/crearArtista`, isAuthenticated, async (req, res) => { res.render('admin'); });
    router.get(`/admin/obras/crearObra`, isAuthenticated, async (req, res) => { res.render('admin'); });
  /* Admin */

  /* Public */
    router.get(`/productos`, async (req, res) => { res.render('index'); });
    router.get(`/productos/:id`, async (req, res) => { res.render('index'); });
    router.get(`/productos/pagina/:id`, async (req, res) => { res.render('index'); });

    router.get(`/artistas`, async (req, res) => { res.render('index'); });
    router.get(`/artistas/:id`, async (req, res) => { res.render('index'); });
    router.get(`/artistas/pagina/:Pagina`, async (req, res) => { res.render('index'); });

    router.get(`/cotizarObra/:id`, async (req, res) => { res.render('index'); });

  /* Public */


/* Servidor */




/* Funciones de inicio de sesion */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true
})); 


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true
}));


router.get('/admin/logout', (req, res, next) => {
  req.logout(
    function(err) {
      if (err) { return next(err); }
      res.redirect('/admin/login');
    }
  );
  //res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/admin/login')
}

module.exports = router;
