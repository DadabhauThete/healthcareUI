import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './authconfig.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
