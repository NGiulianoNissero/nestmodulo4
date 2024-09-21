import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/modules/users/dto/createUser.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const signUpResponse = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'giuliano',
        email: 'example@gmail.com',
        password: 'Admin123!',
        passwordConfirmation: 'Admin123!',
        address: '123 calle queso',
        phone: 52341253123,
        isAdmin: true,
      });

    userId = signUpResponse.body.id;

    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'example@gmail.com',
        password: 'Admin123!',
      });

    token = signInResponse.body.token;
  });

  it('GET /users - debería retornar un arreglo de usuarios con el rol Admin', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('GET /users/:uuid - debería retornar la información de un usuario específico', async () => {
    const req = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('PUT /users/:uuid - debería actualizar la información de un usuario', async () => {
    const updateDto = { name: 'pedro picapiedra' };
    const req = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateDto);

    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty('name', 'pedro picapiedra');
  });

  it('DELETE /users/:uuid - debería eliminar un usuario específico', async () => {
    const req = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('POST /auth/signup - debería registrar un usuario correctamente', async () => {
    const req = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'giuliano',
        email: 'example2@gmail.com',
        password: 'Admin123!',
        passwordConfirmation: 'Admin123!',
        address: '123 calle queso',
        phone: 52341253123,
        isAdmin: true,
      } as CreateUserDto);

    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('POST /auth/signin - debería iniciar sesión y devolver un token', async () => {
    await request(app.getHttpServer()).post('/auth/signup').send({
      name: 'giuliano',
      email: 'example3@gmail.com',
      password: 'Admin123!',
      passwordConfirmation: 'Admin123!',
      address: '123 calle queso',
      phone: 52341253123,
      isAdmin: true,
    });

    const req = await request(app.getHttpServer()).post('/auth/signin').send({
      email: 'example3@gmail.com',
      password: 'Admin123!',
    });

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
    expect(req.body).toHaveProperty('token');
    expect(typeof req.body.token).toBe('string');
  });
});
