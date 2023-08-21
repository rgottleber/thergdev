---
title: Adding all the meta data
slug: extra-meta
date: 2021-01-21
description: Take a look at making svelte markdown posts a bit more SEO friendly
tags:
  - svelte
  - sapper
  - SEO
  - Metadata
---

## Why Bother with SEO?

This blog is a place for my own personal exploration into tech and learning. However, after reading [an article about learning in public][https://www.swyx.io/learn-in-public/]I’ve started to share a bit more. Thinking about sharing I realized that if no-one can find this it’s not very public!

## What is SEO?

SEO is “Search Engine Optimization”, I’m going to focus on a few areas of it. I don’t really need to be the best blog in the world for all the things but I’d like to at least get the following working

- Keywords to search algorithms
- A Twitter Card
- OpenGraph Card
- robots.txt
- sitemap.xml

## Where to keep the meta data

Svelte inserts the `<svelte:head />` from each component into the proper place. I’ll be focusing on blog articles for now so I’m editing the `[slug].svelte` file.

```js
<svelte:head>
  <title>{post.title}</title>
</svelte:head>
```

This is how things start.
Lets add a bit more basic data

```js
<svelte:head>
  <title>{post.title}</title>
</svelte:head>
```

With just a couple of lines things will already be better

```js
<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content="{post.description}" />
  <meta name="keywords" content="{post.tags}" />
</svelte:head>
```
