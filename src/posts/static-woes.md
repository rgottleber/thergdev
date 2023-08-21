---
title: Static Woes
slug: static-woes
description: Quick fix to static woes
date: 2021-05-30
tags:
- SveteKit
---


I ran into a fun issue when deploying my site. 

```bash
Run npm run preview to preview your production build locally.
47

48
> Using @sveltejs/adapter-static
49
> utils.copy_static_files is not a function
50
TypeError: utils.copy_static_files is not a function
51
    at adapt (file:///home/runner/work/blog/blog/node_modules/@sveltejs/adapter-static/index.js:14:10)
52
    at adapt (file:///home/runner/work/blog/blog/node_modules/@sveltejs/kit/dist/chunks/index7.js:323:8)
53
    at file:///home/runner/work/blog/blog/node_modules/@sveltejs/kit/dist/cli.js:654:11
54
npm ERR! code ELIFECYCLE
55
npm ERR! errno 1
56
npm ERR! TODO@0.0.1 build: `svelte-kit build`
57
npm ERR! Exit status 1
58
npm ERR! 
59
npm ERR! Failed at the TODO@0.0.1 build script.
60
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
61

62
npm ERR! A complete log of this run can be found in:
63
npm ERR!     /home/runner/.npm/_logs/2021-05-29T14_42_21_364Z-debug.log
64
Error: Process completed with exit code 1.
```


The quick fix for this is to update the static adapter

```bash
npm i -D @sveltejs/adapter-static@next
```
