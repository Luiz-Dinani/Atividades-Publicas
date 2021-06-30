	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		idUsuario: {
			field: 'idUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		nickname: {
			field: 'nickname',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		rating: {
			field: 'rating',
			type: DataTypes.INTEGER,
			allowNull: true
		},
		plataforma: {
			field: 'plataforma',
			type: DataTypes.STRING,
			allowNull: true
		},
		tituloFIDE: {
			field: 'tituloFIDE',
			type: DataTypes.STRING,
			allowNull: true
		},
		idFIDE: {
			field: 'idFIDE',
			type: DataTypes.INTEGER,
			allowNull: true
		},
		aberturaFavoritaBrancas: {
			field: 'aberturaFavoritaBrancas',
			type: DataTypes.STRING,
			allowNull: true
		},
		aberturaFavoritaPretas: {
			field: 'aberturaFavoritaPretas',
			type: DataTypes.STRING,
			allowNull: true
		},
	},
	{
		tableName: 'usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
