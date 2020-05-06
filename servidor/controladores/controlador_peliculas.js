var con = require('../lib/conexionbd_movies');

function condicionSql(columna, campo, condicion) {
    switch(condicion) {
        case '=':
            return `${columna} = ${campo}`
        case 'like':
            return `${columna} like '%${campo}%'`
    }
}

function todasLasPeliculas(req, res){

    var fields = {
        genero: { column: 'genero_id', condition: '=' },
        anio:  { column: 'anio', condition: '=' },
        titulo: { column: 'titulo', condition: 'like' }
    }

    var statement = '';
    var conditionCount = 0;
    ['genero', 'anio', 'titulo'].forEach((filtro, index) => {
        if(req.query[filtro] !== undefined) {
            if(conditionCount === 0) {
                statement += ` where`;
            } else {
                statement += ` and`;
            }
            statement += ` ${condicionSql(fields[filtro].column, req.query[filtro], fields[filtro].condition)}`;
            conditionCount ++;
        }
    });

    var order = '';
    if(req.query.tipo_orden !== undefined && req.query.columna_orden !== undefined){
        order = `order by ${req.query.columna_orden} ${req.query.tipo_orden}`;
    }

    sql = `select * from pelicula ${statement} ${order}`; 
    

   var paginaCalculo = (req.query.pagina - 1)* req.query.cantidad;
   var paginador = `limit ${paginaCalculo},${req.query.cantidad}`;
   

   sql = `select * from pelicula ${statement} ${order} ${paginador}`; 
   sqlCount = `select count(*) as conteo from pelicula ${statement}`;


    con.query(sql, function(error, resultado){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        } 
        var total = null;
        con.query(sqlCount, function(error, resultadoConteo){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            var subTotal = JSON.parse(JSON.stringify(resultadoConteo))
            total = subTotal[0]['conteo'];

            var response = {
                'peliculas': resultado,
                'total': total,
            };
            
            res.send(JSON.stringify(response));
        });  
    });
};

function buscadorGenero(req, res){
    var genero = req.query.genero;
    
    if(!genero){
        var sql = "select * from genero";
    };

    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {'generos' : resultado};

        res.send(JSON.stringify(response));
    });
};

function informacionPeliculas(req, res){
    var id = req.params.id;
    var sql = `select *, nombre from pelicula join genero on genero_id = genero.id where pelicula.id = ${id}`;
    var sqlActores = `select actor.nombre from pelicula join actor_pelicula on pelicula.id = actor_pelicula.pelicula_id join actor on actor_pelicula.actor_id = actor.id where pelicula.id = ${id}`;

    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        };

        var actores = null;
        con.query(sqlActores, function(error, resultadoActores, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            
            actores = resultadoActores;
            var response = {
                'pelicula': resultado[0],
                'actores' : actores,
            };
            res.send(JSON.stringify(response));
        });  
    });
};

function recomendador(req, res){
    var fields = {
        genero: { column: 'genero.nombre', condition: '='},
        anio_inicio:  { column: 'anio', condition: '>='},
        anio_fin: { column: 'anio', condition: '<='},
        puntuacion : {column : 'puntuacion', condition: '='}
    }

    var statement = '';
    var conditionCount = 0;
    ['genero', 'puntuacion', 'anio_inicio', 'anio_fin'].forEach((filtro) => {
        if(req.query[filtro] !== undefined) {
            if(conditionCount === 0) {
                statement += ` where`;
            } else {
                statement += ` and`;
            }
            var x = req.query[filtro]
            if (isNaN(x)) {
                x = `'${x}'`
            }
            statement += ` ${fields[filtro].column} ${fields[filtro].condition} ${x}`;
            conditionCount ++;
        }
    });

    var sql = `select *, nombre, pelicula.id from pelicula join genero on genero_id = genero.id ${statement}`
   
    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        };

        var response = {
            'peliculas' : resultado,
        };
        
        res.send(JSON.stringify(response));
    });

}

module.exports = {
    todasLasPeliculas: todasLasPeliculas,
    buscadorGenero: buscadorGenero,
    informacionPeliculas : informacionPeliculas,
    recomendador : recomendador,
};