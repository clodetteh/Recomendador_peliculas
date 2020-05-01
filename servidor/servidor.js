//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('lodash');

//Referencias controladores
var controladorPeliculas = require('./controladores/controlador_peliculas');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//RUTAS
app.get('/peliculas', controladorPeliculas.todasLasPeliculas);
app.get('/generos', controladorPeliculas.buscadorGenero);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

