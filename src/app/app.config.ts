import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// routes para poder crear un archivo para almacenar las rutas

// provideHttpClient para poder recibir y mandar informacion a la API
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(),


    // importProvidersFrom(
    //   HttpClientModule
    // )
  ]
};
