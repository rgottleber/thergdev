---
title: Thoughts on Site Generation
slug: thoughts-on-site-gen
description: CSR vs SSR vs SSG demystifying the WTF
date: 2021-05-12
tags:
  - CSR
  - SSR
  - SSG
---

## CSR vs SSR vs SSG

CSR - Client-Side Render
SSR - Server-Side Render
SSG - Static Site Generation

## Client-Side Rending

CSR became popular due to JavaScript frameworks like Angular, Vue, and React. It offloads the hard work to the clients machine.

CSR applications use JavaScript to control what is displayed on the page, this typically means that instead of just downloading and displaying HTML the server sends a JavaScript file along to create and change the HTML.

How does this usually work?

- A user requests access to a page via a browser
- The server sends back static files (CSS and HTML) to the browser
- The HTML contains links to the necessary Javascript. When the HTML loads, the user sends another request to the server for the JavaScript files
- The server sends back the JavaScript
- Once downloaded the JavaScript runs and dynamically creates the content of the page
- The page is finally available to view

Using CSR prolongs the initial load process. Once loaded the website will become faster. Once the initial load completes, navigation can be done dynamically and additional data can be loaded as needed. A great example of this is a SPA (Single Page Application)

### Pros

- Fast after initial load

### Cons

- Initial load can be long, might lose users
- SEO is worse, SEO bots crawl for HTML, and it’s not loaded (this is changing)

### When to Use

- Large number of users accessing dynamic content
- Good for web apps

## Server-Side Rendering

SSR is the other common way to deal with JavaScript. It is in essence the opposite of CSR. With SSR the server does the rendering.

How does this work?

- A user requests access to a page via a browser
- The server processes the request and loads the needed CSS, HTML, and JavaScript to deliver just the HTML and CSS back to the browser

One massive difference is at this point every request needs to go back to the server to load. The browser is constantly requesting information from the server.

The downside of SSR is that the high resource utilization on the server-side and possible delays in delivering data to users. Load times are longer than SPAs. This is due to the server constantly rendering content.

### Pros

- Best for SEO of dynamic pages
- Allows content to be focused for SEO crawlers

### Cons

- Page reloads cause server load
- Can increase hosting costs

### When to Use

- Dynamic content that needs SEO

## Static-Site Generation

SSG deals with static content. It can create faux-dynamic sites by generating variations, but the result is a site that is just HTML and CSS.

SSG uses a tool to generate static HTML websites based on raw data and templates. They can also automate the process of coding similar pages manually.

How does this work?

- The user requests access to a page via a browser
- The server delivers the HTML and CSS

### Pros

- Speed!
- Security, everything is static, you don’t need to worry about malicious users
- Great for SEO
- Cheap / Free to host

### Cons

- Data can be stale
- Less opportunity for interactive content

### When to Use

- Lots of static content
- SEO is important
