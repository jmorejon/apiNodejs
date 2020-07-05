const {Schema, model} = require('mongoose')

const COVID = new Schema({
    Nombre: {type: String},
    Departamento: {type: String},
    'Forma de Contagio': {type: String},
    Estado: {type: String},
    Edad: {type: Number},
});


module.exports= model("COVID", COVID);