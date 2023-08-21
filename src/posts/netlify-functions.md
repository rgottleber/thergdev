---
title: Netlify FUNctions
slug: netlify-functions
description: Use Netlify to make things easy when you need functions
date: 2021-02-08
tags:
  - node
  - Netlify
  - serverless
---

I created an app in Deno to server up a random topic of conversation. I had to deploy it to [Heroku][1] and that was ok but not idea. Heroku has a bad habit of putting apps to sleep on the free tier. While I get it and am in no way complaining about something that I pay nothing for. It’s annoying. I didn’t want to find a work around to keep the instance warm.

## Enter Netlify … Again

Netlify provides something called [functions][2]. I was suspicious that they were just AWS lambda functions, and it turns out that was correct. Netlify provides a nice wrapper that takes away a lot of the intimidation factor for AWS.

Let’s build the function.

## A whole Serverless function.. do I have time for that

**Spoiler** It’s TWO WHOLE FILES!!!

First we need to create a config for Netlify. I know, configs are terrible and confusing but stick with me.

```yaml
[build]
  functions = "./functions"
```

Yeah, that’s it, just 2 lines. This tells Netlify that when it builds the project the functions are located in the “functions” directory.

Now let’s create the function to get a random question.

```js
// this is in /functions/getQuestion.js
exports.handler = (event, context, callback) => {
  const questions = [
    "When you are old, what do you think children will ask you to tell stories about?",
    "What’s are some of your Pavlovian responses?",
  ];
  try {
    const res = {
      question: questions[Math.floor(Math.random() * questions.length)],
    };
    console.log(res);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(res),
      headers: {
        "access-control-allow-origin": "*",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
```

That’s the whole thing. The event, context, and callback are a bit strange but once you commit and deploy this to Netlify your should have

`https://<your-site-name>.netlify.com/.netlify/functions/getQuestion` available which will be the result of the function running.

That’s crazy easy!

[1]: https://heroku.com
[2]: https://functions.netlify.com
