import 'reflect-metadata';

import ShowProfileService from '../services/ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('luanOgawa');
    expect(profile.email).toBe('ogawa.luanzo@gmail.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing id',
    })).rejects.toBeInstanceOf(AppError);
  });
});