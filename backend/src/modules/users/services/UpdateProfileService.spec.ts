import 'reflect-metadata';

import UpdateProfileService from '../services/UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });
  
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Luanzo Tre',
      email: 'luanzotre@luanzo.com',
    });

    expect(updatedUser.name).toBe('Luanzo Tre');
    expect(updatedUser.email).toBe('luanzotre@luanzo.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing id',
      name: 'test',
      email: 'test@gmail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Luanzo Tre',
      email: 'luanzotre@luanzo.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Luanzo Tre',
      email: 'luanzotre@luanzo.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Luanzo Tre',
      email: 'luanzotre@luanzo.com',
      old_password: 'wrong old password',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});