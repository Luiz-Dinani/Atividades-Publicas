var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por nickname e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por email e senha');

	var email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de email
	var senha = req.body.senha; 
		
	let instrucaoSql = `select * from usuario where email='${email}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.nickname);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('nickname e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo nickname e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	Usuario.create({
		email: req.body.email,
		nickname: req.body.nickname,
		senha: req.body.senha,
		rating: req.body.rating,
		tituloFIDE: req.body.tituloFIDE,
		idFIDE: req.body.idFIDE,
		plataforma: req.body.plataforma
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Verificação de usuário */
router.get('/sessao/:nickname', function(req, res, next) {
	let nickname = req.params.nickname;
	console.log(`Verificando se o usuário ${nickname} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == nickname) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${nickname} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:nickname', function(req, res, next) {
	let nickname = req.params.nickname;
	console.log(`Finalizando a sessão do usuário ${nickname}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != nickname) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${nickname} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
