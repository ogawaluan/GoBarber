import 'reflect-metadata';

import SendForgotEmailPasswordService from '../services/SendForgotEmailPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotEmailPassword: SendForgotEmailPasswordService;

describe('SendForgotEmailPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotEmailPassword = new SendForgotEmailPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    
    await fakeUsersRepository.create({
      name: "luanzo",
      email: "ogawa.luan2@gmail.com",
      password: "12345",
    });

    await sendForgotEmailPassword.execute({
      email: 'ogawa.luan2@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotEmailPassword.execute({
      email: "ogawa.luan2@gmail.com",
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: "luanzo",
      email: "ogawa.luan2@gmail.com",
      password: "12345",
    });

    await sendForgotEmailPassword.execute({
      email: 'ogawa.luan2@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});