create database if not exist proyect; 

use proyect;

create table registro(
id int auto_increment primary key,
nombre varchar(50) not null,
apellido varchar(50) not null,
email varchar(50) not null,
password varchar(50) not null,

)


create table productos(
    id int auto_increment primary key,
    nameProduct varchar(50) not null,
    priceProduct int not null,
    descriptionProduct varchar(50) not null,
    imageProduct text
)