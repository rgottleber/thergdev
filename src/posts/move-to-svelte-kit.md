---
title: Moving To Svelte Kit
slug: move-to-svelte-kit
description: It’s may seem intimidating but it’s pretty easy
date: 2021-05-21
tags:
- Svelte-Kit
---

Today, I moved from [Sapper][1] over to [SvelteKit][2]. Hopefully things here are stable. After some initial testing and tire kicking, the site appears to be stable. I need to do a bit of clean up but I’m happy so far.

## The Docs
[The Migration Docs][3] are pretty spartan. I was able to figure most things out by following along but there were a few places that I ran into trouble. 

### Paths
The first issue I ran into was paths in svelte-kit need to be explicitly defined

Previously in my `Nav` component I had

`<img src="logo.png" alt="Me" />`

This would attempt to load the logo from the current directory not the root.

`<img src="/logo.png" alt="Me" />` adding the `/` fixed it

### No Responses

In Sapper responses were returned from the get function
```js
export function get(req, res, next) {
   const { slug } = req.params;

   res.writeHead(200, {
     'Content-Type': 'application/json',
   });

	res.end(
     JSON.stringify({
       html,
       ...data,
     })
   );
}
```

In Svelte-Kit it’s a bit different.

```js
export function get(_req) {
   const { slug } = _req.params;
   const post = getPost(slug);
   return { body: post }
}
```

### Preload Props

The final trip up was preload -\> load and the return type not being just the object but a props type

```js
return { posts };
```

Becomes

```js
return { props: { posts } };
```


All things considered the transition wasn’t too hard and took part of an afternoon.

I will say the build times are SUPER FAST

The full change over can be [found on GitHub][4]

[1]:	https://sapper.svelte.dev
[2]:	https://kit.svelte.dev
[3]:	https://kit.svelte.dev/migrating
[4]:	https://github.com/rgottleber/blog/commit/ae4f2d8d99d3cd8275ead2a783ae99cc2b9cd73e