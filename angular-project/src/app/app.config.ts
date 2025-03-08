// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { TokenInterceptor } from './component/interceptor/token.interceptor';


// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(),
//     provideHttpClient(withInterceptors([TokenInterceptor]))
//   ]
// };

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TokenInterceptor } from './component/interceptor/token.interceptor';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  provideHttpClient(), provideHttpClient(withInterceptors([TokenInterceptor])), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};