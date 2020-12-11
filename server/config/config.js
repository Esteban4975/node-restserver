


// =========================
// Puerto
// =========================

process.env.PORT = process.env.PORT || 3000;

// =========================
// Entorno
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
// Base de datos
// =========================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://adminDB:tPFaKLUf8WF0SqbY@cluster0.nr2vx.mongodb.net/cafe?retryWrites=true&w=majority'; 
}

process.env.URLDB = urlDB;