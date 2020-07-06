

//DEPARTAMENTOS CON MAS CASOS TOP 3
db.COVID.aggregate(
    {"$group" : { "_id": "$Departamento", "count": { "$sum": 1 } } },
    {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
    {"$sort": {"count" : -1} },
    {"$project": {"Departamento" : "$_id", "_id" : 0} },
).limit(3)

//todo   
db.COVID.find()


//total por edades   
   
db.COVID.aggregate(
    {"$group" : { "_id": "Edad", "count": { "$sum": 1 } } },
    {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
    {"$sort": {"count" : -1} },
    {"$project": {"Edad" : "$_id", "_id" : 0} },
).limit(3)

db.COVID.count()
