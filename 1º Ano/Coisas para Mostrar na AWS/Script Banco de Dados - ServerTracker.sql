create database serverTracker;
use serverTracker;

create table empresa(
idEmpresa int primary key auto_increment,
nomeEmpresa varchar(60),
CNPJ char(14),
telefoneContato char(11),
emailEmpresa varchar(60),
senhaEmpresa varchar(60),
dataContrato Date
);

create table servidor(
idServidor int primary key auto_increment,
nomeServer varchar(45) unique,
fkEmpresa int,
localizacao varchar(60),
dataCriacao date,
foreign key (fkEmpresa) references empresa(idEmpresa)
)auto_increment=100;

create table funcionario(
 idFuncionario int  auto_increment,
 nomeFuncionario varchar(60),
 cargo varchar(60),
 adm boolean, 
 emailFuncionario varchar(60),
 senhaFuncionario varchar(60),
 dataCriacao date,
 fkEmpresa int,
 primary key (idFuncionario,fkEmpresa),
 foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table monitoramento(
fkServidor int,
fkEmpresa int,
fkFuncionario int,
foreign key (fkEmpresa) references empresa(idEmpresa),
foreign key (fkFuncionario) references Funcionario(idFuncionario),
foreign key (fkServidor) references servidor(idServidor),
primary key(fkServidor,fkEmpresa,fkFuncionario)
);

create table dadosHardware(
-- idDados int auto_increment,
dadosCpuPercent decimal(5,2),
dadosRamPercent decimal(5,2),
dadosDiscoPercent decimal(5,2),
dataTempo datetime,
fkServidor int,
fkEmpresa int,
foreign key (fkEmpresa) references empresa(idEmpresa),
foreign key (fkServidor) references servidor(idServidor),
primary key(idDados,fkServidor,fkEmpresa)
);

insert into empresa (nomeEmpresa,CNPJ,telefoneContato,emailEmpresa,senhaEmpresa,dataContrato) values
					("EVContabilidade","55413500000147","11995936387","contabil@pietraevicenteconstrucoesme.com.br","T6!sz^R"
					,"2021-09-27");
                    
insert into empresa (nomeEmpresa,CNPJ,telefoneContato,emailEmpresa,senhaEmpresa,dataContrato) values
					("Safra","43115208000169","1142381137","safraservices@hotmail.com.br","#u,AFCa%"
					,"2021-03-19");

insert into empresa (nomeEmpresa,CNPJ,telefoneContato,emailEmpresa,senhaEmpresa,dataContrato) values
					("TIVIT","26332597000165","11977882270","serviceTiviT@outlook.com.br","u4Y?{0s"
					,"2021-03-13");

insert into servidor (localizacao, fkEmpresa) values ("São Paulo", 1);
insert into servidor (localizacao, fkEmpresa) values ("Rio de Janeiro", 2);
insert into servidor (localizacao, fkEmpresa) values ("Minas Gerais", 3);

select * from dadosHardware;
truncate dadosHardware;
