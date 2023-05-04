CREATE DATABASE kopy;

USE kopy;

CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre_cliente VARCHAR(50) NOT NULL,
    apellido_cliente VARCHAR(30) NOT NULL,
    telefono_cliente INT NOT NULL,
    direccion_cliente VARCHAR(30) NOT NULL,
    email_cliente VARCHAR(50) NOT NULL UNIQUE,
    password_cliente VARCHAR(30) NOT NULL,
    token_cliente VARCHAR(50)
);

CREATE TABLE producto (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(50) NOT NULL,
    descripcion_producto VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria
    SET
(
            'cafe',
            'panaderia',
            'bebidas',
            'chocolates',
            'desayunos'
        ) NOT NULL,
        id_imagen TEXT NOT NULL,
        url_imagen TEXT NOT NULL
);

create table administrador(
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nombre_admin varchar(50) not null,
    apellido_admin varchar(50) not null,
    email_admin varchar(100) not null,
    contraseña_admin varchar(50),
    token_admin varchar(50)
);

create table categoria(
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria varchar(50) NOT NULL
);


CREATE TABLE domiciliario(
    id_dom int AUTO_INCREMENT PRIMARY KEY,
    nombre_dom varchar(30) not null,
    apellido_dom varchar(30) not null,
    telefono_dom bigint not null,
    correo_dom varchar(100) not null,
    contraseña_dom varchar(30) not null,
    token_dom varchar(50)
);

CREATE TABLE compra (
    id_compra INT PRIMARY KEY AUTO_INCREMENT,
    id_dom int NOT NULL,
    fecha_compra DATE,
    id_cliente INT NOT NULL,
    id_administrador INT NOT NULL,
    id_producto INT NOT NULL,
    id_categoria INT NOT NULL,
    precio_compra DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT fk_id_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    CONSTRAINT fk_id_administrador FOREIGN KEY (id_administrador) REFERENCES administrador(id_admin),
    CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    CONSTRAINT fk_id_domiciliario FOREIGN KEY (id_dom) REFERENCES domiciliario(id_dom)
);



create table factura (
    id_cliente int not null,
    id_compra int not null,
    id_producto int not null,
    precio decimal(10, 2) not null,
    fecha date,
    cantidad int not null,
    direccion varchar(50),
    CONSTRAINT fk_id_compra FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);