var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por email e senha */
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
			sessoes.push(resultado[0].dataValues.email);
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
		plataforma: req.body.plataforma,
		tituloFIDE: req.body.tituloFIDE,
		idFIDE: req.body.idFIDE,
		aberturaFavoritaBrancas: req.body.aberturaBranca,
		aberturaFavoritaPretas: req.body.aberturaPreta
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Verificação de usuário */
router.get('/sessao/:email', function(req, res, next) {
	let email = req.params.email;
	console.log(`Verificando se o usuário ${email} tem sessão`);

	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == email) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${email} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
});


/* Logoff de usuário */
router.get('/sair/:email', function(req, res, next) {
	let email = req.params.email;
	console.log(`Finalizando a sessão do usuário ${email}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != email) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${email} finalizada com sucesso!`);
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

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/admin', function(req, res, next) {
	console.log('Recuperando todas as publicações');

    let instrucaoSql = `SELECT 
    round(avg(rating)) as "RatingMedio"
    FROM usuario
    `;

	sequelize.query(instrucaoSql, {
		model: Usuario,
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