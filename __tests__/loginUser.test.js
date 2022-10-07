const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { loginUser } = require('../controllers/user');
const { User } = require('../models');

describe('Тести для контролера входу (логін)', () => {
  const mockReq = {
    body: {
      email: 'test@mail.com',
      password: '123456',
    },
  };

  const mockRes = {
    res: { status: 200 },
    json: (obj) =>
      jest.fn().mockImplementation(Object.assign(mockRes.res, obj)),
  };

  const hashedPassword = bcrypt.hashSync('123456', 10);
  const mockUser = {
    _id: '1',
    email: 'test@mail.com',
    password: hashedPassword,
    subscription: 'pro',
  };
  const token = 'etalon';

  jest.spyOn(User, 'findOne').mockReturnValue(mockUser);
  jest.spyOn(User, 'findByIdAndUpdate').mockReturnValue(null);
  jest.spyOn(jwt, 'sign').mockReturnValue(token);

  beforeAll(async () => {
    await loginUser(mockReq, mockRes);
  });

  it('Відповідь повина мати статус-код 200', () => {
    expect(mockRes.res.status).toEqual(200);
  });

  it('У відповіді повинен повертатися токен', () => {
    expect(mockRes.res.token).toEqual(token);
  });

  describe("Перевірка полів об'єкта user у відповіді", () => {
    it('Поле email з типом даних String', () => {
      expect(typeof mockRes.res.user.email).toEqual('string');
    });

    it('Поле subscription з типом даних String', () => {
      expect(typeof mockRes.res.user.subscription).toEqual('string');
    });
  });
});
