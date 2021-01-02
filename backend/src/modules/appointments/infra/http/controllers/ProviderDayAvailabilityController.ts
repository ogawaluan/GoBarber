import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;
  
    const listDayAvailability = container.resolve(ListDayAvailabilityService);
  
    const availability = await listDayAvailability.execute({
      provider_id,
      month,
      year,
      day,
    });
    
    return response.json(availability);
  }
}