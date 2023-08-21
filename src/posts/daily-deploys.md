---
title: Daily Deploys
slug: daily-deploys
description: How to build and deploy a Sapper every day
date: 2021-05-17
tags:
  - GitHub Actions
  - Netlify
  - Automation
---

Deploy a [Sapper][1] site every day! This isn’t a post to motivate you to build more sites. I’ll be working on convincing our future robotic overlords to build the site for me.

At the current time I’m only using around 10% of my total free [Netlify][2] free tier of build minutes. The free tier is exceptional, especially for the price. There is one feature that I can’t seem to find, scheduled builds.

I want to deploy daily, and why not do it without impacting my build minutes?

## GitHub Actions to the rescue!

Github actions can be configured to run on a schedule using the unix crontab format. [crontab guru][3] can be invaluable if you want to double-check your settings. I am, however, getting ahead of myself. Netlify currently deploys this site on every push. I’d like to move everything over to GitHub so step one.

### Turn off Netlify Builds

You can find this under `appname -> Site settings -> Build & deploy -> Stop Builds`

Great, everything is broken, just the way we want it. Now it’s time to drop a new file in our project to let GitHub do the heavy lifting.

### Set up the secrets 🤫

A couple of secrets need to be created in the app.
`NETLIFY_SITE_ID` This is the `API ID` found in `App -> Settings -> General`
`NETLIFY_AUTH_TOKEN` This must be generated. `User Settings -> Applications -> Personal Access Tokens -> New Access Token`
**Note: This is an access token to your account. Treat it like a password!**

These two values will need to be saved in GitHub.

There are two ways to save them on GitHub.

`Repo -> Settings -> Secrets -> New Repository Secret` and create them both here.

Or via the `gh` cli tool
`gh secret set NETLIFY_SITE_ID -b"id from api id"`
`gh secret set NETLIFY_AUTH_TOKEN -b"id from access token"`

### Setup GitHub actions

Save the secrets and create a yaml to inform the GitHub action.

`.github/workflows/deploy-on-push.yaml`

```yaml
name: Deploy to Netlify on commits to master
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Checkout repo
      - uses: actions/checkout@v2

      - name: Install Dependencies
        run: npm install

      - name: Build site
        run: npm run export

      # Deploy the site with netlify-cli
      - name: Deploy Site
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        run: netlify deploy --dir="__sapper__/export" --prod
```

Again, this example is for sapper. If you were building something different this would work just change

`npm run export`

and

`netlify deploy --dir="__sapper__/export" --prod`

To the proper values.

### Scheduled deploys

Almost done, one last thing is to set up scheduled deploys to build the site when we want it to actually deploy.
Add the `schedule:` bit

`.github/workflows/deploy-on-push.yaml`

```yaml
name: Deploy to Netlify on commits to master
on:
  push:
    branches: [main]
  ######
  # This is the new stuff
  schedule:
    - cron: "0 13 * * *" # every day at 8CDT
  ######
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Checkout repo
      - uses: actions/checkout@v2

      - name: Install Dependencies
        run: npm install

      - name: Build site
        run: npm run export

      # Deploy the site with netlify-cli
      - name: Deploy Site
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        run: netlify deploy --dir="__sapper__/export" --prod
```

Just like that the site will deploy on its own!

[1]: https://sapper.svelte.dev
[2]: https://www.netlify.com/pricing/
[3]: https://crontab.guru
