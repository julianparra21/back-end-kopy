import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../src/index.js';
import { assert, expect } from 'chai';

// TEST CREAR UN USUARIO
// describe('Registro de usuarios', () => {
//   it('Debería registrar un usuario correctamente', async() => {
//       const resultado = registrarUsuario(); 
//       const valorEsperado = 'usuarioRegistrado';

//   const userData = {
//           id: 2,
//           nombre: 'Usuario de prueba',
//           telefono: '123456789',
//           direccion: 'Calle 123',
//           email: 'juan@gmail.com',
//           password: '1234567',
//    }
//         const response = await request(app)
//         .post('/user/registro') 
//         .send(userData);
//         assert.equal(resultado, valorEsperado)
//         assert.equal(response.status,200);
        
//         console.log('Usuario registrado correctamente. Estado de respuesta: 200');
//         console.log("Data thw user register",userData); 
//       })
//       function registrarUsuario() {
//     const userData = {
//         id: 1,
//         nombre: 'Usuario de prueba',
//         telefono: '123456789',
//         direccion: 'Calle 123',
//         email: 'test@example.com',
//         password: 'password123',
//       }
//       return 'usuarioRegistrado'
//     }
//   },
  

// );
  //TEST TRAER LISTA DE USUARIOS REGISTRADOS
  // describe('GET /registro', () => {
  //   it('should respond with status 200 and the registros', async () => {
  //     const response = await request(app).get('/user/registro');
  //     expect(response.status).to.equal(200);
  //   expect(response.body.registros).to.exist;
  //   console.log("Data the user register", response.body.registros);
  //   })})
     
//AUTENTICACION DE UN USUARIO CON TOKEN
//   it('should log in a user and return an authentication token', async () => {
//     const user = {
//       email: 'johndoe@example.com',
//       password: 'password123'
//     };

//     const response = await request(app)
//       .post('/user/login')
//       .send(user);

//     expect(response.status).toBe(200);
//     expect(response.body.auth).toBe(true);
//     expect(response.body.token).toBeDefined();

//   })

//   //RECUPERAR CONTRASEÑA DE USUARIO
//   it('should send a password recovery email', async () => {
//     const email = 'johndoe@example.com';

//     const response = await request(app)
//       .post('/recuperar')
//       .send({ email });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Correo enviado correctamente');
// });

//   //VERIFICACION DE TOKEN Y  RECUPERAR CONTRASEÑA 
//   it('should verify a password recovery token and update the password', async () => {
//     const token = 'recoveryToken123';
//     const password = 'newpassword123';

//     const response = await request(app)
//       .post('/verificar')
//       .send({ token, password });

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Contraseña actualizada correctamente');

//   });

//   //ACTUALIZAR USUARIO
//   it('should update a user', async () => {
//     const user = {
//       id: 1,
//       nombre: 'John Doe',
//       apellido: 'Doe',
//       telefono: '1234567890',
//       direccion: '123 Main St',
//       email: 'johndoe@example.com'
//     };

//     const response = await request(app)
//       .post('/updateUsuario')
//       .send(user);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(user);

//   });