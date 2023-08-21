---
title: Let’s Try GitHub Actions
slug: github-actions
description: GitHub actions seem powerful. How do you use them?
date: 2021-01-18
post: blog
tags:
  - deno
  - typescript
  - GitHub
---

## What Are GitHub Actions?

GitHub provides a way to automate CI/CD processes via [GitHub Actions](https://github.com/features/actions). When these were first announced I was excited for what the could do for my team when we had a PR or commit.

This week I stumbled across a blog post by Swyx. He wrote about [Data Scraping with GitHub Actions](https://www.swyx.io/github-scraping). I was inspired to give it a try with the [Deno Disney Scraper](https://gottleber.net/blog/deno-time/).

## Do You YAML?

Once the scraper script was created, implementing an action was pretty straight forward.

```yml
on:
  # schedule will use cron notation, there are other options to use on events
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron: "*/5 * * * *"
  # everytime the main branch is pushed it runs the script as well
  push:
    branches:
      - main

# name for the action
name: Scrape Disney Times
jobs:
  build:
    name: Scrape-Times
    runs-on: ubuntu-latest
    steps:
      # checkout the code
      - uses: actions/checkout@main

      # get a library to run deno
      - name: Setup Deno Module
        uses: denolib/setup-deno@master

      # run the deno script
      - name: Scrape
        run: deno run --unstable --allow-net --allow-write --allow-read get_data.ts

      # check in the results
      - name: Publish
        uses: mikeal/publish-to-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH_NAME: "main"
```

The setup took a while. `on: push:` works flawlessly. Every time I pushed the branch it would run without issue. I did run into an issue with `on: schedule`. It seems that the cron job set to every 5 minutes doesn't always run!. I've reached out to a few people who are more familiar than I am with actions and it seems that everything is set up correctly.

Over all I really like it and can't complain for a completely free service. If I was using a paid tier I would be much more concerned about actions not always firing.

If you run into any issues or questions hit me up on [Twitter](https://twitter.com/rgottleber)
