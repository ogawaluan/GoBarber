import { container } from 'tsyringe';

import IHashedProvider from './HashProvider/models/IHashProvider';
import IBCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashedProvider>('HashProvider', IBCryptHashProvider);