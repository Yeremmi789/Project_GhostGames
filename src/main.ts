import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// añadido - nuevo
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import {provideProtractorTestingSupport} from '@angular/platform-browser';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';

import{LIGHTBOX_CONFIG, LightboxConfig} from 'ng-gallery/lightbox';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      provideHttpClient(), // Agrega esto para proporcionar HttpClient --- se agregó ya cuando se implementó la api
      {
        provide: GALLERY_CONFIG,
        useValue: {
          autoHeight: true,
          imageSize: 'cover',
          // imageSize: 'contain',
          autoPlay: true,
        } as GalleryConfig
      },
      {
        provide: LIGHTBOX_CONFIG,
        useValue: {
          keyboardShortcuts: false,
          exitAnimationTime: 1000,
        } as LightboxConfig
      }

    ]
  }
).catch(err => console.error(err));
