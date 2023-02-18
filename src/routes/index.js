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
  res.json(newImagen);
});

/* MULTER */

//C - Create
router.post('/rutaPrueba', async (req, res) => {
  console.log(req.body);
  res.json(false);
});

router.post('/crearArtista', crearArtista);
router.post('/crearComprador', crearComprador);
router.post('/crearProduct', crearProduct);
router.post('/crearGaleria', crearGaleria);
router.post('/crearUsuario', crearUsuario);
router.get('/seeder', Seeder);

//U - Update
router.post('/actualizarArtista', actualizarArtista);
router.post('/actualizarProduct', actualizarProduct);
router.post('/actualizarGaleria', actualizarGaleria);

//R - Read
router.post('/verArtistas', verArtistas);
router.post('/verCompradores', verCompradores);
router.post('/verProducts', verProducts);
router.post('/verGalerias', verGalerias);

router.post('/countUsuarios', countUsuarios);
router.post('/countGalerias', countGalerias);
router.post('/verImagenes', verImagenes);


//U - Update

//D - Delete
router.post('/borrarArtistas', borrarArtistas);
router.post('/borrarArtista', borrarArtista);
router.post('/borrarCompradores', borrarCompradores);
router.post('/borrarProduct', borrarProduct);
router.post('/borrarProducts', borrarProducts);
router.post('/borrarGalerias', borrarGalerias);
router.post('/borrarUsuarios', borrarUsuarios);




/* Servidor */

  /* Admin */
    router.get(`/admin/inicializarPagina`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/subirImagen`, async (req, res) => { res.render('admin'); });


    router.get(`/admin`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/login`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/artistas`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/obras`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/verContactos`, async (req, res) => { res.render('admin'); });


    router.get(`/admin/artistas/:id`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/obras/:id`, async (req, res) => { res.render('admin'); });

    router.get(`/admin/galerias/editarGaleria`, async (req, res) => { res.render('admin'); });

    router.get(`/admin/artistas/crearArtista`, async (req, res) => { res.render('admin'); });
    router.get(`/admin/obras/crearObra`, async (req, res) => { res.render('admin'); });
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

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/admin/logout', (req, res, next) => {
  req.logout(
    function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    }
  );
  //res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;
