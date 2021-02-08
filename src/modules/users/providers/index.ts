import { container } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider'/

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
