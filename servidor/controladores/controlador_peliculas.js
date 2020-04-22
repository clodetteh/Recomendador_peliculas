var con = require('../lib/conexionbd_movies');

function todasLasPeliculas(req, res){
    var titulo_pelicula = req.query.pelicula;
    
    if(titulo_pelicula){
        var sql = "select titulo from pelicula";
    }else{
        var sql = "select * from pelicula";
    }
    
    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        
        var response = {'peliculas': resultado};

        res.send(JSON.stringify(response));
    });
};

module.exports = {
    todasLasPeliculas: todasLasPeliculas,
};