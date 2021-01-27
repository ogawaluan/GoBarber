import 'reflect-metadata';

import ListProvidersService from '../services/ListProvidersService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);
  });
  
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'luanOgawa',
      email: 'ogawa.luanzo@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'luanOgawa2',
      email: 'ogawa.luanzo2@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'luanOgawa3',
      email: 'ogawa.luanzo3@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([
      user1,
      user2,
    ]);
  });
});