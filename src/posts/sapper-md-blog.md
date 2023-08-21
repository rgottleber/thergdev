---
title: Bare Bones Sapper + Markdown Blog
slug: sapper-md-blog
description: Basic blog setup using sapper and markdown
date: 2020-12-30
tags:
  - sapper
  - blog
  - tutorial
---

I wanted to start a place to encourage me to build more and share my learnings. This is that place. Sapper may be on its last leg, but I really enjoy working with it and until Svelte Kit gets here I’ll stick with it. I’m hopeful the migration won’t be too bad.

> For the most part, it should be relatively straightforward to migrate a Sapper codebase.
>
> - [https://svelte.dev/blog/whats-the-deal-with-sveltekit](https://svelte.dev/blog/whats-the-deal-with-sveltekit)

Creating this site took a day or so, most of the time was spent messing with CSS. It’s probably my weakest point for development work. This guide won’t cover that. In the future, I will include more there.

## Get The Template

First, we need to get the sapper template

```bash
➜  work npx degit "sveltejs/sapper-template#rollup" blog
> cloned sveltejs/sapper-template#rollup to blog
➜  work cd blog
➜  blog
```

This cloned the template for us. Let’s install the dependencies and start it up.

```bash
➜  blog npm install
npm WARN deprecated fsevents@2.1.3: Please update to v 2.2.x

added 235 packages, and audited 235 packages in 14s

13 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
➜  blog npm run dev

> TODO@0.0.1 dev
> sapper dev

✔ server (2.3s)
✔ client (2.4s)
> Listening on http://localhost:3000
✔ service worker (69ms)
```

And just like that we have a sapper site up and running! If you navigate to http://localhost:3000 you should see one proud kiddo!

<Image class="img" alt="Success Kid" src="../../static/uploads/screen-shot-2020-12-30-at-12.58.08-pm.png" />

The template even comes with a basic blog for us! Things are a bit strange for long-term use, though. There is a file named `_posts.js` in the `src/routes/blog` folder. This is a really strange way to store blog entries. They have done this to ensure there are no dependencies. We are going to add a few.

## Markdown based blogging

The two packages we need are

- gray-matter: parses front-matter for things like title, date, slug, etc.
- marked: parses the rest of the markdown into html.

```bash
➜  blog npm install gray-matter marked

added 11 packages, and audited 17 packages in 2s

found 0 vulnerabilities
➜  blog
```

We have these packages installed, now we should create an example _posts_.

I chose to create a new directory under `blog/src` named `posts`
Go ahead and put a few files in here with different names.
Here’s some sample data if you would like to use it. Note, the slug should match the name of the file without the extension (`.md`)

#### **`blog/src/posts/hello-world.md`**

```md
---
title: Hello World!
slug: hello-world
---

# A First Level Header

## A Second Level Header

Now is the time for all good men to come to
the aid of their country. This is just a
regular paragraph.

The quick brown fox jumped over the lazy
dog's back.

### Header 3

> This is a blockquote.
>
> This is the second paragraph in the blockquote.
>
> ## This is an H2 in a blockquote
```

Great, we have our first post, it’s magnificent!
Now we need to update our `index.json.js` to get the actual markdown files.

## Parsing Markdown For The Index

We need to import a few things first. We installed `marked` and `grayMatter` above, `path` and `fs` are to get access to the files.

#### **`blog/src/routes/blog/index.json.js`**

```js
import path from "path";
import fs from "fs";
import marked from "marked";
import grayMatter from "gray-matter";
```

Imports in place, we need to get all the posts. This involves a few steps.

1. Gather all the post files
2. Iterate over them
3. Extract front matter
4. Convert markdown to HTML

#### **`blog/src/routes/blog/index.json.js`**

```js
// Create a function that will return all the posts for a dir
function getAllPosts(filesPath) {
  // Iterate over the files in the dir
  const posts = fs.readdirSync(filesPath).map((fileName) => {
    // Read each file
    const post = fs.readFileSync(path.resolve(filesPath, fileName), "utf-8");
    // grayMatter returns the front matter in data and the content of the file
    const { data, content } = grayMatter(post);
    // Create a renderer to convert mark down int HTML
    const renderer = new marked.Renderer();
    // Generate the HTML
    const html = marked(content, { renderer });
    // We use ...data to spread all the values in the front matter
    return {
      html,
      ...data,
    };
  });
  return posts;
}
```

We have all the posts, now it’s time to return them. Let’s update the get function to the following. We are moving from `_posts.js` to use the actual files.

#### **`blog/src/routes/blog/index.json.js`**

```js
export function get(req, res) {
  const posts = getAllPosts("src/posts");

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(posts));
}
```

The final file should look like this

#### **`blog/src/routes/blog/index.json.js`**

```js
import path from "path";
import fs from "fs";
import marked from "marked";
import grayMatter from "gray-matter";

// Create a function that will return all the posts for a dir
function getAllPosts(filesPath) {
  // Iterate over the files in the dir
  const posts = fs.readdirSync(filesPath).map((fileName) => {
    // Read each file
    const post = fs.readFileSync(path.resolve(filesPath, fileName), "utf-8");
    // grayMatter returns the front matter in data and the content of the file
    const { data, content } = grayMatter(post);
    // Create a renderer to convert mark down int HTML
    const renderer = new marked.Renderer();
    // Generate the HTML
    const html = marked(content, { renderer });
    // We use ...data to spread all the values in the front matter
    return {
      html,
      ...data,
    };
  });
  return posts;
}

export function get(req, res) {
  const posts = getAllPosts("src/posts");

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(posts));
}
```

At this point you should see your list of blog entries now just has your one entry. If you copy it to make a second file, **don’t forget to update the slug**, the list should grow. It may take a refresh to get it to show up, though.

<Image class="img" alt="Blog List" src="../../static/uploads/screen-shot-2020-12-30-at-1.31.27-pm.png" />

## Rendering The Posts

If you click on one of these links you will notice, we get a **404**. Fixing this is going to be very similar to what we just did. First, the imports…do they look familiar?

#### **`blog/src/routes/blog/slug.json.js`**

```js
import path from "path";
import fs from "fs";
import marked from "marked";
import grayMatter from "gray-matter";
```

Next we need to update our get function.

#### **`blog/src/routes/blog/slug.json.js`**

```js
import path from "path";
import fs from "fs";
import marked from "marked";
import grayMatter from "gray-matter";

export function get(req, res, next) {
  // Get the slug from the request params
  const { slug } = req.params;

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  // Retrieve the post based on slug
  const post = fs.readFileSync(
    path.resolve("src/posts", `${slug}.md`),
    "utf-8"
  );

  // Extract the front matter and content
  const { data, content } = grayMatter(post);
  // Create the renderer
  const renderer = new marked.Renderer();
  // Render HTML from markdown
  const html = marked(content, { renderer });
  res.end(
    JSON.stringify({
      html,
      ...data,
    })
  );
}
```

<Image class="img" alt="Blog Entry" src="../../static/uploads/screen-shot-2020-12-30-at-1.39.47-pm.png" />

And just like that you have a basic blog set up. From here you can do more like deploying to a host. That’s a topic for another entry.
