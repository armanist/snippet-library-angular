# Snippet Library - Angular

An Angular frontend for saving, finding, editing, and deleting small code snippets. It talks to the Snippet Library NestJS API through either REST or GraphQL, selected with one setting.

## Features

- Create, edit, and delete snippets with a title, language, code, and comma-separated tags.
- Search snippets by title, language, code, and tags. Search is debounced, and a newer request cancels an older one still in flight.
- Browse paginated results, ordered newest first.
- Confirm deletions in a dialog.
- See success and error notifications.
- Switch between the REST and GraphQL transports without changing any component or service code.

## Tech stack

- Angular (standalone components, signals, dependency injection) and TypeScript
- RxJS for the search and reload pipeline
- Tailwind CSS
- Apollo Angular for GraphQL, `HttpClient` for REST
- GraphQL Code Generator for operation types

## Requirements

- Node.js and npm.
- The Snippet Library API (`snippet-library-nest-api`) running at `http://localhost:3000`. See the API's README for setup. It allows requests only from `http://localhost:4200`, which is the Angular dev server address.

## Quick start

1. Start the API (from the API project):

   ```sh
   npm run start:dev
   ```

2. Start this app:

   ```sh
   npm install
   npm start
   ```

3. Open `http://localhost:4200`.

If port 4200 is already used by another program, `ng serve` offers a different port. Do not accept it: the API would reject the requests with a CORS error. Free port 4200 and start the app again.

## Switching between REST and GraphQL

The app can talk to the API over REST or over GraphQL. The choice is one value in an environment file:

| File | Used by |
| --- | --- |
| `src/environments/environment.development.ts` | `npm start` (the development build) |
| `src/environments/environment.ts` | `npm run build` (the production build) |

Angular swaps the development file in for `environment.ts` when you run `npm start` (see `fileReplacements` in `angular.json`).

To use GraphQL:

```ts
snippetTransport: 'graphql'
```

To use REST:

```ts
snippetTransport: 'rest'
```

Save the file and `ng serve` rebuilds on its own. If the build has an error, `ng serve` keeps serving the last good build, so check its terminal for errors.

To check which transport is active, open the browser's DevTools, go to the Network tab, and reload the page:

- GraphQL: requests go to `http://localhost:3000/graphql` (`POST`).
- REST: requests go to `http://localhost:3000/snippets` (`GET`, `POST`, `PATCH`, `DELETE`).

The screens behave the same either way. Only the requests differ.

Other configuration: the API address is set in `src/app/api-config.ts`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the dev server |
| `npm run build` | Build for production (this also type-checks the code and templates) |
| `npm run watch` | Rebuild on every change, in development mode |
| `npm run codegen` | Regenerate GraphQL types |

## How it is organized

```text
src/app/
  app.ts, app.html               Page layout. Injects the services and connects them
  app.config.ts                  Providers, and the choice of REST or GraphQL
  api-config.ts                  API base URL
  shared/
    toast/                       Toast component, ToastService
    confirm-dialog/              ConfirmDialog component, ConfirmDialogService
    pagination/                  Pagination component
  snippets/
    contracts/                   Types, and the SnippetDataSource interface and token
    services/                    SnippetRestApi, SnippetGraphqlApi, SnippetChanges
    graphql/                     Query and mutation documents, generated types
    snippet-list/                SnippetList component (search, cards, pagination),
                                 SnippetListService
    snippet-card/                SnippetCard component
    snippet-form/                SnippetForm component, SnippetFormService (create and edit)
    snippet-delete/              SnippetDelete
```

## How it works

### One contract, two transports

Every service talks to a `SnippetDataSource` (`getAll`, `create`, `update`, `delete`) through the injection token `SNIPPET_DATA_SOURCE`. Two classes implement it: `SnippetRestApi` and `SnippetGraphqlApi`. `src/app/app.config.ts` is the single place that reads `snippetTransport` and registers one of them under the token. Nothing else knows which transport is active.

### Each responsibility has one home

| Unit | Responsibility |
| --- | --- |
| `SnippetListService` | Loads snippets for the current search term and page, with debounce and cancellation of stale requests. Moves to the last page if the current one no longer exists. |
| `SnippetFormService` | Which snippet is being edited, and saving (create or update). |
| `SnippetDelete` | Deleting the snippet chosen in the confirmation dialog. |
| `ConfirmDialogService` | Whether the dialog is open and which snippet it is about. |
| `ToastService` | The notification message and type, shared across the app. |

The services keep their state in private signals and expose read-only views (`asReadonly()`), so only their own methods change it.

`App` has no logic of its own. Its template connects the units, for example `(editRequested)="snippetForm.startEdit($event)"` and `(confirmed)="snippetDelete.confirm()"`.

### Keeping the list up to date

After a snippet is created, updated, or deleted, the form and delete services call `SnippetChanges.notify()`. `SnippetListService` listens to that event and reloads the current page. No service calls another feature service directly, so the form and delete logic never depend on the list.

## GraphQL types

The types in `src/app/snippets/graphql/generated.ts` are generated from the API schema (`../snippet-library-nest-api/src/schema.gql`) and the operation documents in `src/app/snippets/graphql/`. The API project must be next to this one. Then run:

```sh
npm run codegen
```

Do not edit the generated file by hand. Run the command again whenever the schema or an operation document changes.

## Notes

- The page size is 2 snippets, set in `snippet-list-service.ts`.
- The REST and GraphQL transports return the same data, so switching between them should not change what you see.
- There are no unit tests at the moment.
