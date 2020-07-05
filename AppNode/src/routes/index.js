const {Router, json} = require('express');
const router = Router();
//const Product = require('../models/Product');
const COVID = require('../models/Covid')

const result = require('../db');



router.get('/', async(req, res) => {
    console.log(result.all)
    res.render('index', {resultado: result.all});
});

router.get('/depto_casos', async(req, res) => {
    console.log(result.top)
    res.render('deptoCasos', {resultado: result.top});
});
router.get('/gpie', async(req, res) => {
    
    res.render('gpie', {resultado: result.deptos});
});
router.get('/ultimo_caso', async(req, res) => {
    var ultimoCaso = result.ultimo;
    res.render('ultimo', {resultado: ultimoCaso});
});
router.get('/gbarras', async(req, res) => {
    
    res.render('gbarras', {resultado: result.rango, cantidad:result.cantidad});
});

router.get('/all', async(req, res) => {
    console.log(result.all)
    res.render('all', {resultado: result.all});
});



router.post('/add-product', async(req, res) =>{
    const newProduct =new COVID(req.body);
    await newProduct.save();
    console.log(req.body);
    console.log(newProduct);
    res.redirect('/');
});

module.exports = router;