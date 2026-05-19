const multer = require('multer');

// Utilizzo di Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'uploads/') }, // cartella di destinazione
    filename: function (req, file, cb) { cb(null, file.originalname) } // nome del file
})


function fileFilter (req, file, cb) {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error('File non valido!'))
    }
  }

const upload = multer({ storage: storage, fileFilter: fileFilter }) // Setto la cartella di destinazione per i file caricati sul server

module.exports = {upload}