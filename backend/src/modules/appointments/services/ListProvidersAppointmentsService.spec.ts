import 'reflect-metadata';

import ListProvidersAppointmentsService from '../services/ListProvidersAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let listProvidersAppointments: ListProvidersAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersAppointments = new ListProvidersAppointmentsService(fakeAppointmentsRepository);
  });
  
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 =await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProvidersAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([
      appointment1,
      appointment2,
    ]);
  });
});