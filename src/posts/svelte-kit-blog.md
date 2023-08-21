---
title: Basic Blog with Svelte Kit
description: Svelte Kit for thoughts, it doesn’t have style…yet
slug: svelte-kit-blog
date: 2021-04-16
tags:
  - Svelte
  - Blog
---
## 1 - What is SvelteKit
SvelteKit is a hybrid of what was svelte and sapper

SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.

Unlike single-page apps, SvelteKit doesn't compromise on SEO, progressive enhancement or the initial load experience — but unlike traditional server-rendered apps, navigation is instantaneous for that app-like feel.

## 2 - Getting Started with SvelteKit

Initialize the app onto your machine
`npm init svelte@next my-blog`
Follow the prompts for the values you would like to use.
_I’m choosing to __NOT__ use typescript for this one_
I am choosing to use ESLint and Prettier
Change into the directory of the new app you just created
`cd my-app`
Install all the node modules
`npm install`
Open up the site
`npm run dev -- --open`

### Going forward, we will put everything in the `src` folder



## 3 - Create A Page

`routes/contact.svelte` — new file

```js
<svelte:head>
	<title>Contact Me</title>
</svelte:head>

<h1>Contact!</h1>

<a href="https://twitter.com/rgottleber">My Twitter</a>

```

Nothing shows up … yet

`lib/Nav/index.svelte` — New file and directory

```js
<ul>
	<li><a href="/">Home</a></li>
	<li><a href="/contact">Contact</a></li>
</ul>

```

Create a layout file for our app. 

Anytime there is a file with a $ it won’t create a route
`routes/$layout.svelte`

```js
<script>
	import Nav from '$lib/Nav/index.svelte';
</script>

<Nav />

<main>
	<slot />
</main>

```

`<slot />` is where the content of the page _slots_ in.
`$lib` is defined in `jsconfig.json`

This creates the page and adds a nav element to all of your pages. At this point we have a functional site with the worlds most amazing lack of CSS. I’m not planning on adding css in this explainer but I will add a a tiny bit just to illustrate how scoped CSS works in Svelte. Let’s make Contact! Look awesome

```js
<svelte:head>
	<title>Contact Me</title>
</svelte:head>

<h1>Contact!</h1>

<a href="https://twitter.com/rgottleber">My Twitter</a>

<style>
	h1 {
		text-align: center;
		text-decoration: underline;
		font-size: 32px;
		font-family: monospace;
		letter-spacing: 5px;
		background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: rainbow_animation 6s ease-in-out infinite;
		background-size: 400% 100%;
	}

	@keyframes rainbow_animation {
		0%,
		100% {
			background-position: 0 0;
		}
		50% {
			background-position: 100% 0;
		}
	}
</style>
```

This style will only apply to the `h1` on the contact page.
```js
<h1 class="s-8jg-3RXHNduc">Contact!</h1>
```
Svelte creates a class just for our h1, SWEET!

## 4 - Create A Post
Create a directory to hold posts `posts` 
Also, you need to create your first post. 

`posts/hello-world.md`
```md
---
title: 'Hello World'
slug: 'hello-world'
---

# Hello to the World

This is my first blog post!

```

The bit between the two `---` is known as front matter. In order to use that, and markdown you will need to add a couple npm packages 
```bash
npm install -D marked gray-matter
```
`marked` — converts markdown to html
`gray-matter` — grabs the front matter for use later.

Perfect, you now have a post and we need to read it. 

## 5 - Create the blog page

Svelte-Kit uses the routes folder to create pages as you saw when creating the `contact.svelte` route. A file called either `src/routes/about.svelte` or `src/routes/about/index.svelte` would correspond to the `/about` route.

Understanding this you are going to need a few routes for the blog. First you need to create `blog/index.svelte` this will correspond to the `/blog` route

Let’s keep it basic to begin.
```js
<h1>Blog Posts</h1>
```

How can you get there? You need to update your `<Nav />` component

```js
<ul>
	<li><a href="/">Home</a></li>
	<li><a href="/contact">Contact</a></li>
	<li><a href="/blog">Blog</a></li>
</ul>
```

A quick save and everything is up to date. The fast reload is 🤌 _chef’s kiss_

The blog isn’t very interesting yet, you will need to create an endpoint for the post data. Don’t worry endpoint is a fancy term for modules living in `.js` or `.ts` files.

You will need to gather all the markdown content from the posts directory. The common way to do this is create a matching `.json.js` for your `.svelte` file. 

`blog/index.json.js`
```js
import path from 'path';
import fs from 'fs';
import grayMatter from 'gray-matter';

function getAllPosts(filesPath) {
// Read all posts from passed in path and itterate the .md files just in case
  const posts = fs.readdirSync(filesPath).filter(file => file.endsWith('.md')).map((fileName) => {
    // Read each post
    const post = fs.readFileSync(path.resolve(filesPath, fileName), 'utf-8');
    // grayMatter pulls out the front matter into {data}
    const { data } = grayMatter(post);
    return {
        ...data,
      };
  });
  return posts;
}
 

export function get() {
  const posts = getAllPosts('src/posts');
  return { body: posts }
}

```

This will get you all of the blog posts, and their data.

You’ll need to show what you’ve got now. Let’s update `blog/index.svelte`
```js
<script context="module">
    export async function load({ fetch }) {
        const result = await fetch('blog.json');
        const posts = await result.json();
        return {
            props: { posts }
        };
    }
</script>

<script>
    export let posts = [];
</script>

<h1>Blog Posts</h1>
{#each posts as post}
    <h1>
        <a href="/blog/{post.slug}">{post.title}</a>
    </h1>
{/each}
```

This will also link to the blog post based on the `slug` from the front matter.

## 6 - Create the post page

Again, let’s start with the data.

Inside the blog directory you need to create `[slug].json.js` This is a great time to introduce the idea of __Dynamic Parameters__ anything enclosed in `[brackets]` is a dynamic parameter. You’ll be accessing it through the load function. 

```js
import path from 'path';
import fs from 'fs';
import marked from 'marked';
import grayMatter from 'gray-matter';

function getPost(slug) {
// Read the post from passed in slug
    const post = fs.readFileSync(path.resolve('src/posts', `${slug}.md`), 'utf-8');
    // grayMatter pulls out the front matter into {data}
    const { data, content } = grayMatter(post);
    // Markdown to HTML renderer
    const renderer = new marked.Renderer();
    // Render the HTML from the content of the MD post
    const html = marked(content, { renderer });
    return {
        html,
        ...data,
      };
}
 

export function get(_req) {
    const { slug } = _req.params;
    const post = getPost(slug);
    return { body: post }
}
```

And display that data

```js
<script context="module">
    // Use the load funciton to get the fetch and page
	export async function load({ fetch, page }) {
        // slug comes from page
		const { slug } = page.params;
        // async so we actually fetch the json
        // -- this comes from [slug].json.js
		const result = await fetch(`${slug}.json`);
        // get the post and use it as the page props
		const post = await result.json();
		return {
			props: { post }
		};
	}
</script>

<script>
	export let post;
</script>

<h1>{post.title}</h1>
{@html post.html}

```


## 7 - Profit?
At this point you have a fully functional blog that you can host or deploy as you like. It renders out markdown into the most amazing un-styled CSS 

Congratulations!🥳
