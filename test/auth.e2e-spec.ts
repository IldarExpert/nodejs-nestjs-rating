import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const loginDto = {
  login: 'test@test.ru',
  password: '123',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - Success', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - Password Fail', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '1' })
      .expect(401, {
        statusCode: 401,
        message: 'Некорректный пароль',
        error: 'Unauthorized',
      })
      .then(() => {
        done();
      });
  });

  it('/auth/login (POST) - Login Fail', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'email_not_found@test.ru' })
      .expect(401, {
        statusCode: 401,
        message: 'Пользователя с таким email не существует',
        error: 'Unauthorized',
      })
      .then(() => {
        done();
      });
  });

  afterAll(() => {
    disconnect();
  });
});
