	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		idUser: {
			field: 'idUser',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: true
		},
		nickname: {
			field: 'nickname',
			type: DataTypes.STRING,
			allowNull: true
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: true
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
	},
	{
		tableName: 'usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
