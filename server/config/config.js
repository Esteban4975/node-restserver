


// =========================
// Puerto
// =========================

process.env.PORT = process.env.PORT || 3000;

// =========================
// Entorno
// =========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
// Vencimiento del token [SEGUNDOS]
// =========================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =========================
// SEED de auntenticación
// =========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// =========================
// Base de datos
// =========================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI; 
}

process.env.URLDB = urlDB;

// =========================
// Google Client ID
// =========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '913783762804-0g7i8893k0j1pmli7425fq0ig88eej2u.apps.googleusercontent.com';
