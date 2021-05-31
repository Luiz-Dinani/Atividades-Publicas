var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Comentario = require('../models').Comentario;

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar/:idUsuario', function(req, res, next) {
    console.log("Executando a função publicar, na rota /publicar/:idUsuario")

	let idUsuario = req.params.idUsuario;
    let textoComentario = req.body.newComment

    Comentario.create({
        fkUsuario: idUsuario,
        textoComentario: textoComentario,
        resposta: 1
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as publicações');

    let instrucaoSql = `SELECT 
    usuario.nickname,
    textoComentario,
    tituloFIDE,
    rating
    FROM comentario
    INNER JOIN usuario
    ON Comentario.fkUsuario = Usuario.idUsuario
    ORDER BY comentario.idComentario DESC`;

	sequelize.query(instrucaoSql, {
		model: Comentario,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
        console.log(`Dados recebidos: ${JSON.stringify(resultado)}`);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idUsuario = req.params.idUsuario;

    let instrucaoSql = `SELECT 
    usuario.nickname,
    textoComentario
    FROM Comentario
    INNER JOIN usuario
    ON comentario.fkUsuario = Usuario.idUsuario
    WHERE fkUsuario = ${idUsuario}
    ORDER BY comentario.id DESC`;

	sequelize.query(instrucaoSql, {
		model: Comentario,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
        console.log(`Dados recebidos: ${JSON.stringify(resultado)}`);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;