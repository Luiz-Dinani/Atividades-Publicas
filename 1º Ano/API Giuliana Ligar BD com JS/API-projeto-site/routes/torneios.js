var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Torneio = require('../models').Torneio;


/* Cadastrar Torneio */
router.post('/cadastrarTorneio', function (req, res, next) {
	console.log('Criando um torneio');
	Torneio.create({
		nomeTorneio: req.body.nomeTorneio,
		dataTorneio: req.body.dataTorneio,
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.put('/encerrarTorneio/:idTorneio/:campeao/:segundo/:terceiro/:quarto/:quinto', function (req, res, next) {

	let idTorneio = req.params.idTorneio;

	console.log(`Encerrando o torneio: ${idTorneio}`);
	Torneio.update(
		{
			campeao: req.params.campeao,
			segundo: req.params.segundo,
			terceiro: req.params.terceiro,
			quarto: req.params.quarto,
			quinto: req.params.quinto,
		},
		{ where: {idTorneio: idTorneio} }).then(function (rowsUpdated) {
			res.json(rowsUpdated)
		})
		.catch(next)
});
// var idTorneio = req.body.idTorneio;
// var campeao = req.body.campeao;
// var segundo = req.body.segundo;
// var terceiro = req.body.terceiro;
// var quarto = req.body.quarto;
// var quinto = req.body.quinto;

// let instrucaoSql = "";

// // abaixo, escreva o select de dados para o Workbench
// instrucaoSql = `update Torneio set campeao = ${campeao}, segundo = ${segundo}, terceiro = ${terceiro}, quarto = ${quarto}, quinto = ${quinto} where idTorneio=${idTorneio}`;

// sequelize.query(instrucaoSql, {
// 	model: Torneio,
// 	mapToModel: true
// })
// 	.then(resultado => {
// 		console.log(`Atualizado: ${resultado.length}`);
// 		res.json(resultado);
// 	}).catch(erro => {
// 		console.error(erro);
// 		res.status(500).send(erro.message);
// 	});
// });

// router.post('/atualizar', function(req, res, next) {
// 	console.log('Recuperando torneio pelo ID');

// 	var idTorneio = req.body.idTorneio; // depois de .body, use o nome (name) do campo em seu formulário de email

// 	let instrucaoSql = `select * from torneio where idTorneio='${idTorneio}'`;
// 	console.log(instrucaoSql);

// 	sequelize.query(instrucaoSql, {
// 		model: Usuario
// 	}).then(resultado => {
// 		console.log(`Encontrados: ${resultado.length}`);

// 		if (resultado.length == 1) {
// 			sessoes.push(resultado[0].dataValues.email);
// 			console.log('sessoes: ',sessoes);
// 			res.json(resultado[0]);
// 		} else if (resultado.length == 0) {
// 			res.status(403).send('nickname e/ou senha inválido(s)');
// 		} else {
// 			res.status(403).send('Mais de um usuário com o mesmo nickname e senha!');
// 		}

// 	}).catch(erro => {
// 		console.error(erro);
// 		res.status(500).send(erro.message);
//   	});
// });
module.exports = router;