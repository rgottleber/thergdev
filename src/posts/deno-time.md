---
title: Using Deno For The First Time
slug: deno-time
description: I finished a Deno tutorial and now I want to build something!
date: 2021-01-17
tags:
  - deno
  - typescript
---

## The Inspiration

I just finished a great introduction to [Deno from LevelUp Tutorials][1] (This is an affiliate link). I really like the projects that Scott comes up with but I had more planned.

## The Plan

For a while, I’ve wanted to keep tabs on times at Disney World. They have a great app for looking at the current wait time but nothing historic. Given the state of things at the moment, we do have a global pandemic doing on, I don’t know that historic data is going to be very useful.
I decided to start with 2 days worth of data. I stumbled upon a [post by Swyx][2] that got me thinking about this. Could I use GitHub actions to do what I wanted with the data?
There is a package available for NPM, [themeparks][3], which uses the api’s that power the Disney World App. This package does way more than I need. I was thinking I would write something similar myself. As I dug into the code and what did I see but a call to [https://api.themeparks.wiki][4]. Cubehouse had created an api already. I was in luck. I could use Deno to fetch the JSON from the wiki and get going from there.
Once I have the data the idea is to use Svelte to do some sort of data visualization. That is a topic for another day.

## Do The Work

First things first, what does this API contain?
If we look at [https://api.themeparks.wiki/preview/parks][5] we see it returns a list of parks.

```json
[
  "WaltDisneyWorldMagicKingdom",
  "WaltDisneyWorldEpcot",
  "WaltDisneyWorldHollywoodStudios",
  "WaltDisneyWorldAnimalKingdom",
  "DisneylandResortMagicKingdom",
  "DisneylandResortCaliforniaAdventure",
  "Efteling",
  "DisneylandParisWaltDisneyStudios",
  "DisneylandParisMagicKingdom",
  "HongKongDisneylandPark",
  "ShanghaiDisneylandPark",
  "TokyoDisneyland",
  "TokyoDisneySea",
  "UniversalStudios",
  "UniversalIslandsOfAdventure",
  "EuropaPark",
  "UniversalStudiosFlorida",
  "UniversalVolcanoBay"
]
```

At this time I’m only interested in the Walt Disney World Parks, I noticed in the code base that the API seemed to call `parsk/{parkname}/waittime` I gave it a try and struck gold. It returned all of the attractions for the park as well as the status and wait time.
I need to take this result and store it some where. My plan is to use simple files in GitHub to host the data for now.

First, we need to get all the parks times. This took a bit of doing as my javascript async _foo_ was weak. I ended up using an await for each fetch and then `Promise.all()`

```js
const magicKingdom = await fetch(
  "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldMagicKingdom/waittime"
);
const epcot = await fetch(
  "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldEpcot/waittime"
);
const hollywoodStudios = await fetch(
  "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldHollywoodStudios/waittime"
);
const animalKingdom = await fetch(
  "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldAnimalKingdom/waittime"
);
Promise.all([magicKingdom, epcot, hollywoodStudios, animalKingdom]).then(
  async ([ex, mk, ep, hs, ak]) => {
    const dmk = await mk.json();
    const dep = await ep.json();
    const dhs = await hs.json();
    const dak = await ak.json();
    return dmk.concat(dep.concat(dhs.concat(dak)));
  }
);
```

This fetches all of the data and then concats it into one giant json response. Once we have the date it is written to a file. This is great for one pass but how do I get all of the data for the day?

I need to read in the existing file, and add that as part of the total concatenated list.

```js
ensureFileSync(file);
let output = await Deno.readTextFile(file);
if (!output) {
  output = "[]";
}
const existing = await JSON.parse(output);
```

`ensureFileSync()` is a blocking function but the file needs to exist. Once it is there we can read it. If it is empty we want our output to just be an array. This lets us turn it into an empty JSON object for concat work.

In the end the whole file ended up like this.

```js
import { ensureFileSync } from "https://deno.land/std@0.83.0/fs/ensure_file.ts";
import { exists } from "https://deno.land/std/fs/mod.ts";

export async function writeParkData(date: string) {
  const file = `${date}-times.json`;
  ensureFileSync(file);
  let output = await Deno.readTextFile(file);
  if (!output) {
    output = "[]";
  }
  const existing = await JSON.parse(output);
  const magicKingdom = await fetch(
    "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldMagicKingdom/waittime"
  );
  const epcot = await fetch(
    "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldEpcot/waittime"
  );
  const hollywoodStudios = await fetch(
    "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldHollywoodStudios/waittime"
  );
  const animalKingdom = await fetch(
    "https://api.themeparks.wiki/preview/parks/WaltDisneyWorldAnimalKingdom/waittime"
  );
  Promise.all([existing, magicKingdom, epcot, hollywoodStudios, animalKingdom])
    .then(async ([ex, mk, ep, hs, ak]) => {
      const dex = await ex;
      const dmk = await mk.json();
      const dep = await ep.json();
      const dhs = await hs.json();
      const dak = await ak.json();
      return dex.concat(dmk.concat(dep.concat(dhs.concat(dak))));
    })
    .then((responseText) => {
      const write = Deno.writeTextFile(file, JSON.stringify(responseText));
    });
}
export function cleanData(date: string) {
  const file = `${date}-times.json`;
  exists(file).then((result: boolean) => {
    if (result) {
      Deno.removeSync(`${date}-times.json`);
    }
  });
}
const date = new Date();
let oldDate = new Date();
oldDate.setDate(oldDate.getDate() - 2);
let formatted_date =
  date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
let old_formatted_date =
  oldDate.getMonth() +
  1 +
  "-" +
  oldDate.getDate() +
  "-" +
  oldDate.getFullYear();

cleanData(old_formatted_date);
writeParkData(formatted_date);
```

That seems pretty clean. Next time I need to look into getting this running with GitHub Actions.

[1]: https://www.leveluptutorials.com/pro?ref=richardg
[2]: https://www.swyx.io/github-scraping/
[3]: https://github.com/cubehouse/themeparks
[4]: https://api.themeparks.wiki
[5]: https://api.themeparks.wiki/preview/parks
