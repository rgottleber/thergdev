---
title: CSS Styling For Svelte
slug: css-styling-for-svelte
description: 💅
date: 2021-01-31
tags:
  - Svelte
  - CSS
  - LevelUp
---

I've spent a few days working through the [Modern CSS Design Systems](https://www.leveluptutorials.com/tutorials/modern-css-design-systems?ref=richardg) course on Level Up Tutorials. After completing this course I have a much better understanding of how CSS, specifically CSS variables, works.

### Variables

CSS variables are insanely powerful. On the surface it looks like a way to be more consistent but throughout the course I learned it was more than that.

The ability to change a theme with something as simple as this is amazing

```css
@media (prefers-color-scheme: light) {
  :root {
    --background: var(--lightGrey);
    --textColor: var(--black);
    --primary: var(--teal);
    --secondary: var(--purple);
    --navBackground: var(--black);
    --cardBackground: var(--white);
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: var(--lightBlack);
    --textColor: var(--lightGrey);
    --primary: var(--lightGrey);
    --secondary: var(--darkTeal);
    --navBackground: var(--lightPurple);
    --cardBackground: var(--black);
  }
}
```

### Variables in Svelte

One issue I ran into, sapper doesn't like to hot reload css files. I setup the variables in a style.css file under static. It works great if you don't mind the dance. I needed to bounce back and forth from the css file to a svelte file. I saved the svelte file and then manually reloaded the page I was working on. It was a bit of a pain but not terrible. I was also able to use the variables in style.css to in my svelte components.

```html
<style>
  div {
    padding: 0 1rem;
    box-shadow: var(--level-5);
    border-radius: var(--borderRadius);
    background-color: var(--cardBackground);
  }
  h2 {
    margin-top: 0;
  }

  a {
    text-decoration: none;
  }
  span {
    background-color: var(--secondary);
    border-radius: var(--borderRadius);
    padding: 0 0.5rem;
  }
</style>
```

While I like the idea of one global style to rule them all. Having locally scoped style is so easy in svelte that it felt silly to not take advantage of it when I could. The variables helped keep things consistent. I'm not sure if this is the best way to achieve this but so far it's working well and seems much more manageable to me.
