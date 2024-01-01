# NgxQuixxElements

This project consist in a set of Angular UI components created for the quiz application [HistoryQuixx](www.historyquixx.com). Feel free to copy, edit and use the code for your own purposes.

License: MIT

## Features

The library provides some useful Angular components for building quiz applications:

- Dates: displays a list of events, the player must fill the input with the year they took place.

- FillOut: shows a text with some blank spaces, the player must select the missing word or sentences among those provided.

- Input: classic UI component with customized behavior for search, number, text and password types.

- MenuButton: clicking the button pops a selection menu.

- MultipleChoice: a classic radio button for quizzes, with question and possible answers. Optionally displays an image.

- Progress: a pipe appearance progress bar.

- RadioSlider: a radio button for quick choices.

- Select: dropdown component with the library style.

- SubmitButton: submit button with loading and completed states.

Their colors are highly customizable changing the css variables.

Besides, the library provides:

- css classes for styling buttons and cards according to the design system.

- utility classes and functions, like a SubBulk for managing subscriptions and an RxJS custom pipe to extend distinctUntilChanged to arrays.

## Installation

Requires Angular 17 and Angular CDK 17.

Install through npm:
- `npm install ngx-quixx-elements`

## Import css

Most of the components need to import css to work properly.

Import the cdk/overlay and the library styles in your main style file (by default is style.css):

```
@import "@angular/cdk/overlay-prebuilt.css";
@import "node_modules/ngx-quixx-elements/styles/index.css";
```

The library styles can otherwise be imported globally in your `angular.json`:

```
{
  ...
  "projects": {
    "project_name": {
      ...
      "architect": {
        ...
        "build": {
          ...
          "options": {
            ...
            "styles": [
              ...
              "node_modules/ngx-quixx-elements/styles/index.css"
            ],
          }
        }
      }
    }
  }
}
```
## Use components

Import in module or in standalone component:

```
@NgModule({
...
imports: [
    ...
    NgxQuixxInputComponent,
],
...
})
```

Use in the template:
```
<ngx-quixx-input
    type="search"
    label="Filter"
    (search)="onSearch($event)"
></ngx-quixx-input>
```

## Demo

Visit the [demo page](https://niccol6.github.io/ngx-quixx-elements/) for the instruction for using the components.

