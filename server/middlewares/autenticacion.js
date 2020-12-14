const jwt = require('jsonwebtoken');


// ====================
// Verificar token
// ====================

let verificaToken = (req,res,next) => {
    let token = req.get('token');
    //console.log("ok categoria");
    jwt.verify(token,process.env.SEED,(err,decode)=>{
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    });
    //console.log(token);
};

// ====================
// Verificar adminRole
// ====================

let verificaAdmin_Role = (req,res,next)=>{
    
    let usuario = req.usuario;
    if(!(usuario.role === 'ADMIN_ROLE')){
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    
    next();
};

module.exports = {
    verificaToken,
    verificaAdmin_Role
}