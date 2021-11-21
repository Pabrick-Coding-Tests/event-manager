# EventManager

# The task:
Write a simple single-page app for event administration (feel free to use any javascript/typescript framework you see fit if it helps you). The app should have a list of upcoming and past events and a form for creating a new event. When a user selects an event on the list, details of the event should appear somewhere.

The point of this is to demonstrate your programming habits and show styling (CSS) skills.

Moreover, if you decide to use a framework or library (or not to use any), please give a brief explanation of why.

Bonus: you can add to the event also weather information. You can use data from here: https://api.met.no/weatherapi/locationforecast/2.0/ or from another public weather service.

# Approach

The task will be to create a CRUD SPA able to manage events.
To achieve this I will use a javascript framework to make the handling of views and components easier.

Angular is the framework where I feel more confortable and the use of TypeScript is a plus (I know React can be used now with TypeScript, but this wasn't the case when Angular 2 appeared 😊).

Before starting it would be good to list the features I want for this MPV:
- Good arquitecture.
- Routing between pages and deeplinking.
- Database (localStorage in this case, to simplify).
- Usage of the API provided.
- Reactive forms and data validation.
- Testing.

Plus some features that from my point of view will add value to the project:
- Responsiveness (Mobile first approach).
- Crossbrowsing.
- Semantic HTML.

Due to the time limitation and the size of the project some other features will be dropped off as "Nice to haves".
- Better formulary (custom date picker, or event 3rd party).
- Style guide.
- More testing coverage.
- Accesibility (a11y).
- Localization (i18n).
- Analytics.
- Lint.

After drawing some diagrams to plan how the app will look like, we are ready!

# Commands the app

- Start: `ng start`
- Test: `ng test`

# Thanks!
Pablo.
