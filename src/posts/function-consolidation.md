---
title: Consolidating Functions Into A ‘Mono Repo’
slug: function-consolidation
description: Are mono repos evil?
date: 2021-02-09
tags:
  - Serverless
  - Netlify
---

A bit of an update to the netlify function post.

I was able to combine the function into the same repo as the svelte app.

A few changes
I added a few lines for the functions to package.json

```json
// package.json
"scripts": {
    "build:app": "rollup -c",
    "build:server": "netlify-lambda build functions",
    "build": "npm run build:server && npm run build:app",
    "dev": "rollup -c -w",
    "dev:server": "netlify-lambda serve functions",
    "start": "sirv public",
    "validate": "svelte-check"
  },
```

As well as changing the netlify.toml

```yaml
[build]
  command = "npm run build"
  functions = ".netlify/functions/"
```

And I added .netlify to my .gitignore.

With those changes and changing the path for the fetch, the app is now fully self-contained.

## Local Dev Tip

Use `npm install netlify-cli -g` to install the netlify command. This will allow you to start up the app locally on port `8888` via `netlify dev `and test things out. It’s great to not have to start the server for both the function AND the app.
