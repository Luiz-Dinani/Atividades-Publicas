create database BandChess;
use BandChess;

CREATE TABLE Usuario (
  iduser INT primary key auto_increment,
  email VARCHAR(45) NOT NULL,
  nickname VARCHAR(20) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  rating INT(5),
  plataforma VARCHAR(10),
  tituloFIDE CHAR(2) check (tituloFIDE in('NO','GM', 'IM', 'NM')),
  idFIDE int(15)
);
select * from usuario;
truncate usuario;
CREATE TABLE Abertura(
  codigoECO VARCHAR(45) primary key,
  nome VARCHAR(45)
  );

CREATE TABLE UserAbertura (
  fkUser int,
  fkAberturaFavoritaBrancas char(3),
  fkAberturaFavoritaPretas char(3),
  foreign key (fkUser) references tbUser(idUser),
  foreign key (fkAberturaFavoritaBrancas) references tbAbertura(codigoECO),
  foreign key (fkAberturaFavoritaPretas) references tbAbertura(codigoECO),
  primary key(fkUser, fkAberturaFavoritaBrancas, fkAberturaFavoritaPretas)
    );

CREATE TABLE Comentario (
  idComentario INT primary key auto_increment,
  fkUser int,
  textoComentario VARCHAR(500) NOT NULL,
  foreign key (fkUser) references tbUser(idUser)
  );