CREATE DATABASE kopy;
-- //https://youtu.be/nrG0tKSYMHc   link de despliegue
USE kopy;

CREATE TABLE cliente (
    id_cliente BIGINT PRIMARY KEY ,
    nombre_cliente VARCHAR(50) NOT NULL,
  
    telefono_cliente BIGINT NOT NULL,
    direccion_cliente VARCHAR(30) NOT NULL,
    email_cliente VARCHAR(50) NOT NULL UNIQUE,
    password_cliente VARCHAR(30) NOT NULL,
    token_cliente VARCHAR(50)
);

CREATE TABLE producto (
    id_producto BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(50) NOT NULL,
    descripcion_producto VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad_producto INT,
    categoria
    SET
(
            'cafe',
            'panaderia',
            'bebidas',
            'chocolates',
            'desayunos'
        ) NOT NULL,
        id_imagen TEXT NOT NULL 
);
      

create table administrador(
    id_admin BIGINT PRIMARY KEY ,
    nombre_admin varchar(50) not null,

    email_admin varchar(100) not null UNIQUE,
    contraseña_admin varchar(50),
    token_admin varchar(50)
);

create table categoria(
    id_categoria BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria varchar(50) NOT NULL
);


CREATE TABLE domiciliario(
    id_dom BIGINT  PRIMARY KEY,
    nombre_dom varchar(30) not null,
   
    telefono_dom bigint not null,
    correo_dom varchar(100) not null,
    contraseña_dom varchar(30) not null,
    token_dom varchar(50)
);

CREATE TABLE compra (
    id_compra BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_dom BIGINT NOT NULL,
    fecha_compra DATE,
    id_cliente BIGINT NOT NULL,
    id_administrador BIGINT NOT NULL,
    cantidad_compra BIGINT NOT NULL,
    id_producto BIGINT NOT NULL,
    id_categoria BIGINT NOT NULL,
    precio_compra DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT fk_id_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    CONSTRAINT fk_id_administrador FOREIGN KEY (id_administrador) REFERENCES administrador(id_admin),
    CONSTRAINT fk_id_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    CONSTRAINT fk_id_domiciliario FOREIGN KEY (id_dom) REFERENCES domiciliario(id_dom)  
);



create table factura (
    id_cliente BIGINT not null,
    id_compra BIGINT not null,
    id_producto BIGINT not null,
    precio decimal(10, 2) not null,
    fecha date,
    cantidad BIGINT not null,
    direccion varchar(50),
    CONSTRAINT fk_id_compra FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);