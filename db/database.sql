create database if not exist proyect; 

use proyect;

create table registro(

nombre varchar(50) not null,
apellido varchar(50) not null,
email varchar(50) not null primary key,
password varchar(50) not null,
token int,
)