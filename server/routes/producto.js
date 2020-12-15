const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');
const categoria = require('../models/categoria');


let app = express();
let Producto = require('../models/producto');

// ==============================
// Obtener productos
// ==============================
app.get('/productos',verificaToken,(req,res)=>{
    // trae todos los productos
    // populate: usuario categoria
    // paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({disponible: true })
            .skip(desde)
            .limit(limite)
            .populate('usuario','nombre email')
            .populate('categoria', 'descripcion')
            .exec((err,productos)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: 'No se encontraron productos'
                        }
                    });
                }
                res.json({
                    ok: true,
                    productos
                });
            });
});

// ==============================
// Obtener producto por ID
// ==============================
app.get('/productos/:id',verificaToken,(req,res)=>{
    // populate: usuario categoria
    // paginado
    let id = req.params.id;
    Producto.findById(id)
            .populate('usuario','nombre email')
            .populate('categoria', 'descripcion')
            .exec((err,productoDB)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: 'No se encontro el producto'
                        }
                    });
                }
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'No se encontro el producto'
                        }
                    });
                }
                res.json({
                    ok: true,
                    producto: productoDB
                });
            });

});

// ==============================
// Buscar productos
// ==============================
app.get('/productos/buscar/:termino',verificaToken,(req,res)=>{
    
    let termino = req.params.termino;
    let regex = new RegExp(termino,'i');

    Producto.find({nombre: regex})
            .populate('categoria','nombre')
            .exec((err,productos)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    productos
                });
            });
});

// ==============================
// Crear un nuevo producto
// ==============================
app.post('/productos',verificaToken,(req,res)=>{
    // grabar el usuario
    // grabar una categoría del listado
    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        img: body.img
    });
    producto.save((err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!productoDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });
});

// ==============================
// Actualizar producto
// ==============================
app.put('/productos/:id',verificaToken,(req,res)=>{
    // grabar el usuario
    // grabar una categoría del listado
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id,(err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }
        if(!productoDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;
        productoDB.save((err,productoGuardado)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if(!productoDB){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoGuardado
            });
        });

    });

});

// ==============================
// Borrar producto
// ==============================
app.delete('/productos/:id',verificaToken,(req,res)=>{
    // disponible: false
    let id = req.params.id;

    Producto.findById(id,(err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!productoDB){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        productoDB.disponible = false;
        productoDB.save((err,productoBorrado)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto borrado'
            });
        });

    });

});

module.exports = app;