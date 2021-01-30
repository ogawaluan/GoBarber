import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;
  
    const listProvidersAppointments = container.resolve(ListProvidersAppointmentsService);
  
    const appointments = await listProvidersAppointments.execute({ 
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });
    
    return response.json(classToClass(appointments));
  }
}