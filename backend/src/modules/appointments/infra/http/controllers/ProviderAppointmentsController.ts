import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;
  
    const listProvidersAppointments = container.resolve(ListProvidersAppointmentsService);
  
    const appointments = await listProvidersAppointments.execute({ 
      provider_id,
      day,
      month,
      year,
    });
    
    return response.json(appointments);
  }
}