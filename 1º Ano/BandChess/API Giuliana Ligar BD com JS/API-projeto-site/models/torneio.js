'use strict';
/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Torneio = sequelize.define('Torneio',{
		idTorneio: {
			field: 'idTorneio',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nomeTorneio: {
			field: 'nomeTorneio',
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		dataTorneio: {
			field: 'dataTorneio',
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		campeao: {
			field: 'Campeao',
			type: DataTypes.STRING,
			allowNull: true
		},
		segundo: {
			field: 'segundo',
			type: DataTypes.STRING,
			allowNull: true
		},
		terceiro: {
			field: 'terceiro',
			type: DataTypes.STRING,
			allowNull: true
		},
		quarto: {
			field: 'quarto',
			type: DataTypes.STRING,
			allowNull: true
		},
		quinto: {
			field: 'quinto',
			type: DataTypes.STRING,
			allowNull: true
		},
	},
	{
		tableName: 'torneio', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Torneio;
};