import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { InMemoryCache } from '@apollo/client';
import {provideApollo} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { API_BASE_URL } from './api-config';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { SNIPPET_DATA_SOURCE } from './snippets/contracts/snippet-data-source';
import { SnippetApi } from './snippets/services/snippet-api';
import { SnippetGraphqlApi } from './snippets/services/snippet-graphql-api';

const SnippetDataSource = 
  environment.snippetTransport === 'graphql'
    ? SnippetGraphqlApi
    : SnippetApi

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({uri: `${API_BASE_URL}/graphql`}),
        cache: new InMemoryCache()
      }
    }),
    { provide: SNIPPET_DATA_SOURCE, useExisting: SnippetDataSource },
  ]
};
