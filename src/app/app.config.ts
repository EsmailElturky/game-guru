import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { GameGuruPreset } from './core/theme/game-guru-preset';
import { provideUiKit, UIKIT_TRANSLATE_RESOLVER } from '@EsmailElturky/ui-kit';
import { TranslateService } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useClass: TranslateHttpLoader,
        },
      }),
    ),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
    provideAnimationsAsync(),
    provideUiKit({
      config: {
        inputText: {
          maxLength: 250,
        },
        textArea: {
          maxLength: 1000,
          rows: 3,
        },
      },
      theme: {
        preset: GameGuruPreset,
        options: {
          prefix: 'guru',
          darkModeSelector: '.guru-dark',
        },
      },
    }),
    {
      provide: UIKIT_TRANSLATE_RESOLVER,
      useFactory: (translate: TranslateService) => {
        return (key: string, value?: any) => {
          return translate.instant(key, value);
        };
      },
      deps: [TranslateService],
    },
    MessageService,
  ],
};
