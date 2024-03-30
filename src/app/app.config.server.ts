import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LoginGuardian } from './pages/login/login-guardian';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), LoginGuardian
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
