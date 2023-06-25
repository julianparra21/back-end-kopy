CREATE DATABASE kopy;

USE kopy;

CREATE TABLE cliente (
    id_cliente BIGINT PRIMARY KEY ,
    nombre_cliente VARCHAR(50) NOT NULL,
    telefono_cliente BIGINT NOT NULL,
    direccion_cliente VARCHAR(30) NOT NULL,
    email_cliente VARCHAR(50) NOT NULL UNIQUE,
    password_cliente VARCHAR(30) NOT NULL,
    token_cliente VARCHAR(50),
    image text NOT NULL,
    habilitado INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE producto (
    id_producto BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(50) NOT NULL,
    descripcion_producto VARCHAR(50) NOT NULL,
    precio BIGINT NOT NULL,
    cantidad_producto INT,
    categoria ENUM('cafe', 'panaderia', 'bebidas', 'chocolates', 'desayunos') NOT NULL,
    id_imagen TEXT NOT NULL
);

INSERT INTO producto (id_producto, nombre_producto, descripcion_producto, precio, cantidad_producto, categoria, id_imagen) VALUES
(1, 'Cafe oscuro', 'Café oscuro intenso y aromático', 2000, 1, 'cafe', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721659/kopy/cafe-oscuro_zlyaem.jpg'),
(2, 'Cafe con leche', 'Café suave con leche', 2000, 1, 'cafe', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721658/kopy/cafe-leche_wv0caq.jpg'),
(3, 'Cafe fusion', 'Café con sabores exóticos fusionados', 3200, 1, 'cafe', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721658/kopy/cafe-fusion_ekejg7.jpg'),
(4, 'Cafe helado', 'Café refrescante y cremoso', 4500, 1, 'cafe', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721658/kopy/cafe-helado_wgyu8h.webp'),
(5, 'Cafe mango', 'Café con sabor a mango tropical', 4000, 1, 'cafe', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721659/kopy/cafe-mango_nrjxp6.jpg'),
(6, 'Capuchino', 'Café con leche y espuma', 3000, 1, 'cafe', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721660/kopy/capuchino_gtvlmz.jpg'),
(7, 'Buñuelo', 'Delicioso buñuelo colombiano', 2000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721657/kopy/bu%C3%B1uelo_cscvqj.jpg'),
(8, 'Pan rosco', 'Pan dulce en forma de rosquilla', 1500, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721664/kopy/croasan_p1jcki.jpg'),
(9, 'Galletas de fresa', 'Galletas rellenas de fresa', 1000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721680/kopy/gaelletas-rellenas_gh9fac.webp'),
(10, 'Galletas de leche', 'Galletas con sabor a leche', 1000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721662/kopy/gaelltas-azules_yeuzcr.jpg'),
(11, 'Galletas chips chocolate', 'Galletas con chispas de chocolate', 1000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721662/kopy/galletas-chispas_lpt2we.jpg'),
(12, 'Galletas de avena', 'Galletas saludables de avena', 1000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721662/kopy/galletas_fv5kni.jpg'),
(13, 'Pan de leche', 'Pan suave y esponjoso', 2000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721657/kopy/pan-casero_xrsdfm.jpg'),
(14, 'Pan con queso', 'Pan relleno de queso derretido', 2500, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721656/kopy/pan-de-queso_rzyjb5.jpg'),
(15, 'Pan galleta', 'Pan con textura crujiente', 3000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721657/kopy/pan-galleta_ododjk.jpg'),
(16, 'Pan integral', 'Pan saludable de harina integral', 3000, 1, 'panaderia', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721656/kopy/pan_tbwrsy.jpg'),
(17, 'Milo frio', 'Bebida refrescante de Milo', 1500, 1, 'bebidas', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721655/kopy/milo_voamzu.webp'),
(18, 'Jugo de naranja', 'Jugo natural de naranja', 1000, 1, 'bebidas', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721663/kopy/jugo-naranja_v5qmln.webp'),
(19, 'Jugo de mango', 'Jugo natural de mango', 1000, 1, 'bebidas', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721662/kopy/jugo-mango_rskvos.jpg'),
(20, 'Jugo de fresa', 'Jugo natural de fresa', 1000, 1, 'bebidas', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721656/kopy/JUGOS_NATURALES_cmkkn9.jpg'),
(21, 'Chocolate', 'Chocolate negro puro', 1200, 1, 'chocolates', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721660/kopy/chocolate-sin_xe70pb.jpg'),
(22, 'Chocolate con leche', 'Chocolate con leche cremoso', 1500, 1, 'chocolates', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721660/kopy/chocolate_2_thkrdb.jpg'),
(23, 'Cafe con leche', 'Bebida de cafe con leche caliente', 1500, 1, 'chocolates', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721660/kopy/chocolate_mi0wv7.jpg'),
(24, 'Calentado', 'Plato tipico de arroz y frijoles', 10000, 1, 'desayunos', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721660/kopy/cale_fyjexs.webp'),
(25, 'Calentado con huevo', 'Calentado con huevo frito', 12000, 1, 'desayunos', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721660/kopy/calentado_l9ohnj.jpg'),
(26, 'Huevo con pan', 'Huevo con pan tostado', 9000, 1, 'desayunos', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721661/kopy/desayunos_caqpds.jpg'),
(27, 'Huevo frito', 'Huevo frito', 4000, 1, 'desayunos', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721662/kopy/huevo-frito_ab4gno.jpg'),
(28, 'Huevo revuelto', 'Huevo revuelto con condimentos', 5000, 1, 'desayunos', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721662/kopy/huevos-revueltos_rc9mhv.webp'),
(29, 'Huevo perico', 'Huevo revuelto con tomate y cebolla', 7000, 1, 'desayunos', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678721656/kopy/perico_fyfttb.jpg'),
(30, 'Huevo con salchicha', 'Huevo con salchicha y pan', 9000, 1, 'desayunos', 'https://res.cloudinary.com/dyhfwq81d/image/upload/v1678829157/kopy/receta-desayuno-con-salchicha_goxw0r.jpg');

      

create table administrador(
    id_admin BIGINT PRIMARY KEY ,
    nombre_admin varchar(50) not null,
    email_admin varchar(100) not null UNIQUE,
    contraseña_admin varchar(50),
    token_admin varchar(50),
    pin_admin text
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