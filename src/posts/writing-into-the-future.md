---
title: Web3 With Solidity And Svelte
slug: writing-into-the-future
description: Creating A Contract In Solidity & A Svelte Front End
date: 2021-05-16
tags:
  - Svelte
  - Sapper
---

This blog currently runs on [Sapper][1]. It’s a great system, but I’ll be moving to [SvelteKit][2] in the not too distant future. I read a [post][3] by [@flaviocopes][4] about his stack and how he schedules posts every day. I was inspired. Not only that, but I’ll be working to get a backlog and up my consistency posting here.

To get started, I debated switching to [HUGO][5], go is fun and all, but I’m really enjoying Svelte and decided to stick with this little blog. I like how simple it is and knowing that I built it all.

### Let’s build for the future!

The first feature I am implementing is preventing _future_ posts from showing up here. I guess that’s, preventing the future from building?

In several places, `blog/index.svelte` for example, I fetch the blog posts. I initially was going to filter them here from the posts returned. This got fairly repetitive.

```js
<script context="module">
  export function preload() {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>
```

How could I _DRY_ this out?

These fetch from `blog.json` 🤔

I’ll fix it at the source!

I have a function `sortPosts()` which puts them in order by date. They already are looking at the date I up_dated\_ the function to `sortAndFilterPosts()`

```js
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
```

The messy bit with `today` is to make sure the date formats match when I compare them. It works well enough.

Next time I’ll work on getting the site to build once a day to ensure that the _posts from the future_ show up! 👍

[1]: https://sapper.svelte.dev/
[2]: https://kit.svelte.dev/
[3]: https://flaviocopes.com/netlify-auto-deploy/
[4]: https://twitter.com/flaviocopes
[5]: https://gohugo.io/
