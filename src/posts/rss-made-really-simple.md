---
title: RSS Made Really Simple
slug: rss-made-really-simple
description: Party Like it’s 1999
date: 2021-05-29
tags:
- Svelte
- RSS
---

The more I work on this site, the more I realize that I want to party like it’s 1999. 

On March 15, 1999, RSS came into being. It enabled feeds to be a thing, and I’ve come to really enjoy using an RSS reader. Perhaps it is a bit of nostalgia kicking in. I miss the days of [Google Reader][1]. 

RSS is also top of mind because [chrome is adding it as a test feature][2]. Maybe the big G has realized the error of its ways in sunsetting Reader and is making up for it?

Alright, enough of that, let’s add some RSS to this site. 

## Add Feed

I’m choosing to go with the [feed][3] to create the syndication for the site. I could do it all in JS in svelte, but I like the format for creating the new feed. 

`npm install feed`

## Create the feed

I opted to put the feed in `src/routes/blog/feed.xml.js`

```js
import path from "path";
import fs from "fs";
import grayMatter from "gray-matter";
import marked from "marked";
import { Feed } from "feed";
import getShareImage from "@jlengstorf/get-share-image";

// Find all the posts for the blog
function getAllPosts(filesPath) {
  const posts = fs
    .readdirSync(filesPath)
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const post = fs.readFileSync(path.resolve(filesPath, fileName), "utf-8");
      const { data, content } = grayMatter(post);
      const renderer = new marked.Renderer();
      const html = marked(content, { renderer });
      return {
        html,
        ...data,
      };
    });
  return posts;
}
// Order the posts, don't share unpublished ones
function sortAndFilterPosts(posts) {
  const q = new Date();
  const m = q.getMonth() + 1;
  const d = q.getDay();
  const y = q.getFullYear();
  const today = new Date(y, m, d);

  posts = posts.filter((post) => {
    return post.date <= today;
  });
  return posts.sort((post1, post2) => {
    const date1 = new Date(post1.date);
    const date2 = new Date(post2.date);
    return date2 - date1;
  });
}

// Create the RSS feed
function getRSS(posts) {
  const feed = new Feed({
    title: "Richard Gottleber",
    description: "This is my personal feed!",
    id: "http://gottleber.net/",
    link: "http://gottleber.net/",
    language: "en", 
    image: "http://gottleber.net/logo.png",
    favicon: "http://gottleber.net/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, Richard Gottleber`,
    generator: "awesome", 
    feedLinks: {
      json: "https://gottleber.net/blog/feed.xml",
    },
    author: {
      name: "Richard Gottleber",
      email: "hello@gottleber.net",
      link: "https://gottleber.net"
    }
  });
  
  // Loop through posts and add post specific values
  posts.forEach(post => {
    // Using the 'social image' as the image for the post.
    const socialImage = getShareImage({
      title: post.title,
      tagline: post.description,
      cloudName: "richardg",
      imagePublicID: "v1618256523/social_card",
      titleFont: "Montserrat",
      titleExtraConfig: "_black",
      taglineFont: "Montserrat",
      textColor: "ffffff",
      titleBottomOffset: 310,
      taglineTopOffset: 394,
    });
    feed.addItem({
      title: post.title,
      id: `https://gottleber.net/blog/${post.slug}`,
      link: `https://gottleber.net/blog/${post.slug}`,
      description: post.description,
      // This allows the full post to be a part of the feed.
      content: post.html,
      author:
        {
          name: "Richard Gottleber",
          email: "hello@gottleber.net",
          link: "https://gottleber.net"
        },
      date: post.date,
      image: socialImage
    });
  });
  
  feed.addCategory("Technology");
  
  // Output: RSS 2.0
  return feed.rss2
}

export async function get() {
  const posts = getAllPosts("src/posts");
  const sortedPosts = sortAndFilterPosts( await posts);
  return {
    body: getRSS( await sortedPosts),
    headers: { "content-type": "application/rss+xml" },
  };
}

```


## It works on my machine…
At this point going to `localhost:3000/blog/feed.xml` worked. I could even point my RSS reader to it and get the feed. I pushed up to Netlify and ran into a beautiful 404 page.. 

_WHY?!?!_

Turns out you need to let Svelte know about the JS file.

I added 

```html
 <link rel="alternate" type="application/rss+xml" title="RSS" href="/blog/feed.xml" />

```

to `/src/app.html` and everything clicked into place.

Just like that I’ve got RSS set up on the blog. 😎

[1]:	https://en.wikipedia.org/wiki/Google_Reader
[2]:	https://blog.chromium.org/2021/05/an-experiment-in-helping-users-and-web.html
[3]:	https://www.npmjs.com/package/feed