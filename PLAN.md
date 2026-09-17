# Angular Snippet Library

## What This Project Is

This project is an Angular rebuild of the existing vanilla TypeScript Snippet Library.

The reference project is:

```text
D:\projects\snippet-library
```

The Angular version is:

```text
D:\projects\snippet-library-angular
```

Both applications should provide the same user experience:

- Display example code snippets
- Add a snippet with title, language, code, and tags
- Delete a snippet after confirmation
- Search snippets by title, language, code, or tags
- Show an empty state when no snippets match
- Save snippets in browser `localStorage`
- Show success and error feedback

The purpose is to learn how Angular organizes and connects features that were previously built manually with vanilla TypeScript.

## Learning Goals

By the end of this project, understand:

- Angular workspaces and the CLI
- Standalone components
- Component templates
- Interpolation and property binding
- Event binding
- Component inputs and outputs
- Angular services and dependency injection
- Angular forms and validation
- Template loops and conditional rendering
- Shared application state
- Browser storage through a service
- Angular unit tests

## Architecture Target

```text
AppComponent
  displays the application shell

SnippetFormComponent
  owns the add-snippet form

SnippetListComponent
  displays the current filtered snippets

SnippetCardComponent
  displays one snippet and emits delete requests

SnippetStore service
  owns snippet state and application operations

SnippetStorage service
  reads and writes localStorage

DeleteDialogComponent
  confirms deletion

ToastComponent
  displays temporary feedback
```

Keep the architecture proportional to the project. Do not create a component or service unless it has one clear responsibility.

## Working Rules

- Work on one checkpoint at a time.
- Do not start the next checkpoint until the current one is verified.
- Use the Angular CLI to generate Angular files.
- Keep standalone components and strict TypeScript enabled.
- Do not copy vanilla DOM querying or manual `innerHTML` rendering into Angular.
- Do not add routing because this is a single-page application.
- Run the required build after each structural checkpoint.
- Commit only after a checkpoint works.

## Checkpoint 1: Prerequisites and Angular Workspace

### 1A. Verify Node and npm

Run:

```bash
node --version
npm --version
```

Angular's current installation guide requires a supported Node.js version and npm. Do not continue if either command fails.

### 1B. Install Angular CLI

Run:

```bash
npm install -g @angular/cli
```

### 1C. Verify Angular CLI

Run:

```bash
ng version
```

The output must show Angular CLI information.

### 1D. Create the Angular workspace

The project folder already exists and contains `PLAN.md`. From `D:\projects\snippet-library-angular`, run:

```bash
ng new snippet-library-angular --directory . --force
```

Accept these choices:

- Routing: No
- Stylesheet: CSS
- SSR/SSG: No
- Standalone components: Yes
- Strict mode: Yes

The `--directory .` option keeps the workspace in the current folder. The `--force` option allows Angular to generate files beside the existing plan.

### 1E. Run the application

Run:

```bash
ng serve --open
```

### Verification

- `node --version` and `npm --version` work.
- `ng version` displays Angular CLI information.
- The Angular welcome app loads at `http://localhost:4200`.
- The terminal reports no compilation errors.
- `PLAN.md` remains in the project folder.

### Completion

Mark Checkpoint 1 complete only after the CLI is installed, the workspace is created, and the generated application runs successfully.
## Checkpoint 2: Understand and Clean the Starter App

### Actions

1. Identify the Angular bootstrap file.
2. Identify the root component TypeScript file.
3. Identify the root component template.
4. Identify the root component stylesheet.
5. Remove the generated welcome-page markup.
6. Render a simple `Snippet Library` heading.

### Verification

- The browser displays only the new heading.
- The app still builds successfully.
- No generated welcome-page content remains.

## Checkpoint 3: Build the Application Shell

### Actions

1. Add the page header.
2. Add the add-snippet section.
3. Add the snippets section.
4. Add the form fields:
   - title
   - language
   - code
   - tags
5. Add the search input.
6. Move only the required styles from the vanilla project.

### Verification

- The Angular app visually matches the basic vanilla layout.
- The form and search input are visible.
- No snippet behavior is required yet.

## Checkpoint 4: Add the TypeScript Domain Model

### Actions

1. Create a model file for `Language` and `Snippet`.
2. Copy the language list concept from the vanilla project.
3. Add typed example snippets.
4. Display one example snippet in the root component.

### Verification

- The project compiles with strict TypeScript enabled.
- The example snippet is rendered from typed data.
- No `any` type is needed.

## Checkpoint 5: Create `SnippetCardComponent`

### Actions

1. Generate the component with Angular CLI.
2. Move one-snippet markup into its template.
3. Add a typed input for a `Snippet`.
4. Render title, language, code, and tags with Angular template syntax.

### Verification

- A snippet card appears.
- The card receives its data through an Angular input.
- No manual `innerHTML` is used.

## Checkpoint 6: Create `SnippetListComponent`

### Actions

1. Generate the list component.
2. Add a typed snippets input.
3. Render multiple `SnippetCardComponent` instances.
4. Add the empty-state template.

### Verification

- All example snippets appear.
- The list is rendered with Angular’s template loop syntax.
- An empty-state message appears when the list is empty.

## Checkpoint 7: Create `SnippetFormComponent`

### Actions

1. Generate the form component.
2. Move the form markup into its template.
3. Add the language options from the typed language list.
4. Add Angular form handling.
5. Add required validation for title and code.
6. Emit a valid new `Snippet` to the parent component.

### Verification

- Empty title/code submissions are rejected.
- A valid form submission produces a typed `Snippet`.
- The form does not directly mutate the list.

## Checkpoint 8: Create `SnippetStore`

### Actions

1. Generate an Angular service.
2. Move the snippets array into the service.
3. Add methods to:
   - get all snippets
   - add a snippet
   - remove a snippet
4. Inject the service into the appropriate component.
5. Connect the form output to `store.add()`.
6. Connect delete events to `store.remove()`.

### Verification

- Adding a snippet updates the list.
- Deleting a snippet updates the list.
- Components do not own duplicate copies of the snippet state.

## Checkpoint 9: Add Search

### Actions

1. Bind the search input to a component value.
2. Filter by title, language, code, and tags.
3. Pass the filtered snippets to the list component.
4. Display the empty state when there are no matches.

### Verification

- Search works while typing.
- Clearing search restores all snippets.
- Searching by a tag and language works.

## Checkpoint 10: Add `SnippetStorage`

### Actions

1. Generate a storage service.
2. Add typed `load()` and `save()` methods.
3. Load saved snippets when the store is created.
4. Use example snippets only when no saved data exists.
5. Save after adding and deleting.

### Verification

- Added snippets survive refresh.
- Deleted snippets remain deleted after refresh.
- A saved empty list does not restore example snippets.

## Checkpoint 11: Add Delete Confirmation

### Actions

1. Create a reusable `DeleteDialogComponent`.
2. Pass the selected snippet into the dialog.
3. Emit confirm and cancel events.
4. Remove the snippet only after confirmation.
5. Ensure Escape and Cancel do not delete anything.

### Verification

- Clicking Delete opens the dialog.
- Cancel leaves the snippet unchanged.
- Confirm removes the correct snippet.

## Checkpoint 12: Add Toast Feedback

### Actions

1. Create a reusable `ToastComponent`.
2. Add success and error message types.
3. Show an error for invalid form submission.
4. Show success after adding a snippet.
5. Show success after deleting a snippet.
6. Hide the toast automatically.

### Verification

- Feedback appears in the correct state.
- A new toast replaces an older visible toast.
- Toasts do not block normal interaction.

## Checkpoint 13: Tests and Cleanup

### Actions

1. Test the store’s add operation.
2. Test the store’s remove operation.
3. Test storage load/save behavior.
4. Test form validation.
5. Remove unused generated files.
6. Run the production build.

### Verification

- Tests pass.
- The production build passes.
- No unused starter code remains.

## Checkpoint 14: Documentation and GitHub

### Actions

1. Add a README describing this Angular version.
2. Explain how it differs from the vanilla project.
3. Add setup and development commands.
4. Initialize Git if needed.
5. Create a separate GitHub repository.
6. Commit the finished Angular project.
7. Push the project to GitHub.

### Verification

- A new user can clone and run the project from the README.
- The repository contains no `node_modules` or build output.
- The Git working tree is clean after pushing.

## Current Status

- [x] Plan created
- [x] Checkpoint 1: CLI installed, workspace created, and app verified`r`n  - [x] 1A: Node and npm verified`r`n  - [x] 1B: Angular CLI installed`r`n  - [x] 1C: Angular CLI version verified
- [ ] Checkpoint 2: Starter app cleaned
- [ ] Checkpoint 3: Application shell built
- [ ] Checkpoint 4: Domain model added
- [ ] Checkpoint 5: Snippet card component created
- [ ] Checkpoint 6: Snippet list component created
- [ ] Checkpoint 7: Form component created
- [ ] Checkpoint 8: Store service created
- [ ] Checkpoint 9: Search added
- [ ] Checkpoint 10: Storage service added
- [ ] Checkpoint 11: Delete confirmation added
- [ ] Checkpoint 12: Toast feedback added
- [ ] Checkpoint 13: Tests and cleanup completed
- [ ] Checkpoint 14: Documentation and GitHub completed