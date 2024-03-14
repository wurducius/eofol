# Eofol

All-inclusive blazingly fast reactive web framework with zero configuration, batteries included!
Create a reactive app from template out-of-the-box with `eofol-app`.

## Features

- Declaratively define custom tag html elements or render to DOM element
- Multiple entrypoints
- Global state management
- Dynamic styling in JS
- Typescript support
- Bundle and asset optimization and chunking
- PWA support

## Create-eofol-app

To create an eofol-app with zero configuration run:
`npx @eofol/create-eofol-app <project-name>`

## Installation

Run `npm install`

## Usage

- Development `npm start`
- Build `npm run build`
- Test build locally `npm run serve`
- Clean `npm run clean`
- Analyze bundle `npm start analyze`

Eofol automatically generates bundles from your views on the path `.../eofol-app/views/your-view/your-view.js` paired together with a html file in your public folder by the same filename: `.../eofol-app/public/your-view.html`.

## Author

Jakub Eliáš wurducius@gmail.com
