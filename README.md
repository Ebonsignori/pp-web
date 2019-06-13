# Planning Poker Web App

The corresponding backend for this planning poker app can be found at https://github.com/Ebonsignori/pp-api

This is an MVP that is lacking in the style and UX departments, but accomplishes the job it set out to do: To provide a planning poker app that integrates with GitHub.

The current model is designed for teams that use GitHub issues to represent "user stories" in their agile workflow. The app comes with a GitHub integration that you install to a repo or org scope in order to pull GitHub issues into the app for voting (planning poker). 

It implements socket-based rooms and allows for guests to join and vote on or (Scientific wild-ass guess or swag) each user story. 

There are poor practices and hacky code in this repo that I'm not proud of, but the functionality is there if anyone ever wants to use it as a base for a more robust product. 

# Dev Setup

1. First, set up the environment in .env and start `pp-api` and `ngrok` following the README.md in `pp-api`
2. Then, `npm run dev`

# Production

Run `npm run deploy` to build the frontend and deploy to the `gh-pages` branch on Github
