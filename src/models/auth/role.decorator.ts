import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ['Admin' | 'Trainer' | 'Student']) =>
  SetMetadata('roles', roles);
