var MongoClient = require('mongodb');
var redis = require('redis');
var url = 'mongodb://34.70.248.22:27017';
var redis = require('redis');
var client = redis.createClient("http://146.148.56.107"); //creates a new client

client.on("connect", function() {
    console.log("Conectado a la base de datos REDIS");
});

//TODOS LOS DATOS
MongoClient.connect(url,{useUnifiedTopology: true},function(err, db) { 
    if (!err) {
        var dbo = db.db("Proyecto2MDB");
        dbo.collection("COVID").find().toArray(function(err, res) {
            if (err) throw err;
            exports.all = res;
            db.close();
        });
    } else {
        exports.all = null;
        console.log(error);
    }
});
//departamentos con mas casos
MongoClient.connect(url,{useUnifiedTopology: true},function(err, db) { 
    if (!err) {
        var dbo = db.db("Proyecto2MDB");
        dbo.collection("COVID").aggregate(
            {"$group" : { "_id": "$Departamento", "count": { "$sum": 1 } } },
            {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
            {"$sort": {"count" : -1} },
            {"$project": {"Departamento" : "$_id", "_id" : 0} },
        ).limit(3).toArray(function(err, res) {
            if (err) throw err;
            exports.top = res;
            db.close();
        });
    } else {
        exports.top = null;
        console.log(error);
    }
});


//departamentos total
MongoClient.connect(url,{useUnifiedTopology: true},function(err, db) { 
    if (!err) {
        var dbo = db.db("Proyecto2MDB");
        dbo.collection("COVID").aggregate(
            {"$group" : { "_id": "$Departamento", "count": { "$sum": 1 } } },
            {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
            {"$sort": {"count" : -1} },
            {"$project": {"Departamento" : "$_id", "_id" : 0} },
        ).toArray(function(err, res) {
            if (err) throw err;
            exports.deptos = res;
            db.close();
        });
    } else {
        exports.deptos = null;
        console.log(error);
    }
});


client.lrange("Proyecto2RDB", -1, -1, function(err, reply) {
    var variableString = reply;
    var json = JSON.parse(variableString)
    exports.ultimo = json;
});


/*client.lrange("Proyecto2RDB",0,-1, function(err,reply){
    //console.log(reply.toString().replace(/&#92;/g,""))
    const jsonStr  = reply.toString().replace(/&#92;/g,"");
    const json = JSON.parse(jsonStr.replace(/'\'/g,""));
})*/

//departamentos total
MongoClient.connect(url,{useUnifiedTopology: true},function(err, db) { 
    if (!err) {
        var dbo = db.db("Proyecto2MDB");
        dbo.collection("COVID").aggregate(
            {"$group" : { "_id": "$Edad", "count": { "$sum": 1 } } },
            {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
            {"$sort": {"count" : -1} },
            {"$project": {"Edad" : "$_id", "_id" : 0} },
        ).toArray(function(err, res) {
            if (err) throw err;
            console.log(res);
            rango = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'];
            cantidad = [0,0,0,0,0,0,0,0,0,0];
            res.forEach(function(resultado){
                var edad = resultado._id;
                if( edad <= 10){
                    cantidad[0] = cantidad[0] + resultado.count;
                }else if(edad <= 20 && edad >10){
                    cantidad[1] = cantidad[1] + resultado.count;
                }else if(edad <= 30 && edad >20){
                    cantidad[2] = cantidad[2] + resultado.count;
                }else if(edad <= 40 && edad >30){
                    cantidad[3] = cantidad[3] + resultado.count;
                }else if(edad <= 50 && edad >40){
                    cantidad[4] = cantidad[4] + resultado.count;
                }else if(edad <= 60 && edad >50){
                    cantidad[5] = cantidad[5] + resultado.count;
                }else if(edad <= 70 && edad >60){
                    cantidad[6] = cantidad[6] + resultado.count;
                }else if(edad <= 80 && edad >70){
                    cantidad[7] = cantidad[7] + resultado.count;
                }else if(edad <= 90 && edad >80){
                    cantidad[8] = cantidad[8] + resultado.count;
                }else if(edad <= 100  && edad >90){
                    cantidad[9] = cantidad[9] + resultado.count;
                }    
            });

            exports.rango = rango;
            exports.cantidad= cantidad;
            db.close();
        });
    } else {
        exports.rango = null;
        exports.cantidad = null;
        console.log(error);
    }
});





