---
title: To Tailwind Or Not
slug: tailwind-or-not
description: The seemingly endless debate, should I use Tailwind CSS or not?!
date: 2020-12-31
tags:
  - css
  - tailwind
  - tutorial
---

Last time we got a blog up and running. Today I’m thinking about style. While plain CSS can do the trick and Svelte does a wonderful job scoping the CSS, I really enjoy working with [Tailwind](https://tailwindcss.com/). It takes a bit of messing to get it working with sapper and not everything is working just the right way with the setup I’m using. `@apply` seems non-functional, but I think I can make do without it.

## Install Tailwind and PurgeCSS

Let’s get started. First we need to install a few packages.

```bash
➜  blog git:(main) npm install tailwindcss postcss-cli --save-dev

added 101 packages, and audited 724 packages in 8s

77 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
➜  blog git:(main) npm install @fullhuman/postcss-purgecss

up to date, audited 724 packages in 3s

77 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
➜  blog git:(main)
```

Once we have these installed we will need to create a config file for tailwind

```bash
➜  blog git:(main) ✗ ./node_modules/.bin/tailwind init tailwind.js

   tailwindcss 2.0.2

   ✅ Created Tailwind config file: tailwind.js

➜  blog git:(main) ✗
```

This will create an empty config file for tailwind for us

#### **`/blog/tailwind.js`**

```js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

We also need to create a config for postcss

```bash
➜  blog git:(main) ✗ touch postcss.config.js
```

This file should contain a config that looks like the following.

#### **`blog/postcss.config.js`**

```js
const tailwindcss = require("tailwindcss");

// only needed if you want to purge
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./src/**/*.html"],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),

    // only needed if you want to purge
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
```

The final bit of configuration is to set up the CSS file for Tailwind.

```bash
➜  blog git:(main) ✗ touch static/tailwind.css
```

#### **`blog/static/tailwind.css`**

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

That’s it for configuration. At this point we have everything setup we need to let our build scripts know about it. The build script needs to be changed and a few other scripts need to be added.

#### **`blog/package.json`**

```js
    // Remove this
	"build": "sapper build --legacy",`
```

Add the following, there may be other scripts which should stay as they are, `build` is the only one that needs to change.

#### **`blog/package.json`**

```js
"scripts": {
    "watch:tailwind": "postcss static/tailwind.css -o static/index.css -w",
    "build:tailwind": "NODE_ENV=production postcss static/tailwind.css -o static/index.css" ,
    "build": "npm run build:tailwind && sapper build --legacy",
	...
}
```

## Running Dev and **The Quirk**

This setup has two major cons. The first, I mentioned above, `@apply` doesn’t work, the second is that you have to run two windows, one to watch tailwind and one to run your sapper server while doing development work. It’s a bit strange but for the convenience of tailwind I can live with it.

In the first window run

```bash
npm run watch:tailwind
```

In the second

```bash
npm run dev
```

And just like that you have tailwinds and sapper running!
